import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import * as React from "react";

export const Appointment: React.FC<any> = ({
  children,
  style,
  data,
  ...restProps
}) => {

  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: data.type === 0 ? '#2196f3' : "#3f51b5",
        borderRadius: "8px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );
};
