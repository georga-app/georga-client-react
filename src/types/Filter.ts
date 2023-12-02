/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import {
  OrganizationType,
  ProjectType,
  OperationType,
  TaskType,
  ShiftType
} from '@/types/__generated__/graphql'

type FilterObjectType = OrganizationType
                        | ProjectType
                        | OperationType
                        | TaskType
                        | ShiftType
                        | undefined;

type FilterContextType = {
  object: FilterObjectType
  setFilter: (object: FilterObjectType) => void,
  unsetFilter: () => void,
  hasFilter: boolean,
}

function isOrganization(object: any): object is OrganizationType {
    return object?.__typename === "OrganizationType";
}
function isProject(object: any): object is ProjectType {
    return object?.__typename === "ProjectType";
}
function isOperation(object: any): object is OperationType {
    return object?.__typename === "OperationType";
}
function isTask(object: any): object is TaskType {
    return object?.__typename === "TaskType";
}
function isShift(object: any): object is ShiftType {
    return object?.__typename === "ShiftType";
}

export type { FilterObjectType, FilterContextType };
export { isOrganization, isOperation, isProject, isTask, isShift }
