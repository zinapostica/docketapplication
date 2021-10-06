import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { message } from "../../../apollo-client/reactiveVariables";
import {
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Switch,
  Theme,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  useAddPatternDetailMutation,
  useDeletePatternDetailMutation,
  useEditPatternDetailMutation,
  useGetScheduleQuery,
} from "../../../generated/graphql";
import { Loading } from "../../core/Loading/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { DesktopCalendar } from "./DesktopCalendar/DesktopCalendar";
import { MobileCalendar } from "./MobileCalendar/MobileCalendar";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 10,
    },
  })
);

const getDateFromToday = (num: number) => {
  const date = new Date();
  date.setDate(date.getDate() + num);
  return date;
};

export const MainCalendar = (props: any) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [checked, setChecked] = React.useState(false);
  const [startDate, setStartDate] = useState<any>(getDateFromToday(-7));
  const { data, loading, error } = useGetScheduleQuery({
    variables: { page, perPage: 4 },
    fetchPolicy: "cache-and-network",
  });
  const [editPatternDetail] = useEditPatternDetailMutation();
  const [addPatternDetail] = useAddPatternDetailMutation();
  const [deletePatternDetail] = useDeletePatternDetailMutation();

  const [appointments, setAppointments] = useState(
    data?.getSchedule?.appointments
  );
  const [resources, setResources] = useState(data?.getSchedule?.resources);
  const [total, setTotal] = useState<any>(0);

  const commitChanges = async (change: any) => {
    try {
      if (appointments && appointments.length) {
        let newAppointments: any = [...appointments];
        if (
          change.added &&
          change.added.workPatternId &&
          change.added.type === "vertical"
        ) {
          console.log("added", change.added);
          const startingAddedId =
            appointments.length > 0
              ? appointments[appointments.length - 1].id! + 1
              : 0;
          const response = await addPatternDetail({
            variables: {
              startDate: change.added.startDate,
              endDate: change.added.endDate,
              workPatternId: change.added.workPatternId,
            },
          });

          if (response.data?.addPatternDetail) {
            newAppointments.push({
              id: startingAddedId,
              ...change.added,
              type: 0,
            });
          }
        }
        if (change.changed) {
          console.log("changed", change.changed);
          newAppointments = await Promise.all(
            newAppointments.map(async (appointment: any) => {
              if (change.changed[appointment.id]) {
                const newAppointment = {
                  ...appointment,
                  ...change.changed[appointment.id],
                };
                const response = await editPatternDetail({
                  variables: { ...newAppointment },
                });
                if (response.data?.editPatternDetail) return newAppointment;
                else return appointment;
              } else return appointment;
            })
          );
        }
        if (change.deleted !== undefined) {
          const itemToDelete = newAppointments.find(
            (element: any) => element.id === change.deleted
          );
          if (itemToDelete) {
            const response = await deletePatternDetail({
              variables: { patternDetailId: itemToDelete.patternDetailId },
            });
            if (response.data?.deletePatternDetail) {
              const index = newAppointments.indexOf(itemToDelete);
              newAppointments.splice(index, 1);
            }
          }
        }
        if (!(change.added && !change.added.workPatternId)) {
          setAppointments(newAppointments);
          message({
            ...message(),
            open: true,
            message: "Successfully saved the change",
            severity: "success",
          });
        }
      }
    } catch (err) {
      console.log(err);
      message({
        ...message(),
        open: true,
        message: "Failed to save the change",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (data?.getSchedule?.appointments)
      setAppointments(data?.getSchedule?.appointments);
    if (data?.getSchedule?.resources)
      setResources(data?.getSchedule?.resources);
    if (data?.getSchedule?.total) setTotal(data?.getSchedule?.total);
  }, [error, loading, data]);

  const dateArray = startDate.toString().split(" ");
  console.log(appointments);
  return (
    <Paper>
      <div className={classes.header}>
        <IconButton
          onClick={() => {
            setStartDate((prevDate: any) =>
              moment(prevDate, "DD-MM-YYYY").add(
                isMobile || checked ? -30 : -7,
                "days"
              )
            );
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            {dateArray && dateArray[1] + " " + dateArray[3]}
          </Typography>
          {!isMobile && (
            <Switch
              checked={checked}
              onChange={() => {
                setChecked((prev) => !prev);
              }}
              color="default"
            />
          )}
        </div>

        <IconButton
          onClick={() => {
            setStartDate((prevDate: any) =>
              moment(prevDate, "DD-MM-YYYY").add(
                isMobile || checked ? 30 : 7,
                "days"
              )
            );
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      {loading ? (
        <Loading />
      ) : error || !appointments || !resources || !total ? (
        <React.Fragment />
      ) : (
        <div>
          {isMobile || checked ? (
            <MobileCalendar
              startDate={startDate}
              appointments={appointments}
              resources={resources.length ? resources[0].instances : []}
              commitChanges={commitChanges}
            />
          ) : (
            <DesktopCalendar
              startDate={startDate}
              appointments={appointments}
              commitChanges={commitChanges}
              resources={resources}
            />
          )}
        </div>
      )}
      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <Pagination
          page={page}
          count={Math.ceil(total / 4)}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      </footer>
    </Paper>
  );
};
