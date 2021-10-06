import {
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import Group from "@material-ui/icons/Group";
import * as React from "react";
import { message } from "../../../apollo-client/reactiveVariables";
import { Loading } from "../../core/Loading/Loading";
import {
  useDeleteTeamMutation,
  useAddTeamMutation,
} from "../../../generated/graphql";
import {
  displayResponseMessage,
  displayFetchError,
} from "../../../utils/displayMessage";


export function AddTeam(props: any) {
  const [addTeam] = useAddTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const [team, setTeam] = React.useState("");

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="team"
        label="Team name"
        name="team"
        autoComplete="team"
        autoFocus
        onChange={(e) => {
          setTeam(e.target.value);
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={async (e) => {
          e.preventDefault();
          if (team) {
            try {
              const { data } = await addTeam({
                variables: {
                  name: team,
                },
              });
              if (data?.addTeam.success && data.addTeam.team) {
                props.setTeams([...props.teams, data.addTeam.team]);
                message({
                  ...message(),
                  open: true,
                  message: "Added the team successfully",
                  severity: "success",
                });
              } else {
                message({
                  ...message(),
                  open: true,
                  message: "Failed to add the team",
                  severity: "error",
                });
              }
            } catch (err) {
              displayFetchError();
            }
          }
        }}
      >
        Submit
      </Button>
      <Divider style={{ marginTop: "10px" }} />
      <Typography variant="h6">All teams</Typography>
      {props.loading ? (
        <Loading />
      ) : (
        <div>
          {props.teams.map((el: any, index: any) => (
            <Chip
              style={{ margin: "5px" }}
              key={index}
              icon={<Group />}
              label={el.name}
              onDelete={async () => {
                const res = await deleteTeam({ variables: { name: el.name } });
                displayResponseMessage(
                  res.data?.deleteTeam || false,
                  "Successfully deleted the team",
                  "Could not delete the team"
                );
                if (res.data?.deleteTeam) {
                  props.setTeams(
                    props.teams.filter((team: any) => el.name !== team.name)
                  );
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
