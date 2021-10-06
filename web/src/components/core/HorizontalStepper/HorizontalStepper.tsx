import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: "0px 10px 10px 10px",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      //marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    divider: {
      marginBottom: 10,
    },
  })
);

interface Props {
  labels: string[];
  content: any[];
  checkIfStepConditionsAreMet: Function;
}

export const HorizontalStepper: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    props.checkIfStepConditionsAreMet(activeStep, setActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <Stepper activeStep={activeStep}>
        {props.labels.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div>
        <Divider className={classes.divider} />
        <Typography className={classes.instructions}>
          {props.content[activeStep]}
        </Typography>
        <Divider className={classes.divider} />
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStep === props.labels.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </Paper>
  );
};
