import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { HighlightedCell } from "../../../calendar/MainCalendar/HighlightedCell/HighlightedCell";
import { Grid } from "@material-ui/core";
import { DatePicker } from "../../../core/DatePicker/DatePicker";

export interface IPatternPreviewProps {
  pattern: any;
  //    {
  //     startDate: string;
  //     endDate: string;
  //     repeatsOn: string;
  //     patternDetails: [
  //       {
  //         startDate: string;
  //         endDate: string;
  //       }
  //     ];
  //   };
}


export function PatternPreview(props: IPatternPreviewProps) {
  console.log("sddd", props.pattern);
  return (
    <Paper elevation={2}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={4}>
          <DatePicker
            disabled={true}
            date={props.pattern.startDate}
            label="Starts on"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            disabled={true}
            date={props.pattern.repeatsOn}
            label="Repeats on"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {" "}
          <DatePicker
            disabled={true}
            date={props.pattern.endDate}
            label="Ends On"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Scheduler data={props.pattern.patternDetails ? props.pattern.patternDetails : []} height={"auto"}>
            <ViewState currentDate={props.pattern.startDate} />
            <DayView
              startDayHour={0}
              endDayHour={24}
              cellDuration={60 * 4}
              intervalCount={20}
              timeTableCellComponent={HighlightedCell}
            />
            <Appointments />
          </Scheduler>
        </Grid>
      </Grid>
    </Paper>
  );
}
