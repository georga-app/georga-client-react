/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import TwoColumns from '@/theme/layouts/TwoColumns';
import UnderConstruction from '@/components/shared/UnderConstruction';

import MissionList from '@/components/mission/MissionList';

function Missions() {
  return (
    <TwoColumns
      right=<MissionList />
    />
  );
}

export default Missions;
