import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from "@material-ui/icons/Group";
import HelpIcon from "@material-ui/icons/Help";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/grid";
import Calendar from "./Calendar";

import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../../store/actions/auth";
import { setUser } from "../../../store/actions/user";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const WhiteColorStyle = { color: "#FFFFFF" };

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
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
  topRightButton: {
    justifyContent: "flex-start",
    alignItens: "flex-end",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    marginTop: 40,
  },
}));

export default function CalendarWithDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { authError, user } = useSelector(({ auth, user }) => ({
    authError: auth.authError,
    user: user.user,
  }));
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (authError) {
      console.log("로그아웃 오류 발생");
      console.log(authError);
      return;
    }
  }, [authError]);

  const onLogout = () => {
    dispatch(signout());
    dispatch(setUser(null));
    try {
      localStorage.removeItem("user");
      console.log("로컬에서 user 삭제");
      console.log(localStorage);
    } catch (e) {
      console.log("localStorage is NOT working");
    }
    console.log("로그아웃");
  };

  useEffect(() => {
    if (user) {
      console.log("현재" + user + "로그인 중");
    }
  }, [user]);

  //Appbar랑 Toolbar부분이 상단바 부분임
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#2E3B55" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Button style={WhiteColorStyle} size="large">
                Logo
              </Button>
              <Link to="./userinfo">
                <Button style={WhiteColorStyle} size="large">
                  My Page
                </Button>
              </Link>
            </Grid>
            <Grid item>
              {user ? (
                <Button
                  style={WhiteColorStyle}
                  className={classes.topRightButton}
                  onClick={onLogout}
                >
                  LOG OUT
                </Button>
              ) : (
                <div>
                  <Link to="./signin">
                    <Button
                      style={WhiteColorStyle}
                      className={classes.topRightButton}
                    >
                      SIGN IN
                    </Button>
                  </Link>
                  <Link to="./signup">
                    <Button
                      style={WhiteColorStyle}
                      className={classes.topRightButton}
                    >
                      SIGN UP
                    </Button>
                  </Link>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Group 1", "Group 2", "Group 3", "Group 4"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Help", "Donation"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <HelpIcon /> : <AttachMoneyIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Calendar />
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
//main 안에 캘린더를 끼워넣어야 사이드바 드갔다 나왔다 하면서 같이 움직일 듯
