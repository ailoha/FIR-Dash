import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

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
  state: 'Accepted' | 'InReview' | 'Draft' | 'Reported' | 'Finalized' | 'Archived';
}

function auditStatusToZh(status: Gs['state']): string {
  switch (status) {
    case 'Accepted': return '接审';
    case 'InReview': return '在审';
    case 'Draft': return '征求意见';
    case 'Reported': return '报告审批';
    case 'Finalized': return '审结';
    case 'Archived': return '归档';
    default: return '';
  }
}

export default function GsTable({ gs }: { gs: Gs[] }) {

  const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const numberFormatter = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2,
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>项目编号</TableHeaderCell>
          <TableHeaderCell>项目名称</TableHeaderCell>
          <TableHeaderCell>审核阶段</TableHeaderCell>
          <TableHeaderCell>建设单位</TableHeaderCell>
          <TableHeaderCell>送审日期</TableHeaderCell>
          <TableHeaderCell>审定日期</TableHeaderCell>
          <TableHeaderCell>送审金额</TableHeaderCell>
          <TableHeaderCell>审定金额</TableHeaderCell>
          <TableHeaderCell>其中：建安费</TableHeaderCell>
          <TableHeaderCell>前期费用</TableHeaderCell>
          <TableHeaderCell>预备费</TableHeaderCell>
          <TableHeaderCell>专管员</TableHeaderCell>
          <TableHeaderCell>审核中介</TableHeaderCell>
          <TableHeaderCell>审核服务费</TableHeaderCell>
          <TableHeaderCell>审核服务评分</TableHeaderCell>
          <TableHeaderCell>备注</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gs.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.proj_name}</TableCell>
            <TableCell>{auditStatusToZh(item.state)}</TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{dateFormatter.format(new Date(item.submit_date))}</TableCell>
            <TableCell>{dateFormatter.format(new Date(item.approve_date))}</TableCell>
            <TableCell>{numberFormatter.format(item.submit_amount)}</TableCell>
            <TableCell>{numberFormatter.format(item.approve_amount)}</TableCell>
            <TableCell>{numberFormatter.format(item.construction_cost)}</TableCell>
            <TableCell>{numberFormatter.format(item.pre_cost)}</TableCell>
            <TableCell>{numberFormatter.format(item.reserve_fund)}</TableCell>
            <TableCell>{item.audit_manager}</TableCell>
            <TableCell>{item.audit_agency}</TableCell>
            <TableCell>{numberFormatter.format(item.audit_fee)}</TableCell>
            <TableCell>{item.audit_score}</TableCell>
            <TableCell>{item.remark}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
