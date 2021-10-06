import React from "react";
import TextField from "@material-ui/core/TextField";



export const DatePicker: React.FC<any> = (props: any) => {
 

  return (
    <form noValidate>
      <TextField
      
        {...props}
        
        className={props.className}
        fullWidth
        id="date"
        value={props.date}
        label={props.label}
        type="date"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          if (!props.disabled) props.setDate(e.target.value);
        }}
      />
    </form>
  );
};
