import { Grid } from "@material-ui/core";
import moment from "moment";
import * as React from "react";
import { message } from "../../../../apollo-client/reactiveVariables";
import { calculateRecurrenceRule } from "../../../../utils/recurenceRules";
import { PatternPicker } from "./PatternPicker/PatternPicker";
import { PatternPreview } from "../PatternPreview/PatternPreview";
import { DatePicker } from "../../../core/DatePicker/DatePicker";
import { HorizontalStepper } from "../../../core/HorizontalStepper/HorizontalStepper";

export interface IAddWorkPatternFormProps {
  pattern: any;
  addPattern: Function;
  setPattern: Function;
}

export function AddWorkPatternForm(props: IAddWorkPatternFormProps) {
  const [data, setData] = React.useState<any>([]);

  const checkIfStepConditionsAreMet = (
    activeStep: number,
    setActiveStep: Function
  ) => {
    if (
      activeStep === 0 &&
      props.pattern.startDate &&
      props.pattern.repeatsOn
    ) {
      if (
        props.pattern.repeatsOn < props.pattern.startDate ||
        props.pattern.endDate < props.pattern.startDate
      ) {
        message({
          ...message(),
          open: true,
          message:
            ' "Repeats on" and "Ends on" should be greater than "Starts on"',
          severity: "error",
        });
      } else if (props.pattern.endDate < props.pattern.repeatsOn) {
        message({
          ...message(),
          open: true,
          message: ' "Ends on" should be greater than "Repeats on"',
          severity: "error",
        });
      } else {
        setActiveStep((prev: number) => prev + 1);
      }
    } else if (activeStep === 0) {
      message({
        ...message(),
        open: true,
        message: '"Repeats on" and "Starts on" are required',
        severity: "error",
      });
    } else if (activeStep === 1 && data.length) {
      const rRule = calculateRecurrenceRule(
        props.pattern.repeatsOn,
        props.pattern.startDate,
        props.pattern.endDate
      );
      const newData = data.map((val: any) => ({
        ...val,
        rRule,
      }));
      props.setPattern({ ...props.pattern, patternDetails: newData });
      setActiveStep((prev: number) => prev + 1);
    } else if (activeStep === 1) {
      message({
        ...message(),
        open: true,
        message: "Please add at least one work day",
        severity: "error",
      });
    } else if (activeStep === 2) {
      props.addPattern();
      setActiveStep((prev: number) => 0);
      props.setPattern({startDate: "", endDate: "", repeatsOn: "", pattenDetails: [] });
    }
  };
  return (
    <HorizontalStepper
      checkIfStepConditionsAreMet={checkIfStepConditionsAreMet}
      labels={["Set Dates", "Set Shifts", "Preview Pattern"]}
      content={[
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <DatePicker
              date={props.pattern.startDate}
              label="Starts on"
              setDate={(val: any) => {
                props.setPattern({ ...props.pattern, startDate: val });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              date={props.pattern.repeatsOn}
              label="Repeats on"
              setDate={(val: any) => {
                props.setPattern({ ...props.pattern, repeatsOn: val });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {" "}
            <DatePicker
              date={props.pattern.endDate}
              label="Ends On"
              setDate={(val: any) => {
                props.setPattern({ ...props.pattern, endDate: val });
              }}
            />
          </Grid>
        </Grid>,
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <PatternPicker
              data={data}
              setData={setData}
              startDate={props.pattern.startDate}
              interval={
                props.pattern.repeatsOn
                  ? moment(props.pattern.repeatsOn).diff(
                      props.pattern.startDate,
                      "days"
                    ) + 1
                  : moment(props.pattern.endDate).diff(
                      props.pattern.startDate,
                      "days"
                    ) + 1
              }
            />
          </Grid>
        </Grid>,

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <PatternPreview pattern={props.pattern} />
          </Grid>
        </Grid>,
      ]}
    />
  );
}
