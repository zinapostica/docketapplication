import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export interface IOptionSelectorProps {
  label: string;
  value: any;
  options: any[];
  setValue: Function;
  class?: string;
}

export function OptionSelector(props: IOptionSelectorProps) {
  return (
    <FormControl variant="outlined" className={props.class} fullWidth>
      <InputLabel id="selectorLabel">{props.label}</InputLabel>
      <Select
        autoComplete={props.label}
        labelId="selectorLabel"
        id="selector"
        value={props.value}
      >
        {props.options.map((val, index) => (
          <MenuItem
            key={index}
            value={val}
            onClick={(e: any) => {
              props.setValue(val);
            }}
          >
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
