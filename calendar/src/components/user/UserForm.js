import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;
const textMap = {
  userinfo: "내 정보",
  usermodify: "내 정보 수정",
};

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function UserForm({ type, form, onSubmit, onChange, error }) {
  const classes = useStyles();
  const text = textMap[type];

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        {text}
      </Typography>
      {type === "userinfo" && (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastname"
                label="성"
                value={form.lastname}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstname"
                label="이름"
                value={form.firstname}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="nickname"
                label="닉네임"
                value={form.nickname}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="Email"
                label="이메일"
                value={form.Email}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="phonenumber"
                label="전화번호"
                value={form.phonenumber}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </React.Fragment>
      )}
      {type === "usermodify" && (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastname"
                label="성"
                value={form.lastname}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstname"
                label="이름"
                onChange={onChange}
                value={form.firstname}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="nickname"
                label="닉네임"
                onChange={onChange}
                value={form.nickname}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="Email"
                label="이메일"
                value={form.Email}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phonenumber"
                label="전화번호"
                value={form.phonenumber}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                type="password"
                label="비밀번호"
                value={form.password}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="passwordConfirm"
                type="password"
                label="비밀번호 확인"
                value={form.passwordConfirm}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onSubmit}
            >
              저장
            </Button>
            <Button className={classes.button}>취소</Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
