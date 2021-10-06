import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { isMobile } from "react-device-detect";
const useStyles = makeStyles({
  table: {
    minWidth: !isMobile ? 650 : 200,
  },
});

export interface IUsersProps {
  columns: string[];
  rows: any[][];
}

export function CustomTable(props: IUsersProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.columns.map((val, index) => {
              return (
                <TableCell key={index} align={index === 0 ? "left" : "right"}>
                  {val}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((val, index) => {
                return (
                  <TableCell key={index} align={index === 0 ? "left" : "right"}>
                    {val ? val : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
