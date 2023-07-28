import { Card, Title, Text } from '@tremor/react';
import supabase from '../lib/supabase';
import Search from '../components/search';
import GsTable from '../components/table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const { data: gs, error } = await supabase
    .from('gs')
    .select(`
      id,
      proj_name,
      owner,
      submit_date,
      approve_date,
      submit_amount,
      approve_amount,
      construction_cost,
      pre_cost,
      reserve_fund,
      audit_agency,
      audit_manager,
      audit_fee,
      audit_score,
      remark,
      state
    `)
    .filter('id', 'ilike', `%${search}%`)
    .filter('proj_name', 'ilike', `%${search}%`)
    .filter('owner', 'ilike', `%${search}%`)
    .filter('audit_agency', 'ilike', `%${search}%`)
    .filter('audit_manager', 'ilike', `%${search}%`)
    .filter('remark', 'ilike', `%${search}%`);

  if (error) {
    console.error('Error fetching gs-table:', error);
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>概算审核项目一览表</Title>
      <Text></Text>
      <Search />
      <Card className="mt-6">
        <GsTable gs={gs || []} />
      </Card>
    </main>
  );
}
