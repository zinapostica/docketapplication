import {
  Button,

  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import * as React from "react";
import { DataGridSelection } from "../../core/DataGridSelection/DataGridSelection";
import { DatePicker } from "../../core/DatePicker/DatePicker";
import { OptionSelector } from "../../core/OptionSelector/OptionSelector";
import { Loading } from "../../core/Loading/Loading";
import { message } from "../../../apollo-client/reactiveVariables";
import { AddWorkPatternForm } from "./AddWorkPatternForm/AddWorkPatternForm";
import { PatternPreview } from "./PatternPreview/PatternPreview";
import { Delete } from "@material-ui/icons";
import {
  useEditUserMutation,
  useRegisterUserMutation,
} from "../../../generated/graphql";
import {
  displayFetchError,
  displayResponseMessage,
} from "../../../utils/displayMessage";
export interface IEditUserFormProps {
  user: any;
  actionType: "Add User" | "Edit User";
  open: boolean;
  setOpen: Function;
  teamsLoading: boolean;
  teams: any[];
  setUsers: Function;
  setTotal: Function;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    formItem: {
      marginBottom: 10,
    },
  })
);

export function EditUserForm(props: IEditUserFormProps) {
  const classes = useStyles();
  const [registerUser] = useRegisterUserMutation();
  const [editUser] = useEditUserMutation();
  const [email, setEmail] = React.useState(props.user.email);
  const [firstName, setFirstName] = React.useState(props.user.firstName);
  const [lastName, setLastName] = React.useState(props.user.lastName);
  const [isAdmin, setIsAdmin] = React.useState(props.user.isAdmin);
  const [workPatterns, setWorkPatterns] = React.useState(
    props.user.workPatterns ? props.user.workPatterns : []
  );
  const [newWorkPattern, setNewWorkPattern] = React.useState<any>({});

  const [teams, setTeams] = React.useState(
    props.user.teams ? props.user.teams.map((val: any) => val.name) : []
  );
  const [startDate, setStartDate] = React.useState(
    props.user.startDate && props.actionType === "Edit User"
      ? props.user.startDate
      : ""
  );

  const validateform = () => {
    const valid: boolean =
      email && firstName && lastName && startDate && isAdmin !== undefined;
    if (valid) {
      const user: any = {
        email,
        firstName,
        lastName,
        startDate,
        isAdmin,
        teams: teams ? teams.map((val: any) => ({ name: val })) : [],
        workPatterns: workPatterns
          ? workPatterns.map((val: any) => ({
              endDate: val.endDate,
              startDate: val.startDate,
              repeatsOn: val.repeatsOn,
              patternDetails: val.patternDetails.map((val: any) => ({
                startDate: val.startDate,
                endDate: val.endDate,
                rRule: val.rRule,
              })),
            }))
          : [],
      };
      if (props.actionType === "Add User") addUser(user);
      else if (props.actionType === "Edit User") {
        user.userId = props.user.id;
        editUserDetails(user);
      }
    } else {
      message({
        ...message(),
        open: true,
        message:
          "Email, First Name, Last Name, Start Date, Is Admin are required",
        severity: "error",
      });
    }
  };

  const addUser = async (user: any) => {
    try {
      const response = await registerUser({
        variables: user,
      });
      displayResponseMessage(
        response.data?.registerUser || false,
        "Successfully registered the user",
        "Could not register the user"
      );
      if (response.data?.registerUser) {
        props.setUsers((users: any) => [...users, { ...user }]);
        props.setTotal((total: any) => total + 1);
      //  props.setOpen(false);
      }
    } catch (err) {
      displayFetchError();
      console.log(err);
    }
  };

  const editUserDetails = async (user: any) => {
    try {
      const response = await editUser({
        variables: user,
      });
      displayResponseMessage(
        response.data?.editUser || false,
        "Successfully edited the user",
        "Could not edit the user"
      );
      if (response.data?.editUser) {
        props.setOpen(false);
        props.setUsers((prevState: any) => {
          const stateUser = prevState.find(
            (el: any) => el.email === user.email
          );
          if (stateUser) {
            const index = prevState.indexOf(stateUser);
            const newState = [...prevState];
            newState[index] = { ...newState[index], ...user };
            return newState;
          }
        });
      }
    } catch (err) {
      displayFetchError();
      console.log(err);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <TextField
          className={classes.formItem}
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          autoFocus
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.formItem}
          autoComplete="fname"
          value={firstName}
          name="firstName"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.formItem}
          variant="outlined"
          required
          fullWidth
          value={lastName}
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lname"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        {props.teamsLoading ? (
          <Loading />
        ) : (
          <DataGridSelection
            selected={teams}
            setSelected={setTeams}
            className={classes.formItem}
            columns={[{ field: "id", headerName: "Teams", minWidth: 150 }]}
            rows={
              props.teamsLoading
                ? []
                : props.teams.map((val: any) => ({
                    id: val.name,
                  }))
            }
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <DatePicker
          className={classes.formItem}
          date={startDate}
          label="Start Date at the Company"
          setDate={setStartDate}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <OptionSelector
          class={classes.formItem}
          label="Is admin"
          value={isAdmin}
          setValue={(val: any) => {
            setIsAdmin(val === "true");
          }}
          options={["true", "false"]}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <Typography>Add repetitive work patterns</Typography>
        <Divider className={classes.formItem} />
        <AddWorkPatternForm
          pattern={newWorkPattern}
          setPattern={setNewWorkPattern}
          addPattern={() => {
            setWorkPatterns([...workPatterns, { ...newWorkPattern }]);
            setNewWorkPattern({startDate: "", endDate: "", repeatsOn: "", pattenDetails: [] });
          }}
        />
      </Grid>
      {workPatterns.length ? (
        <Grid item xs={12} sm={12}>
          <Typography>Saved work patterns</Typography>
          {workPatterns.map((workPattern: any, index: any) => (
            <React.Fragment key={index}>
              <IconButton
                onClick={() => {
                  setWorkPatterns(
                    workPatterns.filter((value: any) => value !== workPattern)
                  );
                }}
              >
                <Delete />
              </IconButton>
              <Divider className={classes.formItem} />
              <PatternPreview pattern={workPattern} />
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <React.Fragment />
      )}
      <Grid item xs={12} sm={12}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            validateform();
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
