/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import MessageTable from '@/components/message/MessageTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Messages() {
  return (
    <TwoColumns
      bg='admin'
      left=<></>
      right=<>
        <HeaderNav
          currentLabel="Messages"
          backUrl="/"
          backLabel="Home"
          forwardUrl="/admin/persons"
          forwardLabel="Persons"
        />
        <MessageTable />
      </>
    />
  );
}

export default Messages;
