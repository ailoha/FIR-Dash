import { Card, Title, Text } from '@tremor/react';
import supabase from '../lib/supabase';
import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, username, email')
    .filter('name', 'ilike', `%${search}%`);

  if (error) {
    console.error('Error fetching users:', error);
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a PostgreSQL database (Supabase).
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users || []} />
      </Card>
    </main>
  );
}
