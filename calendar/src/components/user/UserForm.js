import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const textMap = {
  userinfo: "내 정보",
  usermodify: "내 정보 수정",
};

export default function UserForm({ type, form }) {
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
                id="standard-read-only-input"
                label="성"
                defaultValue={form.lastname}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="standard-read-only-input"
                label="이름"
                defaultValue={form.firstname}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-read-only-input"
                label="닉네임"
                defaultValue={form.nickname}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-read-only-input"
                label="이메일"
                defaultValue={form.Email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="standard-read-only-input"
                label="전화번호"
                defaultValue={form.phonenumber}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </React.Fragment>
      )}
      {type === "usermodify" && (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
