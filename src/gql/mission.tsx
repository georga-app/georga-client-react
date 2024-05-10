/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_MISSION_QUERY = gql(`
  query GetMission (
    $id: ID!
  ) {
    listShifts (
      id: $id
    ) {
      edges {
        node {
          id
          createdAt
          modifiedAt
          startTime
          endTime
          enrollmentDeadline
          state
          task {
            id
            name
            operation {
              id
              name
              project {
                id
                name
                organization {
                  id
                  name
                }
              }
            }
            roleSet {
              edges {
                node {
                  id
                  name
                  description
                  quantity
                  needsAdminAcceptance
                  mandatory {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                  recommended {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                  unrecommended {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                  impossible {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
          roleSet {
            edges {
              node {
                id
                name
                description
                quantity
                needsAdminAcceptance
                mandatory {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                recommended {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                unrecommended {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                impossible {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

const LIST_MISSIONS_QUERY = gql(`
  query ListMissions (
    $task: ID
    $operation: ID
    $project: ID
    $organization: ID
    $state_In: [GeorgaShiftStateChoices]
  ) {
    listShifts (
      task: $task
      task_Operation: $operation
      task_Operation_Project: $project
      task_Operation_Project_Organization: $organization
      state_In: $state_In
    ) {
      edges {
        node {
          id
          state
          startTime
          endTime
          enrollmentDeadline
          task {
            id
            name
            field {
              id
              name
            }
            operation {
              id
              name
              project {
                id
                name
                organization {
                  id
                  name
                }
              }
            }
            roleSet {
              edges {
                node {
                  id
                  name
                  description
                  quantity
                  needsAdminAcceptance
                  mandatory {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                  recommended {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                  unrecommended {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                  impossible {
                    id
                    name
                    group {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
          roleSet {
            edges {
              node {
                id
                name
                description
                quantity
                needsAdminAcceptance
                mandatory {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                recommended {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                unrecommended {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                impossible {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

export {
  GET_MISSION_QUERY,
  LIST_MISSIONS_QUERY,
}
