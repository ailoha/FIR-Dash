import React from 'react';
import { Table } from '@tremor/react';
import TableHeader from './TableHeader';
import TableBodyComponent from './TableBody';
import { Gs } from '../../lib/supabase';

interface TableComponentProps {
  gs: Gs[];
  handleOpen: (item: Gs) => void;
}

function TableComponent({ gs, handleOpen }: TableComponentProps) {
  const tableType = 'Gs'; // 从父组件或其他地方获取表格类型

  return (
    <Table className="scrollable-body">
      <TableHeader tableType={tableType} />
      <TableBodyComponent data={gs} tableType={tableType} handleOpen={handleOpen} />
    </Table>
  );
}

export default TableComponent;