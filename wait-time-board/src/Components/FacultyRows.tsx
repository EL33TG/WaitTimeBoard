import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Row, { IColumns, IRow } from './Row'
import { IClinic } from '../Queries/Clinic'

const ClinicRowsWrapper = styled.table`
  width: 100%;
`

export type IRows = Array<IRow>
type IClinicRowsProps = {
  rows: IRows
  columns: IColumns
  isEditable?: boolean
  enableDelete?:boolean
  sortFunction: (item1:IRow, item2:IRow) => number, // returns number to quantify how to sort list
  updateRow: (
    rowId:IRow["id"], physicianId:IClinic["physician_id"],
    nurseId:IClinic["nurse_id"], waitTime:IClinic["waittime"]
  ) => void
  deleteRow: (rowId:IRow["id"]) => void
}
function ClinicRows({rows, columns, sortFunction, updateRow, deleteRow, enableDelete=true, isEditable=true}:IClinicRowsProps) {
  const [jsxRows, setJsxRows] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const newJsxRows = [];
    const sortedRows = rows.sort(sortFunction)
    sortedRows.forEach((currRow, i) => {
      newJsxRows.push(
      <Row
        key={i}
        row={currRow}
        columns={columns}
        onRowUpdate={(row) => updateRow(row.id,row.items[0], row.items[1], parseInt(row.items[2]))}
        onRowDelete={() => deleteRow(currRow.id)}
        isEditable={isEditable}
        enableDelete={enableDelete}
      />
    )});

    setJsxRows(newJsxRows)
  },[rows])

  return (
    <ClinicRowsWrapper className="table table-striped" data-classes="table">
    <thead>
      <tr>
        {columns.map((column, i) => <th key={i}>{column.header}</th>)}
      </tr>
    </thead>
    <tbody>{jsxRows}</tbody>
  </ClinicRowsWrapper>
  )
}

export default ClinicRows