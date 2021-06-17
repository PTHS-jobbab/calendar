import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BuildIcon from "@material-ui/icons/Build";
import GroupIcon from "@material-ui/icons/Group";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import HelpIcon from "@material-ui/icons/Help";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Material UI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function UserTemplate({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#2E3B55" }}
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            My Page
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link
            component={RouterLink}
            to="/home"
            color="inherit"
            underline="none"
          >
            <ListItem button key="돌아가기">
              <ListItemIcon>
                <KeyboardBackspaceIcon />
              </ListItemIcon>
              <ListItemText primary="돌아가기" />
            </ListItem>
          </Link>
          <Link
            component={RouterLink}
            to="/userinfo"
            color="inherit"
            underline="none"
          >
            <ListItem button key="내 정보">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="내 정보" />
            </ListItem>
          </Link>
          <Link
            component={RouterLink}
            to="/usermodify"
            color="inherit"
            underline="none"
          >
            <ListItem button key="회원 정보 수정">
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="회원 정보 수정" />
            </ListItem>
          </Link>
          <ListItem button key="알림 설정">
            <ListItemIcon>
              <AccessAlarmIcon />
            </ListItemIcon>
            <ListItemText primary="알림 설정" />
          </ListItem>
          <ListItem button key="그룹 관리">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="그룹 관리" />
          </ListItem>
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
        <main className={classes.layout}>
          <Paper className={classes.paper}>{children}</Paper>
          <Copyright />
        </main>
      </main>
    </div>
  );
}
