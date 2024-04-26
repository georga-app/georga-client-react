/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonPropertyGroupTable from '@/components/personPropertyGroup/PersonPropertyGroupTable';

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
        />
        <PersonPropertyGroupTable />
      </>
    />
  );
}

export default Qualifications;
