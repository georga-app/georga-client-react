/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { GeorgaOrganizationStateChoices } from '@/types/__generated__/graphql';

// organization
type organizationStateTransitionsType = {
  [key in GeorgaOrganizationStateChoices]: `${GeorgaOrganizationStateChoices}`[]
}
const organizationStateTransitions: organizationStateTransitionsType = {
  DRAFT: ['PUBLISHED', 'DELETED'],
  PUBLISHED: ['ARCHIVED', 'DELETED'],
  ARCHIVED: ['DELETED'],
  DELETED: [],
}
const organizationState: {
  key: string,
  sources: organizationStateTransitionsType,
  targets: organizationStateTransitionsType,
} = {
  key: 'state',
  targets: organizationStateTransitions,
  sources: Object.entries(organizationStateTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof organizationStateTransitionsType);
      })
      return result;
    }, {} as organizationStateTransitionsType),
}


export {
  organizationState,
};
