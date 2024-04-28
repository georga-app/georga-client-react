/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonSubscriberView from '@/components/person/PersonSubscriberView';

import TwoColumns from '@/theme/layouts/TwoColumns';

function ViewSubscriber({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter();
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="View Subscriber"
          backUrl="/admin/subscribers"
          backLabel="List"
        />
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            marginX: {
              xs: 1,
              md: "auto"
            },
          }}
        >
          <PersonSubscriberView id={params.id} />
        </Paper>
      </>
    />
  );
}

export default ViewSubscriber;
