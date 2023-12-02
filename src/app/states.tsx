/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import {
  OrganizationType,
  GeorgaOrganizationStateChoices,

  ProjectType,
  GeorgaProjectStateChoices,

  OperationType,
  GeorgaOperationStateChoices,

  TaskType,
  GeorgaTaskStateChoices,

  ShiftType,
  GeorgaShiftStateChoices,

  ParticipantType,
  GeorgaParticipantAcceptanceChoices,
  GeorgaParticipantAdminAcceptanceChoices,

  MessageType,
  GeorgaMessageStateChoices,
  GeorgaMessageEmailDeliveryChoices,
  GeorgaMessagePushDeliveryChoices,
  GeorgaMessageSmsDeliveryChoices,
} from '@/types/__generated__/graphql';

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
  key: keyof OrganizationType,
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

// project
type projectStateTransitionsType = {
  [key in GeorgaProjectStateChoices]: `${GeorgaProjectStateChoices}`[]
}
const projectStateTransitions: projectStateTransitionsType = {
  DRAFT: ['PUBLISHED', 'DELETED'],
  PUBLISHED: ['ARCHIVED', 'DELETED'],
  ARCHIVED: ['DELETED'],
  DELETED: [],
}
const projectState: {
  key: keyof ProjectType,
  sources: projectStateTransitionsType,
  targets: projectStateTransitionsType,
} = {
  key: 'state',
  targets: projectStateTransitions,
  sources: Object.entries(projectStateTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof projectStateTransitionsType);
      })
      return result;
    }, {} as projectStateTransitionsType),
}

// operation
type operationStateTransitionsType = {
  [key in GeorgaOperationStateChoices]: `${GeorgaOperationStateChoices}`[]
}
const operationStateTransitions: operationStateTransitionsType = {
  DRAFT: ['PUBLISHED', 'DELETED'],
  PUBLISHED: ['ARCHIVED', 'DELETED'],
  ARCHIVED: ['DELETED'],
  DELETED: [],
}
const operationState: {
  key: keyof OperationType,
  sources: operationStateTransitionsType,
  targets: operationStateTransitionsType,
} = {
  key: 'state',
  targets: operationStateTransitions,
  sources: Object.entries(operationStateTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof operationStateTransitionsType);
      })
      return result;
    }, {} as operationStateTransitionsType),
}

// task
type taskStateTransitionsType = {
  [key in GeorgaTaskStateChoices]: `${GeorgaTaskStateChoices}`[]
}
const taskStateTransitions: taskStateTransitionsType = {
  DRAFT: ['PUBLISHED', 'DELETED'],
  PUBLISHED: ['ARCHIVED', 'DELETED'],
  ARCHIVED: ['DELETED'],
  DELETED: [],
}
const taskState: {
  key: keyof TaskType,
  sources: taskStateTransitionsType,
  targets: taskStateTransitionsType,
} = {
  key: 'state',
  targets: taskStateTransitions,
  sources: Object.entries(taskStateTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof taskStateTransitionsType);
      })
      return result;
    }, {} as taskStateTransitionsType),
}

// shift
type shiftStateTransitionsType = {
  [key in GeorgaShiftStateChoices]: `${GeorgaShiftStateChoices}`[]
}
const shiftStateTransitions: shiftStateTransitionsType = {
  DRAFT: ['PUBLISHED', 'DELETED'],
  PUBLISHED: ['ARCHIVED', 'FINISHED', 'CANCELED', 'DELETED'],
  FINISHED: ['ARCHIVED', 'DELETED'],
  CANCELED: ['ARCHIVED', 'DELETED'],
  ARCHIVED: ['DELETED'],
  DELETED: [],
}
const shiftState: {
  key: keyof ShiftType,
  sources: shiftStateTransitionsType,
  targets: shiftStateTransitionsType,
} = {
  key: 'state',
  targets: shiftStateTransitions,
  sources: Object.entries(shiftStateTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof shiftStateTransitionsType);
      })
      return result;
    }, {} as shiftStateTransitionsType),
}

// participant
type participantAcceptanceTransitionsType = {
  [key in GeorgaParticipantAcceptanceChoices]: `${GeorgaParticipantAcceptanceChoices}`[]
}
const participantAcceptanceTransitions: participantAcceptanceTransitionsType = {
  ACCEPTED: ['DECLINED', 'PENDING'],
  DECLINED: ['ACCEPTED', 'PENDING'],
  PENDING: ['ACCEPTED', 'DECLINED'],
}
const participantAcceptance: {
  key: keyof ParticipantType,
  sources: participantAcceptanceTransitionsType,
  targets: participantAcceptanceTransitionsType,
} = {
  key: 'acceptance',
  targets: participantAcceptanceTransitions,
  sources: Object.entries(participantAcceptanceTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof participantAcceptanceTransitionsType);
      })
      return result;
    }, {} as participantAcceptanceTransitionsType),
}

