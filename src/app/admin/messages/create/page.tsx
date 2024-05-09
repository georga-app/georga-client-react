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

function CreateMessage() {
  const router = useRouter();
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Create Message"
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
          <MessageForm onSuccess={(data) => router.push("/admin/messages")} />
        </Paper>
      </>
    />
  );
}

export default CreateMessage;
