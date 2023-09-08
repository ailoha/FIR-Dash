import { formatDate, formatAmount, formatStatus } from '../../../utils/formatter';

interface FieldConfig<T> {
  field: keyof T | null;
  render: (item: T) => React.ReactNode;
}

export const tableBodyColumns: { [key: string]: FieldConfig<any>[] } = {
  Gs: [
    { field: 'id', render: (item: any) => item.id },
    { field: 'status', render: (item: any) => formatStatus(item.status) },
    { field: 'proj_name', render: (item: any) => item.proj_name },
    { field: 'fund_source', render: (item: any) => item.fund_source },
    { field: 'owner', render: (item: any) => item.owner },
    { field: 'submit_date', render: (item: any) => formatDate(item.submit_date) },
    { field: 'approve_date', render: (item: any) => formatDate(item.approve_date) },
    { field: 'submit_amount', render: (item: any) => formatAmount(item.submit_amount) },
    { field: 'approve_amount', render: (item: any) => formatAmount(item.approve_amount) },
    { field: null, render: (item: any) => formatAmount(item.submit_amount - item.approve_amount) },
    { field: null, render: (item: any) => {
        const reduced_amount = item.submit_amount - item.approve_amount;
        const reduction_rate = item.submit_amount ? (reduced_amount / item.submit_amount) * 100 : 0;
        return reduction_rate.toFixed(1) + '%';
      }
    },
    { field: 'audit_manager', render: (item: any) => item.audit_manager },
    { field: 'audit_agency', render: (item: any) => item.audit_agency },
    { field: 'remark', render: (item: any) => item.remark },
  ],
  // Add other table types and their respective field configurations here
};