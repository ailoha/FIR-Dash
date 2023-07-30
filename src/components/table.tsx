import React from 'react';
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
  state: 'Accepted' | 'InReview' | 'Draft' | 'Reported' | 'Finalized' | 'Archived' | 'Returned';
}

function auditStatusToZh(status: Gs['state']): string {
  switch (status) {
    case 'Accepted': return '接审';
    case 'InReview': return '在审';
    case 'Draft': return '征求意见';
    case 'Reported': return '报告审批';
    case 'Finalized': return '审结';
    case 'Archived': return '归档';
    case 'Returned': return '退件';
    default: return '';
  }
}

function GsTable({ gs }: { gs: Gs[] }) {

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-center">项目编号</TableHeaderCell>
          <TableHeaderCell className="text-center">项目名称</TableHeaderCell>
          <TableHeaderCell className="text-center">审核阶段</TableHeaderCell>
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
              <TableCell><div className="whitespace-normal w-64">{item.proj_name}</div></TableCell>
              <TableCell className="text-center">{auditStatusToZh(item.state)}</TableCell>
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
  );
}

export default React.memo(GsTable);
