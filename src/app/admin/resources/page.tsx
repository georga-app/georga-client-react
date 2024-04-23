/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
// import ResourceTable from '@/components/resource/ResourceTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Resources() {
  return (
    <TwoColumns
      bg='admin'
      left=<></>
      right=<>
        <HeaderNav
          currentLabel="Resources"
          backUrl="/"
          backLabel="Home"
          // backUrl="/admin/qualifications"
          // backLabel="Qualifications"
          // forwardUrl="/admin/fields"
          // forwardLabel="Fields"
        />
        {/*<ResourceTable />*/}
      </>
    />
  );
}

export default Resources;
