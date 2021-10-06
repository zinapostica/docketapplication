import * as React from "react";
import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  todayCell: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
  },
  header: {
    
  },
}));

export const HighlightedCell = (props: any) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

export const CalendarHeaderStyles = (props: any) => {
  const classes = useStyles();
  return <WeekView.DayScaleCell {...props} className={classes.header} />;
};
