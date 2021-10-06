import {
  Chip,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useState } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { EditUserForm } from "../components/forms/EditUserForm/EditUserForm";
import { UsersTable } from "../components/UsersTable/UsersTable";
import { Loading } from "../components/core/Loading/Loading";
import RootPage from "./wrappers/RootPage";
import { PopUp } from "../components/core/PopUp/PopUp";
import {
  useDeleteUserMutation,
  useAllUsersQuery,
  useAllTeamsQuery,
} from "../generated/graphql";
import {
  displayFetchError,
  displayResponseMessage,
} from "../utils/displayMessage";
import SupervisedUserCircleTwoToneIcon from "@material-ui/icons/SupervisedUserCircleTwoTone";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { useEffect } from "react";
import { AddTeam } from "../components/forms/AddTeam/AddTeam";
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  title: {
    flexGrow: 3,
    alignContent: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: theme.spacing(2),
  },
}));

export const ManageUsersPage: React.FC = () => {
  const classes = useStyles();
  const [isAddUserPopUpOpen, setIsAddUserPopUpOpen] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [isAddTeamPopUpOpen, setIsAddTeamPopUpOpen] = useState(false);
  const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useAllUsersQuery({
    fetchPolicy: "cache-and-network",
    variables: { page },
  });
  const allTeamsQuery = useAllTeamsQuery({
    fetchPolicy: "cache-and-network",
  });
  const [deleteUserMutation] = useDeleteUserMutation();
  const [users, setUsers] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [teams, setTeams] = useState<any>([]);
  useEffect(() => {
    if (data?.allUsers?.users && data?.allUsers?.total) {
      setUsers(data.allUsers.users);
      setTotal(data.allUsers.total);
    }
    if (allTeamsQuery.data?.allTeams) {
      setTeams(allTeamsQuery.data.allTeams);
    }
  }, [data, allTeamsQuery.data]);

  if (loading) {
    return <RootPage component={Loading} />;
  }
  if (!data?.allUsers?.users || !data?.allUsers?.total || error) {
    displayFetchError();
    return <RootPage component={React.Fragment} />;
  }
  const openPopUp = (user: any) => {
    setIsDeletePopUpOpen(true);
    setItemToDelete(user);
  };
  const deleteUser = async (user: any) => {
    try {
      const response = await deleteUserMutation({
        variables: { userId: user.id },
      });
      if (response.data?.deleteUser) {
        const filteredUsers = users.filter(
          (value: any) => user.id !== value.id
        );
        setUsers(filteredUsers);
      }
      displayResponseMessage(
        response.data?.deleteUser || false,
        "Successfully deleted the user",
        "Could not delete the user"
      );
    } catch (err) {
      displayFetchError();
    }
    setItemToDelete(null);
  };

  return (
    <div>
      <RootPage
        component={
          <div>
            <div className={classes.header}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setIsAddTeamPopUpOpen(true);
                }}
              >
                <GroupAddIcon fontSize="medium" />
              </IconButton>
              <Typography align="center" className={classes.title}>
                <Chip
                  size="medium"
                  icon={<SupervisedUserCircleTwoToneIcon />}
                  label={
                    <Typography align="center" variant="h5" color="primary">
                      Manage Users
                    </Typography>
                  }
                />
              </Typography>

              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setIsAddUserPopUpOpen(true);
                }}
              >
                <PersonAddIcon />
              </IconButton>
            </div>
            <Divider />
            <UsersTable
              users={users}
              editUser={(val: any) => {
                setIsEditPopUpOpen(true);
                setItemToEdit(val);
              }}
              deleteUser={openPopUp}
            />
            <footer className={classes.footer}>
              <Pagination
                page={page}
                count={Math.ceil(total / 10)}
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  value: number
                ) => {
                  setPage(value);
                }}
              />
            </footer>
          </div>
        }
      />
      <PopUp
        maxWidth="md"
        fullWidth={true}
        title="Add User"
        text={
          <EditUserForm
            open={isAddUserPopUpOpen}
            setOpen={setIsAddUserPopUpOpen}
            teams={teams}
            teamsLoading={allTeamsQuery.loading}
            user={""}
            actionType="Add User"
            setUsers={setUsers}
            setTotal={setTotal}
          />
        }
        open={isAddUserPopUpOpen}
        handleClose={() => {
          setIsAddUserPopUpOpen(false);
        }}
        actions={[
          {
            type: "Cancel",
            action: () => {
              setIsAddUserPopUpOpen(false);
            },
          },
        ]}
      />
      <PopUp
        maxWidth="sm"
        fullWidth={true}
        title="Are you sure you want to delete this user?"
        text="Please note that this action is not reversible."
        open={isDeletePopUpOpen}
        handleClose={() => {
          setIsDeletePopUpOpen(false);
        }}
        actions={[
          {
            type: "Yes",
            action: () => {
              deleteUser(itemToDelete);
              setIsDeletePopUpOpen(false);
            },
          },
          {
            type: "No",
            action: () => {
              setIsDeletePopUpOpen(false);
              setItemToDelete(null);
            },
          },
        ]}
      />

      <PopUp
        maxWidth="sm"
        fullWidth={true}
        title="Add Team"
        text={
          <AddTeam
            teams={teams}
            loading={allTeamsQuery.loading}
            setTeams={setTeams}
          />
        }
        open={isAddTeamPopUpOpen}
        handleClose={() => {
          setIsAddTeamPopUpOpen(false);
        }}
        actions={[
          {
            type: "Cancel",
            action: () => {
              setIsAddTeamPopUpOpen(false);
            },
          },
        ]}
      />
      {loading ? (
        <Loading />
      ) : (
        <PopUp
          maxWidth="md"
          fullWidth={true}
          title="Edit user details"
          text={
            <EditUserForm
              open={isEditPopUpOpen}
              setOpen={setIsEditPopUpOpen}
              teams={teams}
              user={itemToEdit}
              actionType={"Edit User"}
              teamsLoading={allTeamsQuery.loading}
              setUsers={setUsers}
              setTotal={setTotal}
            />
          }
          open={isEditPopUpOpen}
          handleClose={() => {
            setIsEditPopUpOpen(false);
          }}
          actions={[
            {
              type: "Cancel",
              action: () => {
                setIsEditPopUpOpen(false);
              },
            },
          ]}
        />
      )}
    </div>
  );
};
