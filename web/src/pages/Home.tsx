import React from "react";
import { MainCalendar } from "../components/calendar/MainCalendar/MainCalendar";
import RootPage from "./wrappers/RootPage";

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <div>
      <RootPage
        component={<MainCalendar startDate="2021-08-18" interval={20} />}
      />
    </div>
  );
};
