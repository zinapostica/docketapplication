import {
  DataGrid,
  GridColDef,
  GridRowModel,
} from "@material-ui/data-grid";
import * as React from "react";

export interface IDataGridSelectionProps {
  rows: any[];
  columns: any[];
  className: string | undefined;
  selected: any[] | undefined;
  setSelected: Function;
}

export function DataGridSelection(props: IDataGridSelectionProps) {
  return (
    <DataGrid
      className={props.className}
      autoHeight
      rows={props.rows as GridRowModel[]}
      columns={props.columns as GridColDef[]}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={(newSelection: any) => {
        props.setSelected(newSelection);
      }}
      selectionModel={props.selected}
    />
  );
}
