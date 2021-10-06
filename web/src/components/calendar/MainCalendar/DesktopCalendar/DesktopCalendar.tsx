import * as React from "react";
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedGrouping,
  ChangeSet,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  DragDropProvider,
  GroupingPanel,
  Resources,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  CalendarHeaderStyles,
  HighlightedCell,
} from "../HighlightedCell/HighlightedCell";
import { Appointment } from "../../Appointment/Appointment";
import { useReactiveVar } from "@apollo/client";
import { isAdmin } from "../../../../apollo-client/reactiveVariables";

export interface IDesktopCalendarProps {
  startDate: Date;
  appointments: any[];
  resources: any[];
  commitChanges: (changes: ChangeSet) => void;
}

export function DesktopCalendar(props: IDesktopCalendarProps) {
  const isUserAdmin = useReactiveVar(isAdmin);
  return (
    <div>
      <Scheduler data={props.appointments} height={"auto"}>
        <ViewState currentDate={props.startDate} />
        <GroupingState
          grouping={[
            {
              resourceName: "userId",
            },
          ]}
          groupOrientation={() => "Vertical"}
        />
        <DayView
          startDayHour={0}
          endDayHour={24}
          cellDuration={60 * 6}
          intervalCount={35}
          timeTableCellComponent={HighlightedCell}
          dayScaleCellComponent={CalendarHeaderStyles}
        />
        <Appointments appointmentComponent={Appointment} />
        <Resources data={props.resources} mainResourceName="userId" />
        <IntegratedGrouping />
        <GroupingPanel />
        {isUserAdmin && <EditingState onCommitChanges={props.commitChanges} />}
        {isUserAdmin && <EditRecurrenceMenu />}
        {isUserAdmin && <DragDropProvider />}
        {isUserAdmin && <AppointmentForm />}
      </Scheduler>
    </div>
  );
}
