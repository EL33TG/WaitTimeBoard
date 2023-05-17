import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SplitButton, Dropdown } from 'react-bootstrap'

const RowWrapper = styled.tr`
  &:hover {
    cursor: pointer;
  }
`
const TableData = styled.td<{small:boolean}>`
  width: ${props => props.small ? "32px" : "1000px"};
`

const Input = styled.input`
  padding: 4px 8px;
  width: 90%;
  border: 1px solid rgba(0,0,0,0);
  background-color: rgba(0,0,0,0);
  &:focus {
    border: 1px solid black;
  }
`

const DropdownWrapper = styled.div`
  width: 90%;
`

export type IRowItem = string
export type IRow = {
  id: string
  items:Array<IRowItem>
}
export enum IColumnType {
  DROPDOWN,
  STRING
}
export type IColumn = {
  header: string,
  type: IColumnType,
  dropdownMap?: Array<{id:string, value:string}>
}
export type IColumns = Array<IColumn>
type IRowProps = {
  row: IRow
  columns: IColumns
  onRowUpdate: (newRow:IRow) => void
  onRowDelete: () => void
  isEditable: boolean
  enableDelete: boolean
}
function Row({row, columns, onRowUpdate, onRowDelete, isEditable, enableDelete}:IRowProps) {
  
  // ensure cardinality of row items matches specified columns
  useEffect(() => {
    if (row.items.length !== columns.length) { console.error("incompatible row items and specified columns")}
  }, [row, columns])
  
  const handleUpdate = (index:number, newText:string) => {
    console.log(`updating column ${index}`)
    const newItems = row.items.map((item,i) => i === index ? newText : item)
    console.log("newItems Row Data:", {
      physicianId: newItems[0],
      nurseId: newItems[1],
      waitTime: parseInt(newItems[2])
    })
    onRowUpdate({...row, items: newItems})
  }

  return (
		<RowWrapper>
      {row.items.map((item,i) => {
        const currentColumn = columns[i]
        if (currentColumn.type === IColumnType.STRING) {
          return (
            <TableData key={i}>
              <Input
                value={item}
                onChange={(e) => handleUpdate(i, e.target.value)}
                disabled={!isEditable}
              />
            </TableData>
          )
        } else {
          return (
            <TableData key={i}>
              <DropdownWrapper>
                  <Dropdown>
                    <Dropdown.Toggle className="btn btn-light">
                      {currentColumn.dropdownMap.find(kv => kv.id === item).value}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {currentColumn.dropdownMap.map((option,idx) => (
                        <Dropdown.Item key={idx} onClick={() => handleUpdate(i,option.id)}>{option.value}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
              </DropdownWrapper>
            </TableData>
					);
        }
      })}

      {enableDelete && (
        <TableData small>
          <button
            style={{ borderRadius: '25px', padding: '6px 20px' }}
            type='button'
            className='btn btn-danger'
            onClick={onRowDelete}
          >
            Remove
          </button>
        </TableData>
      )}

		</RowWrapper>
	);
}

export default Row