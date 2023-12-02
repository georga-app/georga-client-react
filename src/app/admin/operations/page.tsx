/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import OperationTable from '@/components/operation/OperationTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Operations() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Operations"
          backUrl="/admin/projects"
          backLabel="Projects"
          forwardUrl="/admin/tasks"
          forwardLabel="Tasks"
        />
        <OperationTable />
      </>
    />
  );
}

export default Operations;
