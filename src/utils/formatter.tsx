import { AuditStatus } from './tableInterface';

export const formatAmount = (amount: number | null) => {
  if (amount === null || amount === undefined) {
    return '-.--';
  } else {
    const amountFormat = new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
    });
    return amountFormat.format(amount);
  }
};

export const formatDate = (dateString: Date | null) => {
  if (!dateString) {
    return '----年--月--日';
  }
    
  const dateFormat = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return dateFormat.format(new Date(dateString));
};

export function formatStatus(status: AuditStatus): JSX.Element {
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
