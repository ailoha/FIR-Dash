'use client';

import React, { useState, useCallback } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Button
} from '@tremor/react';
import { Gs } from '../lib/supabase'; 
import ProjectDetails from './project-details';
import { formatAmount, formatDate, formatStatus } from '../utils/formatter';
import '../styles/module.css';

function GsTable({ gs }: { gs: Gs[] }) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Gs | null>(null);

  const handleOpen = useCallback((item: Gs) => {
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Table className="always-scrollbar">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-center">项目编号</TableHeaderCell>
            <TableHeaderCell className="text-center"></TableHeaderCell>
            <TableHeaderCell className="text-center">项目名称</TableHeaderCell>
            <TableHeaderCell className="text-center">资金性质</TableHeaderCell>
            <TableHeaderCell className="text-center">建设单位</TableHeaderCell>
            <TableHeaderCell className="text-center">送审日期</TableHeaderCell>
            <TableHeaderCell className="text-center">审定日期</TableHeaderCell>
            <TableHeaderCell className="text-center">送审金额</TableHeaderCell>
            <TableHeaderCell className="text-center">审定金额</TableHeaderCell>
            <TableHeaderCell className="text-center">核减金额</TableHeaderCell>
            <TableHeaderCell className="text-center">核减率</TableHeaderCell>
            <TableHeaderCell className="text-center">专管员</TableHeaderCell>
            <TableHeaderCell className="text-center">审核中介</TableHeaderCell>
            <TableHeaderCell className="text-center">备注</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gs.map((item) => {
            const reduced_amount = item.submit_amount - item.approve_amount;
            const reduction_rate = item.submit_amount ? (reduced_amount / item.submit_amount) * 100 : 0;
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell className="text-center">
                  <Button variant="light" onClick={() => handleOpen(item)}>
                    {formatStatus(item.status)}
                  </Button>
                </TableCell>
                <TableCell><div className="whitespace-normal w-64">{item.proj_name}</div></TableCell>
                <TableCell>{item.fund_source}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{formatDate(item.submit_date)}</TableCell>
                <TableCell>{formatDate(item.approve_date)}</TableCell>
                <TableCell className="text-right">{formatAmount(item.submit_amount)}</TableCell>
                <TableCell className="text-right">{formatAmount(item.approve_amount)}</TableCell>
                <TableCell className="text-right">{formatAmount(reduced_amount)}</TableCell>
                <TableCell className="text-right">{reduction_rate.toFixed(1)}%</TableCell>
                <TableCell>{item.audit_manager}</TableCell>
                <TableCell>{item.audit_agency}</TableCell>
                <TableCell><div className="whitespace-normal w-48">{item.remark}</div></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isOpen && <ProjectDetails item={selectedItem} onClose={handleClose} />}
    </>
  );
}

export default React.memo(GsTable);
