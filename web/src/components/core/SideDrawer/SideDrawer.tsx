import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { isAdmin } from "../../../apollo-client/reactiveVariables";
import { useReactiveVar } from "@apollo/client";

import { useHistory } from "react-router";
import { Badge } from "@material-ui/core";
import { useGetUnseenPostsNumberQuery } from "../../../generated/graphql";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

export function SideDrawer(props: any) {
  const classes = useStyles();
  const isUserAdmin = useReactiveVar(isAdmin);
  console.log(isUserAdmin);
  const history = useHistory();
  const { data } = useGetUnseenPostsNumberQuery({
    fetchPolicy: "network-only",
  });

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.isOpen && classes.drawerPaperClose
        ),
      }}
      open={props.isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton
          onClick={() => {
            props.setIsOpen(false);
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {props.publicItems.map((val: any, index: any) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              history.push(val.redirect);
            }}
          >
            <ListItemIcon>
              {val.icon}
              {val.text === "Announcements" &&
                data &&
                data.getUnseenPostsNumber > 0 && (
                  <Badge
                    badgeContent={data.getUnseenPostsNumber}
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  />
                )}
            </ListItemIcon>
            <ListItemText primary={val.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isUserAdmin ?
          props.adminItems.map((val:any, index:any) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (val.text !== "Add Announcement") history.push(val.redirect);
                else props.setIsAddPostOpen(true);
              }}
            >
              <ListItemIcon>{val.icon}</ListItemIcon>
              <ListItemText primary={val.text} />
            </ListItem>
          )) : <React.Fragment/>}
      </List>
      <Divider />
    </Drawer>
  );
}
