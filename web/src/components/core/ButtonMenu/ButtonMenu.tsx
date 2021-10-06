import { Menu, MenuItem } from "@material-ui/core";

import * as React from "react";

export function ButtonMenu(props: any) {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={props.anchorEl}
      getContentAnchorEl={null}
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
    >
      {props.items.map((element: any, index: any) => (
        <MenuItem
          key={index}
          onClick={() => {
            element.onClick();
          }}
        >
          {element.content}
        </MenuItem>
      ))}
    </Menu>
  );
}
