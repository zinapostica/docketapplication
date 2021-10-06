import * as React from "react";
import {
  ViewState,
  ChangeSet,
  EditingState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  MonthView,
  EditRecurrenceMenu,
  DragDropProvider,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Appointment } from "../../Appointment/Appointment";
import { ResourceSwitcher } from "../ResourceSwitcher/ResourceSwitcher";
import { useState } from "react";
import { useEffect } from "react";
import { useMeQuery } from "../../../../generated/graphql";
import { useReactiveVar } from "@apollo/client";
import { isAdmin } from "../../../../apollo-client/reactiveVariables";

export interface IMobileCalendarProps {
  startDate: Date;
  appointments: any[];
  commitChanges: (changes: ChangeSet) => void;
  resources: any[];
}

export function MobileCalendar(props: IMobileCalendarProps) {
  const [mainResourceName, setMainResourceName] = useState({
    id: -1,
    text: "",
  });
  const meQuery = useMeQuery({ fetchPolicy: "cache-and-network" });
  useEffect(() => {
    const userId = meQuery.data?.me?.id;
    if (userId) {
      const resource = props.resources.find(
        (resource) => resource.id === userId
      );
      if (resource) setMainResourceName(resource);
      else if (props.resources.length) setMainResourceName(props.resources[0]);
    }
  }, [props.resources, meQuery.data?.me]);
  const isUserAdmin = useReactiveVar(isAdmin);
  return (
    <React.Fragment>
      <ResourceSwitcher
        mainResourceName={mainResourceName}
        setMainResource={setMainResourceName}
        {...props}
      />
      <Scheduler
        data={props.appointments.filter(
          (el) => el.userId === mainResourceName.id
        )}
        height={"auto"}
      >
        <ViewState currentDate={props.startDate} />
        <MonthView/>
        <Appointments appointmentComponent={Appointment} />
        {isUserAdmin && <EditingState onCommitChanges={props.commitChanges} />}
        {isUserAdmin && <EditRecurrenceMenu />}
        {isUserAdmin && <DragDropProvider />}
        {isUserAdmin && <AppointmentForm />}
      </Scheduler>
    </React.Fragment>
  );
}
