import * as React from "react";
import { SideDrawer } from "../core/SideDrawer/SideDrawer";
import { adminItems, publicItems } from "./drawerItems";

export function AppSideDrawer(props: any) {
  return <SideDrawer {...props} publicItems={publicItems} adminItems={adminItems} />;
}
