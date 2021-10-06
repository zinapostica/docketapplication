import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useLogoutMutation } from "../../generated/graphql";
import { isAdmin, isLoggedIn, token } from "../../apollo-client/reactiveVariables";
import { useHistory } from "react-router";
import { Paper } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { ButtonMenu } from "../../components/core/ButtonMenu/ButtonMenu";
import { useState } from "react";
import { AddPost } from "../../components/forms/AddPost/AddPost";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import { AppSideDrawer } from "../../components/AppSideDrawer/AppSideDrawer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    maxHeight: "8vh",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
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
  content: {
    flexGrow: 1,
    height: "91vh",
    overflow: "auto",
    margin: "8vh 2vw 2vw 2vw",
  },
  contentOpen: {},
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function RootPage(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sideAnchor, setSideAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [logout] = useLogoutMutation();
  const isMenuOpen = Boolean(anchorEl);
  const isSideMenuOpen = Boolean(sideAnchor);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  console.log(isAddPostOpen);
  const handleDrawerOpen = (event: any) => {
    if (!isMobile) setOpen(true);
    else {
      setSideAnchor(event.currentTarget);
    }
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changePassword = () => {
    history.push("/changePassword");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={(event) => {
              handleDrawerOpen(event);
            }}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            onClick={() => {
              history.push("/home");
            }}
          >
            DocketApp
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <ButtonMenu
            anchorEl={anchorEl}
            onClose={handleClose}
            open={isMenuOpen}
            items={[
              {
                onClick: changePassword,
                content: "Change Password",
              },
              {
                onClick: async () => {
                  try {
                    const respnose = await logout();
                    if (respnose && respnose.data?.logout) {
                      isLoggedIn(false);
                      token(" ");
                    }
                  } catch (err) {
                    console.log(err);
                  }
                },
                content: "Log out",
              },
            ]}
          />
          <ButtonMenu
            anchorEl={sideAnchor}
            onClose={() => {
              setSideAnchor(null);
            }}
            open={isSideMenuOpen}
            items={[
              {
                onClick: () => {
                  history.push("/manageUsers");
                },
                content: (
                  <React.Fragment>
                    <PeopleAltOutlinedIcon style={{ paddingRight: "2px" }} />
                    <Typography>Manage Users</Typography>
                  </React.Fragment>
                ),
              },
              {
                onClick: () => {
                  history.push("/announcements");
                },
                content: (
                  <React.Fragment>
                    <MessageOutlinedIcon style={{ paddingRight: "2px" }} />
                    <Typography>Announcements</Typography>
                  </React.Fragment>
                ),
              },
              {
                onClick: () => {
                  setIsAddPostOpen(true);
                  setSideAnchor(null);
                },
                content: (
                  <React.Fragment>
                    <PostAddOutlinedIcon style={{ paddingRight: "2px" }} />
                    <Typography>Add Post</Typography>
                  </React.Fragment>
                ),
              },
            ]}
          />
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <React.Fragment />
      ) : (
        <AppSideDrawer
          isOpen={open}
          setIsOpen={setOpen}
          setIsAddPostOpen={setIsAddPostOpen}
        />
      )}
      <AddPost open={isAddPostOpen} setOpen={setIsAddPostOpen} />
      <Paper
        elevation={2}
        className={clsx(classes.content, open && classes.contentOpen)}
      >
        {props.component}
      </Paper>
    </div>
  );
}
