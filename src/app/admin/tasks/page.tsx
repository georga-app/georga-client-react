/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import TaskTable from '@/components/task/TaskTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Tasks() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Tasks"
          backUrl="/admin/operations"
          backLabel="Operations"
          forwardUrl="/admin/shifts"
          forwardLabel="Shifts"
        />
        <TaskTable />
      </>
    />
  );
}

export default Tasks;
