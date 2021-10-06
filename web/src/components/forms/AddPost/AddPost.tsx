import { Button, Checkbox, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { PopUp } from "../../core/PopUp/PopUp";
import { useAddPostMutation } from "../../../generated/graphql";
import { displayResponseMessage } from "../../../utils/displayMessage";

export function AddPost(props: any) {
  const [content, setContent] = useState("");
  const [addPost] = useAddPostMutation();
  const [checked, setChecked] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <PopUp
      maxWidth="sm"
      fullWidth={true}
      title="Add Announcement"
      text={
        <div>
          <TextField
            style={{ marginBottom: "10px" }}
            id="content"
            label="content"
            variant="outlined"
            value={content}
            fullWidth
            multiline
            onChange={(event: any) => {
              setContent(event.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Also send via email?</Typography>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={async (e) => {
              e.preventDefault();
              if (content) {
                try {
                  const res = await addPost({
                    variables: { content: content, sendEmail: checked },
                  });
                  displayResponseMessage(
                    res.data?.addPost || false,
                    "Post added successfully",
                    "Cound not save the post"
                  );
                } catch (error) {}
              }
            }}
          >
            Submit
          </Button>
        </div>
      }
      open={props.open}
      handleClose={() => {
        props.setOpen(false);
      }}
      actions={[
        {
          type: "Cancel",
          action: () => {
            props.setOpen(false);
          },
        },
      ]}
    />
  );
}
