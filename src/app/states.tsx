/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { GeorgaOrganizationStateChoices } from '@/__generated__/graphql';

// organization
const organizationStateTransitions: {
  [key in GeorgaOrganizationStateChoices]: `${GeorgaOrganizationStateChoices}`[]
} = {
  DRAFT: ['PUBLISHED', 'DELETED'],
  PUBLISHED: ['ARCHIVED', 'DELETED'],
  ARCHIVED: ['DELETED'],
  DELETED: [],
}
const organisazionStateStates = GeorgaOrganizationStateChoices;


export {
  organisazionStateStates,
  organizationStateTransitions,
};