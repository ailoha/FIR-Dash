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
import ProjectDetails from './project-details';
import { formatAmount, formatDate } from '../utils/formatting';
import '../styles/module.css';

interface Gs {
  id: string;
  proj_name: string;
  owner: string;
  fund_source: string;
  submit_date: Date;
  approve_date: Date;
  submit_amount: number;
  approve_amount: number;
  construction_cost: number;
  pre_cost: number;
  reserve_fund: number;
  audit_agency: string;
  audit_manager: string;
  audit_fee: number;
  audit_score: number;
  remark: string;
  status: 'Accepted' | 'InReview' | 'Suspended' | 'Draft' | 'Reported' | 'Finalized' | 'Archived' | 'Returned';
}

function auditStatusToZh(status: Gs['status']): JSX.Element {
  let statusClass = 'inline-flex items-center rounded-md px-2 py-1 ring-1 ring-inset ring-opacity-10 text-xs font-medium font-mono';
  let statusColor = '';
  let statusText = '';

  switch (status) {
    case 'Accepted':
      statusColor = 'amber';
      statusText = '接审';
      break;
    case 'InReview':
      statusColor = 'green';
      statusText = '在审';
      break;
    case 'Suspended':
      statusColor = 'red';
      statusText = '暂停';
      break;
    case 'Draft':
      statusColor = 'cyan';
      statusText = '征求意见';
      break;
    case 'Reported':
      statusColor = 'sky';
      statusText = '报告审批';
      break;
    case 'Finalized':
      statusColor = 'blue';
      statusText = '审结';
      break;
    case 'Archived':
      statusColor = 'violet';
      statusText = '归档';
      break;
    case 'Returned':
      statusColor = 'slate';
      statusText = '退件';
      break;
    default: return <></>;
  }

  return (
    <span className={`${statusClass}
      bg-${statusColor}-50
      ring-${statusColor}-500
      text-${statusColor}-600
      hover:bg-${statusColor}-100
      hover:ring-${statusColor}-600
      hover:text-${statusColor}-700
    `}>{statusText}</span>
  );
}

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
                    {auditStatusToZh(item.status)}
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
