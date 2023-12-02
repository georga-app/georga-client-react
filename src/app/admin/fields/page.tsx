/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import TaskFieldTable from '@/components/taskField/TaskFieldTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Fields() {
  return (
    <TwoColumns
      bg='admin'
      left=<></>
      right=<>
        <HeaderNav
          currentLabel="Fields"
          backUrl="/admin/resources"
          backLabel="Resources"
          forwardUrl="/admin/qualifications"
          forwardLabel="Qualifications"
        />
        <TaskFieldTable />
      </>
    />
  );
}

export default Fields;
