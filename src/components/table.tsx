'use client';

import '../styles/module.css';

import React, { useState } from 'react';
import { Button } from '@tremor/react';
import Modal from './modal';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

const numberFormatter = new Intl.NumberFormat('zh-CN', {
  minimumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const formatDateString = (dateString: Date | null) => {
  if (!dateString) {
    return '----年--月--日';
  }
  return dateFormatter.format(new Date(dateString));
};

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
  let statusClass = '';
  let statusText = '';

  switch (status) {
    case 'Accepted':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-amber-50 ring-amber-500 ring-opacity-10 text-amber-600';
      statusText = '接审';
      break;
    case 'InReview':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-green-50 ring-green-500 ring-opacity-10 text-green-600';
      statusText = '在审';
      break;
    case 'Suspended':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-red-50 ring-red-500 ring-opacity-10 text-red-600';
      statusText = '暂停';
      break;
    case 'Draft':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-teal-50 ring-teal-500 ring-opacity-10 text-teal-600';
      statusText = '征求意见';
      break;
    case 'Reported':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-sky-50 ring-sky-500 ring-opacity-10 text-sky-600';
      statusText = '报告审批';
      break;
    case 'Finalized':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-blue-50 ring-blue-500 ring-opacity-10 text-blue-600';
      statusText = '审结';
      break;
    case 'Archived':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-violet-50 ring-violet-500 ring-opacity-10 text-violet-600';
      statusText = '归档';
      break;
    case 'Returned':
      statusClass = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset font-mono bg-slate-50 ring-slate-500 ring-opacity-10 text-slate-600';
      statusText = '退件';
      break;
    default: return <></>;
  }

  return <span className={statusClass}>{statusText}</span>;
}

function GsTable({ gs }: { gs: Gs[] }) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Gs | null>(null);

  const handleOpen = (item: Gs) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
                <TableCell>{formatDateString(item.submit_date)}</TableCell>
                <TableCell>{formatDateString(item.approve_date)}</TableCell>
                <TableCell className="text-right">{numberFormatter.format(item.submit_amount)}</TableCell>
                <TableCell className="text-right">{numberFormatter.format(item.approve_amount)}</TableCell>
                <TableCell className="text-right">{numberFormatter.format(reduced_amount)}</TableCell>
                <TableCell className="text-right">{reduction_rate.toFixed(1)}%</TableCell>
                <TableCell>{item.audit_manager}</TableCell>
                <TableCell>{item.audit_agency}</TableCell>
                <TableCell><div className="whitespace-normal w-48">{item.remark}</div></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isOpen && <Modal item={selectedItem} onClose={handleClose} />}
    </>
  );
}

export default React.memo(GsTable);
