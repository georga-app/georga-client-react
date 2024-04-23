/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import QualificationTable from '@/components/qualification/QualificationTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Qualifications() {
  return (
    <TwoColumns
      bg='admin'
      left=<></>
      right=<>
        <HeaderNav
          currentLabel="Qualifications"
          backUrl="/"
          backLabel="Home"
          // backUrl="/admin/fields"
          // backLabel="Fields"
          // forwardUrl="/admin/resources"
          // forwardLabel="Resources"
        />
        <QualificationTable />
      </>
    />
  );
}

export default Qualifications;