type participantAdminAcceptanceTransitionsType = {
  [key in GeorgaParticipantAdminAcceptanceChoices]: `${GeorgaParticipantAdminAcceptanceChoices}`[]
}
const participantAdminAcceptanceTransitions: participantAdminAcceptanceTransitionsType = {
  ACCEPTED: ['DECLINED' ],
  DECLINED: ['ACCEPTED'],
  PENDING: ['ACCEPTED', 'DECLINED'],
  NONE: ['ACCEPTED', 'DECLINED'],
}
const participantAdminAcceptance: {
  key: keyof ParticipantType,
  sources: participantAdminAcceptanceTransitionsType,
  targets: participantAdminAcceptanceTransitionsType,
} = {
  key: 'adminAcceptance',
  targets: participantAdminAcceptanceTransitions,
  sources: Object.entries(participantAdminAcceptanceTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof participantAdminAcceptanceTransitionsType);
      })
      return result;
    }, {} as participantAdminAcceptanceTransitionsType),
}

// message
type messageStateTransitionsType = {
  [key in GeorgaMessageStateChoices]: `${GeorgaMessageStateChoices}`[]
}
const messageStateTransitions: messageStateTransitionsType = {
  DRAFT: ['PUBLISHED', 'DELETED'],
  PUBLISHED: ['ARCHIVED', 'DELETED'],
  ARCHIVED: ['DELETED'],
  DELETED: [],
}
const messageState: {
  key: keyof MessageType,
  sources: messageStateTransitionsType,
  targets: messageStateTransitionsType,
} = {
  key: 'state',
  targets: messageStateTransitions,
  sources: Object.entries(messageStateTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof messageStateTransitionsType);
      })
      return result;
    }, {} as messageStateTransitionsType),
}

type messageEmailDeliveryTransitionsType = {
  [key in GeorgaMessageEmailDeliveryChoices]: `${GeorgaMessageEmailDeliveryChoices}`[]
}
const messageEmailDeliveryTransitions: messageEmailDeliveryTransitionsType = {
  NONE: ['SCHEDULED'],
  SCHEDULED: ['NONE', 'SENT', 'FAILED'],
  SENT: ['SUCCEEDED', 'FAILED'],
  SUCCEEDED: [],
  FAILED: ['SENT'],
}
const messageEmailDelivery: {
  key: keyof MessageType,
  sources: messageEmailDeliveryTransitionsType,
  targets: messageEmailDeliveryTransitionsType,
} = {
  key: 'state',
  targets: messageEmailDeliveryTransitions,
  sources: Object.entries(messageEmailDeliveryTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof messageEmailDeliveryTransitionsType);
      })
      return result;
    }, {} as messageEmailDeliveryTransitionsType),
}

type messagePushDeliveryTransitionsType = {
  [key in GeorgaMessagePushDeliveryChoices]: `${GeorgaMessagePushDeliveryChoices}`[]
}
const messagePushDeliveryTransitions: messagePushDeliveryTransitionsType = {
  NONE: ['SCHEDULED'],
  SCHEDULED: ['NONE', 'SENT', 'FAILED'],
  SENT: ['SUCCEEDED', 'FAILED'],
  SUCCEEDED: [],
  FAILED: ['SENT'],
}
const messagePushDelivery: {
  key: keyof MessageType,
  sources: messagePushDeliveryTransitionsType,
  targets: messagePushDeliveryTransitionsType,
} = {
  key: 'state',
  targets: messagePushDeliveryTransitions,
  sources: Object.entries(messagePushDeliveryTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof messagePushDeliveryTransitionsType);
      })
      return result;
    }, {} as messagePushDeliveryTransitionsType),
}

type messageSmsDeliveryTransitionsType = {
  [key in GeorgaMessageSmsDeliveryChoices]: `${GeorgaMessageSmsDeliveryChoices}`[]
}
const messageSmsDeliveryTransitions: messageSmsDeliveryTransitionsType = {
  NONE: ['SCHEDULED'],
  SCHEDULED: ['NONE', 'SENT', 'FAILED'],
  SENT: ['SUCCEEDED', 'FAILED'],
  SUCCEEDED: [],
  FAILED: ['SENT'],
}
const messageSmsDelivery: {
  key: keyof MessageType,
  sources: messageSmsDeliveryTransitionsType,
  targets: messageSmsDeliveryTransitionsType,
} = {
  key: 'state',
  targets: messageSmsDeliveryTransitions,
  sources: Object.entries(messageSmsDeliveryTransitions).reduce(
    (result, [source, targets]) => {
      targets.forEach((target) => {
        if (!(target in result))
          result[target] = [];
        result[target].push(source as keyof messageSmsDeliveryTransitionsType);
      })
      return result;
    }, {} as messageSmsDeliveryTransitionsType),
}

export {
  organizationState,
  projectState,
  operationState,
  taskState,
  shiftState,
  participantAcceptance,
  participantAdminAcceptance,
  messageState,
  messageEmailDelivery,
  messagePushDelivery,
  messageSmsDelivery,
};
