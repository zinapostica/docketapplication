import { Chip, Grid, Typography } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Post } from "../components/Post/Post";
import RootPage from "./wrappers/RootPage";
import { useGetPostsQuery } from "../generated/graphql";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import { isMobile } from "react-device-detect";
import Pagination from "@material-ui/lab/Pagination";

export function Announcements() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { loading, data, error } = useGetPostsQuery({ variables: { page } });
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    if (data?.getPosts.posts) setPosts(data.getPosts.posts);
    if (data?.getPosts.total) setTotal(data.getPosts.total);
  }, [data?.getPosts.posts, data?.getPosts.total]);
  return (
    <div>
      <RootPage
        component={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1vh",
              }}
            >
              <Chip
                size="medium"
                icon={<MessageOutlinedIcon />}
                label={
                  <Typography align="center" variant="h5" color="primary">
                    Announcements
                  </Typography>
                }
              />
            </div>

            {!loading && !error && (
              <Grid
                container
                spacing={2}
                style={{ maxWidth: isMobile ? "90vw" : "80vw" }}
              >
                {" "}
                {posts.map((post: any) => (
                  <Post post={post} setPosts={setPosts} />
                ))}
              </Grid>
            )}
            <Pagination
              page={page}
              count={Math.ceil(total / 10)}
              onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                setPage(value);
              }}
            />
          </div>
        }
      />
    </div>
  );
}
