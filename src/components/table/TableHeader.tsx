import React from 'react';
import { TableHead, TableRow, TableHeaderCell } from '@tremor/react';
import { tableHeaderColumns } from './config/TableHeaderColumns';
import '../../styles/module.css';

interface TableHeaderProps {
  tableType: string;
}

function TableHeader({ tableType }: TableHeaderProps) {
  const headers = tableHeaderColumns[tableType] || [];

  return (
    <TableHead className="sticky-header">
      <TableRow>
        {headers.map((header, index) => (
          <TableHeaderCell
            className={`text-center ${index === 0 || index === 1 ? 'sticky-header-top' : ''}`}
            key={index}
          >
            {header}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
