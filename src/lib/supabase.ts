import 'server-only'
import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined');
}

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

export type AuditStatus = 'Accepted' | 'InReview' | 'Suspended' | 'Draft' | 'Reported' | 'Finalized' | 'Archived' | 'Returned';

export interface Gs {
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
  status: AuditStatus;
}