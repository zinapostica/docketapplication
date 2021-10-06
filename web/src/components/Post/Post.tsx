import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import moment from "moment";
import { isAdmin } from "../../apollo-client/reactiveVariables";
import { useReactiveVar } from "@apollo/client";
import { useDeletePostMutation } from "../../generated/graphql";
import {
  displayFetchError,
  displayResponseMessage,
} from "../../utils/displayMessage";
export interface IPostProps {
  post: any;
  setPosts: Function;
}

export function Post(props: IPostProps) {
  const isUserAdmin = useReactiveVar(isAdmin);
  const [deletePost] = useDeletePostMutation();
  return props.post ? (
    <Grid item xs={12} sm={6} style={{ padding: "1vw" }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="post">
              {props.post.user.firstName[0] + props.post.user.lastName[0]}
            </Avatar>
          }
          action={
            isUserAdmin && (
              <IconButton
                aria-label="delete"
                onClick={async () => {
                  try {
                    const res = await deletePost({
                      variables: { id: props.post.id },
                    });
                    if (res.data?.deletePost) {
                      props.setPosts((prev: any) => {
                        const newState = prev.filter(
                          (el: any) => el.id !== props.post.id
                        );
                        return newState;
                      });
                    }
                    displayResponseMessage(
                      res.data?.deletePost || false,
                      "Announcement deleted successfully",
                      "Could not delete announcement"
                    );
                  } catch (error) {
                    displayFetchError();
                  }
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            )
          }
          title={props.post.user.firstName + " " + props.post.user.lastName}
          subheader={moment.utc(props.post.date).local().calendar()}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ) : (
    <Card />
  );
}
