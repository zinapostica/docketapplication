import * as React from "react";
import { CustomTable } from "../core/CustomTable/CustomTable";
import { Chip, IconButton, makeStyles, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import FaceIcon from "@material-ui/icons/Face";
import { isMobile } from "react-device-detect";
export interface IUsersProps {
  deleteUser: Function;
  editUser: Function;
  users: any[];
}

const tableHead = [
  { name: "Name", type: "desktop-and-mobile" },
  { name: "Email", type: "desktop-only" },
  { name: "Teams", type: "desktop-only" },
  { name: "Start Date", type: "desktop-only" },
  { name: "Is Admin", type: "desktop-only" },
  { name: "Edit", type: "desktop-and-mobile" },
];

const getColumNames = () => {
  const columns: any = [];
  tableHead.forEach((el) => {
    if (isMobile && el.type === "desktop-and-mobile") columns.push(el.name);
    else if (!isMobile) columns.push(el.name);
  });
  return columns;
};

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
}));

export const UsersTable: React.FC<IUsersProps> = (props: IUsersProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomTable
        columns={getColumNames()}
        rows={props.users.map((val) => {
          let teamsString = "";
          val.teams.forEach((element: any, index: any) => {
            teamsString += index === 0 ? element.name : ", " + element.name;
          });
          const mobileRows = [
            <Chip
              size="medium"
              label={
                <Typography color="primary" variant="subtitle1">
                  {val.firstName + " " + val.lastName}
                </Typography>
              }
              icon={<FaceIcon />}
            ></Chip>,
            <React.Fragment>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  props.editUser(val);
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  props.deleteUser(val);
                }}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </React.Fragment>,
          ];
          const desktopRows = [...mobileRows];
          desktopRows.splice(
            1,
            0,
            ...[
              val.email,
              teamsString,
              val.startDate,
              val.isAdmin ? "Yes" : "No",
            ]
          );

          return isMobile ? mobileRows : desktopRows;
        })}
      />
    </div>
  );
};
