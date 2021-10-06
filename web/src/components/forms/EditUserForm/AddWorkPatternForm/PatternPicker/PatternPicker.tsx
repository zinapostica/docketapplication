import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import { HighlightedCell } from "../../../../calendar/MainCalendar/HighlightedCell/HighlightedCell";


export const PatternPicker = (props: any) => {
  const commitChanges = (change: any) => {
    if (change.added) {
      const startingAddedId =
        props.data.length > 0 ? props.data[props.data.length - 1].id + 1 : 0;
      props.setData([...props.data, { id: startingAddedId, ...change.added }]);
    }
    if (change.changed) {
      props.setData(
        props.data.map((appointment: any) =>
          change.changed[appointment.id]
            ? { ...appointment, ...change.changed[appointment.id] }
            : appointment
        )
      );
    }
    if (change.deleted !== undefined) {
      props.setData(
        props.data.filter(
          (appointment: any) => appointment.id !== change.deleted
        )
      );
    }
  };

  return (
    <Paper>
      <Scheduler data={props.data} height={"auto"}>
        <ViewState currentDate={props.startDate} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView
          startDayHour={0}
          endDayHour={24}
          cellDuration={60 * 4}
          intervalCount={props.interval}
          timeTableCellComponent={HighlightedCell}
        />
        <Appointments />
        <AppointmentForm />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
};
