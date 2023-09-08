import React from 'react';
import { TableBody, TableRow, TableCell } from '@tremor/react';
import { tableBodyColumns } from './config/TableBodyColumns';
import '../../styles/module.css';

interface TableBodyComponentProps<T> {
  data: T[];
  tableType: string;
  handleOpen: (item: T) => void;
}

function renderTableRow<T>(item: T, tableType: string, handleOpen: (item: T) => void) {
  const columnsConfig = tableBodyColumns[tableType] || [];

  return (
    <TableRow key={(item as any).id}>
      {columnsConfig.map((column, index) => {
        const renderedValue = column.render(item);

        return (
          <TableCell
            className={`
              text-center
              ${index === 0 || index === 1 ? 'sticky-top' : ''}
            `}
            key={index}
          >
            {(index === 2 || index === columnsConfig.length - 1) ? (
              <div className={`
                whitespace-normal
                ${index === 2 ? 'w-64' : 'w-48'}
              `}>
                {renderedValue}
              </div>
            ) : (
              renderedValue
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

function TableBodyComponent<T>({ data, tableType, handleOpen }: TableBodyComponentProps<T>) {
  return (
    <TableBody>
      {data.map((item) => renderTableRow(item, tableType, handleOpen))}
    </TableBody>
  );
}

export default TableBodyComponent;
