/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import MessageForm from '@/components/message/MessageForm';

import TwoColumns from '@/theme/layouts/TwoColumns';

function ViewMessage({
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
          currentLabel="View Message"
          backUrl="/admin/messages"
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
          <MessageForm
            id={params.id}
            disabled={true}
            onSuccess={(data) => router.push("/admin/messages")}
          />
        </Paper>
      </>
    />
  );
}

export default ViewMessage;
