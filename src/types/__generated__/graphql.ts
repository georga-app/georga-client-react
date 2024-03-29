/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: { input: any; output: any; }
};

export type AceInstanceUnion = OperationType | OrganizationType | ProjectType;

export type AceType = Node & {
  __typename?: 'ACEType';
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  instance: AceInstanceUnion;
  modifiedAt: Scalars['DateTime']['output'];
  permission: GeorgaAcePermissionChoices;
  person: PersonType;
};

export type AceTypeConnection = {
  __typename?: 'ACETypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AceTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ACEType` and its cursor. */
export type AceTypeEdge = {
  __typename?: 'ACETypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AceType>;
};

export type AcceptRoleMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type AcceptRoleMutationPayload = {
  __typename?: 'AcceptRoleMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  participant?: Maybe<ParticipantType>;
};

export type ActivatePersonMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type ActivatePersonMutationPayload = {
  __typename?: 'ActivatePersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
};

/** An enumeration. */
export enum AdminLevel {
  /** None */
  None = 'NONE',
  /** Operation */
  Operation = 'OPERATION',
  /** Organization */
  Organization = 'ORGANIZATION',
  /** Project */
  Project = 'PROJECT'
}

export type ChangePersonPasswordMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type ChangePersonPasswordMutationPayload = {
  __typename?: 'ChangePersonPasswordMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  person?: Maybe<PersonType>;
};

export type ChannelFiltersType = {
  __typename?: 'ChannelFiltersType';
  app?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  push?: Maybe<Scalars['String']['output']>;
  sms?: Maybe<Scalars['String']['output']>;
};

export type CreateAceMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  instance: Scalars['ID']['input'];
  permission: Scalars['String']['input'];
  person: Scalars['ID']['input'];
};

export type CreateAceMutationPayload = {
  __typename?: 'CreateACEMutationPayload';
  aCE?: Maybe<AceType>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
};

export type CreateDeviceMutationInput = {
  appStore: Scalars['String']['input'];
  appType: Scalars['String']['input'];
  appVersion: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  osType: Scalars['String']['input'];
  osVersion: Scalars['String']['input'];
  pushToken: Scalars['String']['input'];
  pushTokenType: Scalars['String']['input'];
};

export type CreateDeviceMutationPayload = {
  __typename?: 'CreateDeviceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  device?: Maybe<DeviceType>;
  errors: Array<ErrorType>;
};

export type CreateLocationCategoryMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
};

export type CreateLocationCategoryMutationPayload = {
  __typename?: 'CreateLocationCategoryMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  locationCategory?: Maybe<LocationCategoryType>;
};

export type CreateLocationMutationInput = {
  category: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  postalAddressCity?: InputMaybe<Scalars['String']['input']>;
  postalAddressCountry?: InputMaybe<Scalars['String']['input']>;
  postalAddressName?: InputMaybe<Scalars['String']['input']>;
  postalAddressStreet?: InputMaybe<Scalars['String']['input']>;
  postalAddressZipCode?: InputMaybe<Scalars['String']['input']>;
  shift?: InputMaybe<Scalars['ID']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateLocationMutationPayload = {
  __typename?: 'CreateLocationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  location?: Maybe<LocationType>;
};

export type CreateMessageFilterMutationInput = {
  app: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  person: Scalars['ID']['input'];
  push: Scalars['String']['input'];
  scope: Scalars['ID']['input'];
  sms: Scalars['String']['input'];
};

export type CreateMessageFilterMutationPayload = {
  __typename?: 'CreateMessageFilterMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  messageFilter?: Maybe<MessageFilterType>;
};

export type CreateMessageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  contents: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  scope: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type CreateMessageMutationPayload = {
  __typename?: 'CreateMessageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  message?: Maybe<MessageType>;
};

export type CreateOperationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  project: Scalars['ID']['input'];
};

export type CreateOperationMutationPayload = {
  __typename?: 'CreateOperationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  operation?: Maybe<OperationType>;
};

export type CreateOrganizationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOrganizationMutationPayload = {
  __typename?: 'CreateOrganizationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  organization?: Maybe<OrganizationType>;
};

export type CreateParticipantMutationInput = {
  acceptance: Scalars['String']['input'];
  adminAcceptance?: InputMaybe<Scalars['String']['input']>;
  adminAcceptanceUser?: InputMaybe<Scalars['ID']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  person: Scalars['ID']['input'];
  role: Scalars['ID']['input'];
};

export type CreateParticipantMutationPayload = {
  __typename?: 'CreateParticipantMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  participant?: Maybe<ParticipantType>;
};

export type CreatePersonMutationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  onlyJobRelatedTopics?: InputMaybe<Scalars['String']['input']>;
  organizationsSubscribed?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  password: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  privatePhone?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  street?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePersonMutationPayload = {
  __typename?: 'CreatePersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  person?: Maybe<PersonType>;
};

export type CreatePersonPropertyGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  codename: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  necessity: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
  selectionType: Scalars['String']['input'];
};

export type CreatePersonPropertyGroupMutationPayload = {
  __typename?: 'CreatePersonPropertyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personPropertyGroup?: Maybe<PersonPropertyGroupType>;
};

export type CreatePersonPropertyMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  group: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePersonPropertyMutationPayload = {
  __typename?: 'CreatePersonPropertyMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personProperty?: Maybe<PersonPropertyType>;
};

export type CreatePersonToObjectMutationInput = {
  bookmarked?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  person: Scalars['ID']['input'];
  unnoticed?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreatePersonToObjectMutationPayload = {
  __typename?: 'CreatePersonToObjectMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personToObject?: Maybe<PersonToObjectType>;
};

export type CreateProjectMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
};

export type CreateProjectMutationPayload = {
  __typename?: 'CreateProjectMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  project?: Maybe<ProjectType>;
};

export type CreateRoleMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  needsAdminAcceptance?: InputMaybe<Scalars['Boolean']['input']>;
  quantity: Scalars['Int']['input'];
  shift: Scalars['ID']['input'];
};

export type CreateRoleMutationPayload = {
  __typename?: 'CreateRoleMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  role?: Maybe<RoleType>;
};

export type CreateRoleSpecificationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  necessity: Scalars['String']['input'];
  personProperties?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  role: Scalars['ID']['input'];
};

export type CreateRoleSpecificationMutationPayload = {
  __typename?: 'CreateRoleSpecificationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  roleSpecification?: Maybe<RoleSpecificationType>;
};

export type CreateShiftMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  endTime: Scalars['DateTime']['input'];
  enrollmentDeadline: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
  task: Scalars['ID']['input'];
};

export type CreateShiftMutationPayload = {
  __typename?: 'CreateShiftMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  shift?: Maybe<ShiftType>;
};

export type CreateTaskFieldMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
};

export type CreateTaskFieldMutationPayload = {
  __typename?: 'CreateTaskFieldMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  taskField?: Maybe<TaskFieldType>;
};

export type CreateTaskMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  field: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  operation: Scalars['ID']['input'];
  resourcesDesirable?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  resourcesRequired?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startTime: Scalars['DateTime']['input'];
};

export type CreateTaskMutationPayload = {
  __typename?: 'CreateTaskMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  task?: Maybe<TaskType>;
};

export type DeclineRoleMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeclineRoleMutationPayload = {
  __typename?: 'DeclineRoleMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  participant?: Maybe<ParticipantType>;
};

export type DeleteAceMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteAceMutationPayload = {
  __typename?: 'DeleteACEMutationPayload';
  aCE?: Maybe<AceType>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
};

export type DeleteDeviceMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteDeviceMutationPayload = {
  __typename?: 'DeleteDeviceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  device?: Maybe<DeviceType>;
  errors: Array<ErrorType>;
};

export type DeleteLocationCategoryMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteLocationCategoryMutationPayload = {
  __typename?: 'DeleteLocationCategoryMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  locationCategory?: Maybe<LocationCategoryType>;
};

export type DeleteLocationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteLocationMutationPayload = {
  __typename?: 'DeleteLocationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  location?: Maybe<LocationType>;
};

export type DeleteMessageFilterMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteMessageFilterMutationPayload = {
  __typename?: 'DeleteMessageFilterMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  messageFilter?: Maybe<MessageFilterType>;
};

export type DeleteMessageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteMessageMutationPayload = {
  __typename?: 'DeleteMessageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  message?: Maybe<MessageType>;
};

export type DeleteOperationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteOperationMutationPayload = {
  __typename?: 'DeleteOperationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  operation?: Maybe<OperationType>;
};

export type DeleteOrganizationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteOrganizationMutationPayload = {
  __typename?: 'DeleteOrganizationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  organization?: Maybe<OrganizationType>;
};

export type DeleteParticipantMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteParticipantMutationPayload = {
  __typename?: 'DeleteParticipantMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  participant?: Maybe<ParticipantType>;
};

export type DeletePersonMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeletePersonMutationPayload = {
  __typename?: 'DeletePersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  person?: Maybe<PersonType>;
};

export type DeletePersonPropertyGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeletePersonPropertyGroupMutationPayload = {
  __typename?: 'DeletePersonPropertyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personPropertyGroup?: Maybe<PersonPropertyGroupType>;
};

export type DeletePersonPropertyMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeletePersonPropertyMutationPayload = {
  __typename?: 'DeletePersonPropertyMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personProperty?: Maybe<PersonPropertyType>;
};

export type DeletePersonToObjectMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeletePersonToObjectMutationPayload = {
  __typename?: 'DeletePersonToObjectMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personToObject?: Maybe<PersonToObjectType>;
};

export type DeleteProjectMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteProjectMutationPayload = {
  __typename?: 'DeleteProjectMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  project?: Maybe<ProjectType>;
};

export type DeleteRoleMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteRoleMutationPayload = {
  __typename?: 'DeleteRoleMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  role?: Maybe<RoleType>;
};

export type DeleteRoleSpecificationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteRoleSpecificationMutationPayload = {
  __typename?: 'DeleteRoleSpecificationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  roleSpecification?: Maybe<RoleSpecificationType>;
};

export type DeleteShiftMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteShiftMutationPayload = {
  __typename?: 'DeleteShiftMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  shift?: Maybe<ShiftType>;
};

export type DeleteTaskFieldMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteTaskFieldMutationPayload = {
  __typename?: 'DeleteTaskFieldMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  taskField?: Maybe<TaskFieldType>;
};

export type DeleteTaskMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteTaskMutationPayload = {
  __typename?: 'DeleteTaskMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  task?: Maybe<TaskType>;
};

export type DeviceType = Node & {
  __typename?: 'DeviceType';
  appStore: GeorgaDeviceAppStoreChoices;
  appType: GeorgaDeviceAppTypeChoices;
  appVersion: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  osType: GeorgaDeviceOsTypeChoices;
  osVersion: Scalars['String']['output'];
  pushToken: Scalars['String']['output'];
  pushTokenType: GeorgaDevicePushTokenTypeChoices;
};

export type DeviceTypeConnection = {
  __typename?: 'DeviceTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DeviceTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `DeviceType` and its cursor. */
export type DeviceTypeEdge = {
  __typename?: 'DeviceTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<DeviceType>;
};

export type EquipmentType = Node & {
  __typename?: 'EquipmentType';
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  organization: OrganizationType;
};

export type EquipmentTypeConnection = {
  __typename?: 'EquipmentTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EquipmentTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EquipmentType` and its cursor. */
export type EquipmentTypeEdge = {
  __typename?: 'EquipmentTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<EquipmentType>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String']['output'];
  messages: Array<Scalars['String']['output']>;
};

/** An enumeration. */
export enum GeorgaAcePermissionChoices {
  /** Admin */
  Admin = 'ADMIN'
}

/** An enumeration. */
export enum GeorgaDeviceAppStoreChoices {
  /** Amazon */
  Amazon = 'AMAZON',
  /** F-Droid */
  Fdroid = 'FDROID',
  /** Google Play */
  Googleplay = 'GOOGLEPLAY'
}

/** An enumeration. */
export enum GeorgaDeviceAppTypeChoices {
  /** Maui */
  Maui = 'MAUI',
  /** React */
  React = 'REACT'
}

/** An enumeration. */
export enum GeorgaDeviceOsTypeChoices {
  /** Android */
  Android = 'ANDROID',
  /** iOS */
  Ios = 'IOS',
  /** Linux */
  Linux = 'LINUX',
  /** Other */
  Other = 'OTHER'
}

/** An enumeration. */
export enum GeorgaDevicePushTokenTypeChoices {
  /** APN */
  Apn = 'APN',
  /** FCM */
  Fcm = 'FCM',
  /** NTFY */
  Ntfy = 'NTFY',
  /** OneSignal */
  Onesignal = 'ONESIGNAL'
}

/** An enumeration. */
export enum GeorgaMessageCategoryChoices {
  /** Activity */
  Activity = 'ACTIVITY',
  /** Alert */
  Alert = 'ALERT',
  /** News */
  News = 'NEWS'
}

/** An enumeration. */
export enum GeorgaMessageEmailDeliveryChoices {
  /** Failed */
  Failed = 'FAILED',
  /** None */
  None = 'NONE',
  /** Scheduled */
  Scheduled = 'SCHEDULED',
  /** Sent */
  Sent = 'SENT',
  /** Succeeded */
  Succeeded = 'SUCCEEDED'
}

/** An enumeration. */
export enum GeorgaMessageFilterAppChoices {
  /** Important */
  Important = 'IMPORTANT',
  /** Inherited */
  Inherited = 'INHERITED',
  /** Low */
  Low = 'LOW',
  /** None */
  None = 'NONE',
  /** Normal */
  Normal = 'NORMAL',
  /** Urgent */
  Urgent = 'URGENT'
}

/** An enumeration. */
export enum GeorgaMessageFilterEmailChoices {
  /** Important */
  Important = 'IMPORTANT',
  /** Inherited */
  Inherited = 'INHERITED',
  /** Low */
  Low = 'LOW',
  /** None */
  None = 'NONE',
  /** Normal */
  Normal = 'NORMAL',
  /** Urgent */
  Urgent = 'URGENT'
}

/** An enumeration. */
export enum GeorgaMessageFilterPushChoices {
  /** Important */
  Important = 'IMPORTANT',
  /** Inherited */
  Inherited = 'INHERITED',
  /** Low */
  Low = 'LOW',
  /** None */
  None = 'NONE',
  /** Normal */
  Normal = 'NORMAL',
  /** Urgent */
  Urgent = 'URGENT'
}

/** An enumeration. */
export enum GeorgaMessageFilterSmsChoices {
  /** Important */
  Important = 'IMPORTANT',
  /** Inherited */
  Inherited = 'INHERITED',
  /** Low */
  Low = 'LOW',
  /** None */
  None = 'NONE',
  /** Normal */
  Normal = 'NORMAL',
  /** Urgent */
  Urgent = 'URGENT'
}

/** An enumeration. */
export enum GeorgaMessagePriorityChoices {
  /** Important */
  Important = 'IMPORTANT',
  /** Low */
  Low = 'LOW',
  /** Normal */
  Normal = 'NORMAL',
  /** Urgent */
  Urgent = 'URGENT'
}

/** An enumeration. */
export enum GeorgaMessagePushDeliveryChoices {
  /** Failed */
  Failed = 'FAILED',
  /** None */
  None = 'NONE',
  /** Scheduled */
  Scheduled = 'SCHEDULED',
  /** Sent */
  Sent = 'SENT',
  /** Succeeded */
  Succeeded = 'SUCCEEDED'
}

/** An enumeration. */
export enum GeorgaMessageSmsDeliveryChoices {
  /** Failed */
  Failed = 'FAILED',
  /** None */
  None = 'NONE',
  /** Scheduled */
  Scheduled = 'SCHEDULED',
  /** Sent */
  Sent = 'SENT',
  /** Succeeded */
  Succeeded = 'SUCCEEDED'
}

/** An enumeration. */
export enum GeorgaMessageStateChoices {
  /** Archived */
  Archived = 'ARCHIVED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Draft */
  Draft = 'DRAFT',
  /** Published */
  Published = 'PUBLISHED'
}

/** An enumeration. */
export enum GeorgaOperationStateChoices {
  /** Archived */
  Archived = 'ARCHIVED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Draft */
  Draft = 'DRAFT',
  /** Published */
  Published = 'PUBLISHED'
}

/** An enumeration. */
export enum GeorgaOrganizationStateChoices {
  /** Archived */
  Archived = 'ARCHIVED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Draft */
  Draft = 'DRAFT',
  /** Published */
  Published = 'PUBLISHED'
}

/** An enumeration. */
export enum GeorgaParticipantAcceptanceChoices {
  /** Accepted */
  Accepted = 'ACCEPTED',
  /** Declined */
  Declined = 'DECLINED',
  /** Pending */
  Pending = 'PENDING'
}

/** An enumeration. */
export enum GeorgaParticipantAdminAcceptanceChoices {
  /** Accepted */
  Accepted = 'ACCEPTED',
  /** Declined */
  Declined = 'DECLINED',
  /** None */
  None = 'NONE',
  /** Pending */
  Pending = 'PENDING'
}

/** An enumeration. */
export enum GeorgaPersonOnlyJobRelatedTopicsChoices {
  /** Absolute */
  Absolute = 'ABSOLUTE',
  /** Not only */
  Notonly = 'NOTONLY',
  /** Undefined */
  Undefined = 'UNDEFINED'
}

/** An enumeration. */
export enum GeorgaPersonPropertyGroupNecessityChoices {
  /** Impossible */
  Impossible = 'IMPOSSIBLE',
  /** Mandatory */
  Mandatory = 'MANDATORY',
  /** Recommended */
  Recommended = 'RECOMMENDED',
  /** Unrecommended */
  Unrecommended = 'UNRECOMMENDED'
}

/** An enumeration. */
export enum GeorgaPersonPropertyGroupSelectionTypeChoices {
  /** multiple choice */
  Multiselect = 'MULTISELECT',
  /** single choice */
  Singleselect = 'SINGLESELECT'
}

/** An enumeration. */
export enum GeorgaPersonTitleChoices {
  /** Mr. */
  Mr = 'MR',
  /** Ms. */
  Ms = 'MS',
  /** Mx. */
  Mx = 'MX',
  /** None */
  None = 'NONE'
}

/** An enumeration. */
export enum GeorgaProjectStateChoices {
  /** Archived */
  Archived = 'ARCHIVED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Draft */
  Draft = 'DRAFT',
  /** Published */
  Published = 'PUBLISHED'
}

/** An enumeration. */
export enum GeorgaRoleSpecificationNecessityChoices {
  /** Impossible */
  Impossible = 'IMPOSSIBLE',
  /** Mandatory */
  Mandatory = 'MANDATORY',
  /** Recommended */
  Recommended = 'RECOMMENDED',
  /** Unrecommended */
  Unrecommended = 'UNRECOMMENDED'
}

/** An enumeration. */
export enum GeorgaShiftStateChoices {
  /** Archived */
  Archived = 'ARCHIVED',
  /** Canceled */
  Canceled = 'CANCELED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Draft */
  Draft = 'DRAFT',
  /** Finished */
  Finished = 'FINISHED',
  /** Published */
  Published = 'PUBLISHED'
}

/** An enumeration. */
export enum GeorgaTaskStateChoices {
  /** Archived */
  Archived = 'ARCHIVED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Draft */
  Draft = 'DRAFT',
  /** Published */
  Published = 'PUBLISHED'
}

export type LocationCategoryType = Node & {
  __typename?: 'LocationCategoryType';
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  organization: OrganizationType;
};

export type LocationCategoryTypeConnection = {
  __typename?: 'LocationCategoryTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LocationCategoryTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LocationCategoryType` and its cursor. */
export type LocationCategoryTypeEdge = {
  __typename?: 'LocationCategoryTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<LocationCategoryType>;
};

export type LocationType = Node & {
  __typename?: 'LocationType';
  category: LocationCategoryType;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  postalAddressCity?: Maybe<Scalars['String']['output']>;
  postalAddressCountry?: Maybe<Scalars['String']['output']>;
  postalAddressName?: Maybe<Scalars['String']['output']>;
  postalAddressStreet?: Maybe<Scalars['String']['output']>;
  postalAddressZipCode?: Maybe<Scalars['String']['output']>;
  shift?: Maybe<ShiftType>;
  task?: Maybe<TaskType>;
};

export type LocationTypeConnection = {
  __typename?: 'LocationTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LocationTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LocationType` and its cursor. */
export type LocationTypeEdge = {
  __typename?: 'LocationTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<LocationType>;
};

export type LoginPersonMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPersonMutationPayload = {
  __typename?: 'LoginPersonMutationPayload';
  adminLevel: AdminLevel;
  clientMutationId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

/** An enumeration. */
export enum MessageDeliveryState {
  /** Failed */
  Failed = 'FAILED',
  /** None */
  None = 'NONE',
  /** Scheduled */
  Scheduled = 'SCHEDULED',
  /** Sent */
  Sent = 'SENT',
  /** Succeeded */
  Succeeded = 'SUCCEEDED'
}

export type MessageFilterScopeUnion = OperationType | OrganizationType | PersonType | ProjectType | ShiftType | TaskType;

export type MessageFilterType = Node & {
  __typename?: 'MessageFilterType';
  app: GeorgaMessageFilterAppChoices;
  createdAt: Scalars['DateTime']['output'];
  email: GeorgaMessageFilterEmailChoices;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  person: PersonType;
  push: GeorgaMessageFilterPushChoices;
  scope: MessageFilterScopeUnion;
  sms: GeorgaMessageFilterSmsChoices;
};

export type MessageFilterTypeConnection = {
  __typename?: 'MessageFilterTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MessageFilterTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `MessageFilterType` and its cursor. */
export type MessageFilterTypeEdge = {
  __typename?: 'MessageFilterTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<MessageFilterType>;
};

export type MessageScopeUnion = OperationType | OrganizationType | ProjectType | ShiftType | TaskType;

export type MessageType = Node & {
  __typename?: 'MessageType';
  category: GeorgaMessageCategoryChoices;
  contents: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  delivery: MessageDeliveryState;
  emailDelivery: GeorgaMessageEmailDeliveryChoices;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  priority: GeorgaMessagePriorityChoices;
  pushDelivery: GeorgaMessagePushDeliveryChoices;
  scope: MessageScopeUnion;
  smsDelivery: GeorgaMessageSmsDeliveryChoices;
  state: GeorgaMessageStateChoices;
  title: Scalars['String']['output'];
};

export type MessageTypeConnection = {
  __typename?: 'MessageTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MessageTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `MessageType` and its cursor. */
export type MessageTypeEdge = {
  __typename?: 'MessageTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<MessageType>;
};

export type MutationType = {
  __typename?: 'MutationType';
  acceptRole?: Maybe<AcceptRoleMutationPayload>;
  activatePerson?: Maybe<ActivatePersonMutationPayload>;
  changePersonPassword?: Maybe<ChangePersonPasswordMutationPayload>;
  createAce?: Maybe<CreateAceMutationPayload>;
  createDevice?: Maybe<CreateDeviceMutationPayload>;
  createLocation?: Maybe<CreateLocationMutationPayload>;
  createLocationCategory?: Maybe<CreateLocationCategoryMutationPayload>;
  createMessage?: Maybe<CreateMessageMutationPayload>;
  createMessageFilter?: Maybe<CreateMessageFilterMutationPayload>;
  createOperation?: Maybe<CreateOperationMutationPayload>;
  createOrganization?: Maybe<CreateOrganizationMutationPayload>;
  createParticipant?: Maybe<CreateParticipantMutationPayload>;
  createPerson?: Maybe<CreatePersonMutationPayload>;
  createPersonProperty?: Maybe<CreatePersonPropertyMutationPayload>;
  createPersonPropertyGroup?: Maybe<CreatePersonPropertyGroupMutationPayload>;
  createPersonToObject?: Maybe<CreatePersonToObjectMutationPayload>;
  createProject?: Maybe<CreateProjectMutationPayload>;
  createRole?: Maybe<CreateRoleMutationPayload>;
  createRoleSpecification?: Maybe<CreateRoleSpecificationMutationPayload>;
  createShift?: Maybe<CreateShiftMutationPayload>;
  createTask?: Maybe<CreateTaskMutationPayload>;
  createTaskField?: Maybe<CreateTaskFieldMutationPayload>;
  declineRole?: Maybe<DeclineRoleMutationPayload>;
  deleteAce?: Maybe<DeleteAceMutationPayload>;
  deleteDevice?: Maybe<DeleteDeviceMutationPayload>;
  deleteLocation?: Maybe<DeleteLocationMutationPayload>;
  deleteLocationCategory?: Maybe<DeleteLocationCategoryMutationPayload>;
  deleteMessage?: Maybe<DeleteMessageMutationPayload>;
  deleteMessageFilter?: Maybe<DeleteMessageFilterMutationPayload>;
  deleteOperation?: Maybe<DeleteOperationMutationPayload>;
  deleteOrganization?: Maybe<DeleteOrganizationMutationPayload>;
  deleteParticipant?: Maybe<DeleteParticipantMutationPayload>;
  deletePerson?: Maybe<DeletePersonMutationPayload>;
  deletePersonProperty?: Maybe<DeletePersonPropertyMutationPayload>;
  deletePersonPropertyGroup?: Maybe<DeletePersonPropertyGroupMutationPayload>;
  deletePersonToObject?: Maybe<DeletePersonToObjectMutationPayload>;
  deleteProject?: Maybe<DeleteProjectMutationPayload>;
  deleteRole?: Maybe<DeleteRoleMutationPayload>;
  deleteRoleSpecification?: Maybe<DeleteRoleSpecificationMutationPayload>;
  deleteShift?: Maybe<DeleteShiftMutationPayload>;
  deleteTask?: Maybe<DeleteTaskMutationPayload>;
  deleteTaskField?: Maybe<DeleteTaskFieldMutationPayload>;
  refreshToken?: Maybe<RefreshPayload>;
  registerPerson?: Maybe<RegisterPersonMutationPayload>;
  requestPersonActivation?: Maybe<RequestPersonActivationMutationPayload>;
  requestPersonPasswordReset?: Maybe<RequestPersonPasswordResetMutationPayload>;
  resetPersonPassword?: Maybe<ResetPersonPasswordMutationPayload>;
  revokeToken?: Maybe<RevokePayload>;
  testSubscriptionEvent?: Maybe<TestSubscriptionEventMutationPayload>;
  tokenAuth?: Maybe<LoginPersonMutationPayload>;
  updateDevice?: Maybe<UpdateDeviceMutationPayload>;
  updateLocation?: Maybe<UpdateLocationMutationPayload>;
  updateLocationCategory?: Maybe<UpdateLocationCategoryMutationPayload>;
  updateMessage?: Maybe<UpdateMessageMutationPayload>;
  updateMessageFilter?: Maybe<UpdateMessageFilterMutationPayload>;
  updateOperation?: Maybe<UpdateOperationMutationPayload>;
  updateOrganization?: Maybe<UpdateOrganizationMutationPayload>;
  updateParticipant?: Maybe<UpdateParticipantMutationPayload>;
  updatePerson?: Maybe<UpdatePersonMutationPayload>;
  updatePersonProfile?: Maybe<UpdatePersonProfileMutationPayload>;
  updatePersonProperty?: Maybe<UpdatePersonPropertyMutationPayload>;
  updatePersonPropertyGroup?: Maybe<UpdatePersonPropertyGroupMutationPayload>;
  updatePersonToObject?: Maybe<UpdatePersonToObjectMutationPayload>;
  updateProject?: Maybe<UpdateProjectMutationPayload>;
  updateRole?: Maybe<UpdateRoleMutationPayload>;
  updateRoleSpecification?: Maybe<UpdateRoleSpecificationMutationPayload>;
  updateShift?: Maybe<UpdateShiftMutationPayload>;
  updateTask?: Maybe<UpdateTaskMutationPayload>;
  updateTaskField?: Maybe<UpdateTaskFieldMutationPayload>;
  verifyToken?: Maybe<VerifyPayload>;
};


export type MutationTypeAcceptRoleArgs = {
  input: AcceptRoleMutationInput;
};


export type MutationTypeActivatePersonArgs = {
  input: ActivatePersonMutationInput;
};


export type MutationTypeChangePersonPasswordArgs = {
  input: ChangePersonPasswordMutationInput;
};


export type MutationTypeCreateAceArgs = {
  input: CreateAceMutationInput;
};


export type MutationTypeCreateDeviceArgs = {
  input: CreateDeviceMutationInput;
};


export type MutationTypeCreateLocationArgs = {
  input: CreateLocationMutationInput;
};


export type MutationTypeCreateLocationCategoryArgs = {
  input: CreateLocationCategoryMutationInput;
};


export type MutationTypeCreateMessageArgs = {
  input: CreateMessageMutationInput;
};


export type MutationTypeCreateMessageFilterArgs = {
  input: CreateMessageFilterMutationInput;
};


export type MutationTypeCreateOperationArgs = {
  input: CreateOperationMutationInput;
};


export type MutationTypeCreateOrganizationArgs = {
  input: CreateOrganizationMutationInput;
};


export type MutationTypeCreateParticipantArgs = {
  input: CreateParticipantMutationInput;
};


export type MutationTypeCreatePersonArgs = {
  input: CreatePersonMutationInput;
};


export type MutationTypeCreatePersonPropertyArgs = {
  input: CreatePersonPropertyMutationInput;
};


export type MutationTypeCreatePersonPropertyGroupArgs = {
  input: CreatePersonPropertyGroupMutationInput;
};


export type MutationTypeCreatePersonToObjectArgs = {
  input: CreatePersonToObjectMutationInput;
};


export type MutationTypeCreateProjectArgs = {
  input: CreateProjectMutationInput;
};


export type MutationTypeCreateRoleArgs = {
  input: CreateRoleMutationInput;
};


export type MutationTypeCreateRoleSpecificationArgs = {
  input: CreateRoleSpecificationMutationInput;
};


export type MutationTypeCreateShiftArgs = {
  input: CreateShiftMutationInput;
};


export type MutationTypeCreateTaskArgs = {
  input: CreateTaskMutationInput;
};


export type MutationTypeCreateTaskFieldArgs = {
  input: CreateTaskFieldMutationInput;
};


export type MutationTypeDeclineRoleArgs = {
  input: DeclineRoleMutationInput;
};


export type MutationTypeDeleteAceArgs = {
  input: DeleteAceMutationInput;
};


export type MutationTypeDeleteDeviceArgs = {
  input: DeleteDeviceMutationInput;
};


export type MutationTypeDeleteLocationArgs = {
  input: DeleteLocationMutationInput;
};


export type MutationTypeDeleteLocationCategoryArgs = {
  input: DeleteLocationCategoryMutationInput;
};


export type MutationTypeDeleteMessageArgs = {
  input: DeleteMessageMutationInput;
};


export type MutationTypeDeleteMessageFilterArgs = {
  input: DeleteMessageFilterMutationInput;
};


export type MutationTypeDeleteOperationArgs = {
  input: DeleteOperationMutationInput;
};


export type MutationTypeDeleteOrganizationArgs = {
  input: DeleteOrganizationMutationInput;
};


export type MutationTypeDeleteParticipantArgs = {
  input: DeleteParticipantMutationInput;
};


export type MutationTypeDeletePersonArgs = {
  input: DeletePersonMutationInput;
};


export type MutationTypeDeletePersonPropertyArgs = {
  input: DeletePersonPropertyMutationInput;
};


export type MutationTypeDeletePersonPropertyGroupArgs = {
  input: DeletePersonPropertyGroupMutationInput;
};


export type MutationTypeDeletePersonToObjectArgs = {
  input: DeletePersonToObjectMutationInput;
};


export type MutationTypeDeleteProjectArgs = {
  input: DeleteProjectMutationInput;
};


export type MutationTypeDeleteRoleArgs = {
  input: DeleteRoleMutationInput;
};


export type MutationTypeDeleteRoleSpecificationArgs = {
  input: DeleteRoleSpecificationMutationInput;
};


export type MutationTypeDeleteShiftArgs = {
  input: DeleteShiftMutationInput;
};


export type MutationTypeDeleteTaskArgs = {
  input: DeleteTaskMutationInput;
};


export type MutationTypeDeleteTaskFieldArgs = {
  input: DeleteTaskFieldMutationInput;
};


export type MutationTypeRefreshTokenArgs = {
  input: RefreshInput;
};


export type MutationTypeRegisterPersonArgs = {
  input: RegisterPersonMutationInput;
};


export type MutationTypeRequestPersonActivationArgs = {
  input: RequestPersonActivationMutationInput;
};


export type MutationTypeRequestPersonPasswordResetArgs = {
  input: RequestPersonPasswordResetMutationInput;
};


export type MutationTypeResetPersonPasswordArgs = {
  input: ResetPersonPasswordMutationInput;
};


export type MutationTypeRevokeTokenArgs = {
  input: RevokeInput;
};


export type MutationTypeTestSubscriptionEventArgs = {
  message: Scalars['String']['input'];
};


export type MutationTypeTokenAuthArgs = {
  input: LoginPersonMutationInput;
};


export type MutationTypeUpdateDeviceArgs = {
  input: UpdateDeviceMutationInput;
};


export type MutationTypeUpdateLocationArgs = {
  input: UpdateLocationMutationInput;
};


export type MutationTypeUpdateLocationCategoryArgs = {
  input: UpdateLocationCategoryMutationInput;
};


export type MutationTypeUpdateMessageArgs = {
  input: UpdateMessageMutationInput;
};


export type MutationTypeUpdateMessageFilterArgs = {
  input: UpdateMessageFilterMutationInput;
};


export type MutationTypeUpdateOperationArgs = {
  input: UpdateOperationMutationInput;
};


export type MutationTypeUpdateOrganizationArgs = {
  input: UpdateOrganizationMutationInput;
};


export type MutationTypeUpdateParticipantArgs = {
  input: UpdateParticipantMutationInput;
};


export type MutationTypeUpdatePersonArgs = {
  input: UpdatePersonMutationInput;
};


export type MutationTypeUpdatePersonProfileArgs = {
  input: UpdatePersonProfileMutationInput;
};


export type MutationTypeUpdatePersonPropertyArgs = {
  input: UpdatePersonPropertyMutationInput;
};


export type MutationTypeUpdatePersonPropertyGroupArgs = {
  input: UpdatePersonPropertyGroupMutationInput;
};


export type MutationTypeUpdatePersonToObjectArgs = {
  input: UpdatePersonToObjectMutationInput;
};


export type MutationTypeUpdateProjectArgs = {
  input: UpdateProjectMutationInput;
};


export type MutationTypeUpdateRoleArgs = {
  input: UpdateRoleMutationInput;
};


export type MutationTypeUpdateRoleSpecificationArgs = {
  input: UpdateRoleSpecificationMutationInput;
};


export type MutationTypeUpdateShiftArgs = {
  input: UpdateShiftMutationInput;
};


export type MutationTypeUpdateTaskArgs = {
  input: UpdateTaskMutationInput;
};


export type MutationTypeUpdateTaskFieldArgs = {
  input: UpdateTaskFieldMutationInput;
};


export type MutationTypeVerifyTokenArgs = {
  input: VerifyInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type OperationType = Node & {
  __typename?: 'OperationType';
  ace?: Maybe<AceTypeConnection>;
  channelFilters?: Maybe<ChannelFiltersType>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  messageFilters?: Maybe<MessageFilterTypeConnection>;
  messages?: Maybe<MessageTypeConnection>;
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  personAttributes?: Maybe<PersonToObjectTypeConnection>;
  project: ProjectType;
  state: GeorgaOperationStateChoices;
};


export type OperationTypeAceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OperationTypeMessageFiltersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OperationTypeMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<GeorgaMessageStateChoices>;
};


export type OperationTypePersonAttributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type OperationTypeConnection = {
  __typename?: 'OperationTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OperationTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OperationType` and its cursor. */
export type OperationTypeEdge = {
  __typename?: 'OperationTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<OperationType>;
};

export type OrganizationType = Node & {
  __typename?: 'OrganizationType';
  ace?: Maybe<AceTypeConnection>;
  channelFilters?: Maybe<ChannelFiltersType>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  messageFilters?: Maybe<MessageFilterTypeConnection>;
  messages?: Maybe<MessageTypeConnection>;
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  personAttributes?: Maybe<PersonToObjectTypeConnection>;
  state: GeorgaOrganizationStateChoices;
};


export type OrganizationTypeAceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OrganizationTypeMessageFiltersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OrganizationTypeMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<GeorgaMessageStateChoices>;
};


export type OrganizationTypePersonAttributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationTypeConnection = {
  __typename?: 'OrganizationTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrganizationTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OrganizationType` and its cursor. */
export type OrganizationTypeEdge = {
  __typename?: 'OrganizationTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<OrganizationType>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type ParticipantType = Node & {
  __typename?: 'ParticipantType';
  acceptance: GeorgaParticipantAcceptanceChoices;
  adminAcceptance?: Maybe<GeorgaParticipantAdminAcceptanceChoices>;
  adminAcceptanceUser?: Maybe<PersonType>;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  person: PersonType;
  role: RoleType;
};

export type ParticipantTypeConnection = {
  __typename?: 'ParticipantTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ParticipantTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ParticipantType` and its cursor. */
export type ParticipantTypeEdge = {
  __typename?: 'ParticipantTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<ParticipantType>;
};

export type PersonPropertyGroupType = Node & {
  __typename?: 'PersonPropertyGroupType';
  codename: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
  necessity: GeorgaPersonPropertyGroupNecessityChoices;
  organization: OrganizationType;
  personpropertySet: PersonPropertyTypeConnection;
  selectionType: GeorgaPersonPropertyGroupSelectionTypeChoices;
};


export type PersonPropertyGroupTypePersonpropertySetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  group?: InputMaybe<Scalars['ID']['input']>;
  group_Codename?: InputMaybe<Scalars['String']['input']>;
  group_Codename_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Name?: InputMaybe<Scalars['String']['input']>;
  group_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonPropertyGroupTypeConnection = {
  __typename?: 'PersonPropertyGroupTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PersonPropertyGroupTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PersonPropertyGroupType` and its cursor. */
export type PersonPropertyGroupTypeEdge = {
  __typename?: 'PersonPropertyGroupTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<PersonPropertyGroupType>;
};

export type PersonPropertyType = Node & {
  __typename?: 'PersonPropertyType';
  createdAt: Scalars['DateTime']['output'];
  group: PersonPropertyGroupType;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
  personSet: PersonTypeConnection;
};


export type PersonPropertyTypePersonSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  city_Icontains?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  dateJoined?: InputMaybe<Scalars['DateTime']['input']>;
  dateJoined_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  dateJoined_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_Icontains?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstName_Icontains?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  lastLogin?: InputMaybe<Scalars['DateTime']['input']>;
  lastLogin_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastLogin_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lastName_Icontains?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  mobilePhone_Icontains?: InputMaybe<Scalars['String']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  number_Icontains?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  occupation_Icontains?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyJobRelatedTopics?: InputMaybe<GeorgaPersonOnlyJobRelatedTopicsChoices>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  postalCode_Icontains?: InputMaybe<Scalars['String']['input']>;
  privatePhone?: InputMaybe<Scalars['String']['input']>;
  privatePhone_Icontains?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['ID']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  street_Icontains?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<GeorgaPersonTitleChoices>;
};

export type PersonPropertyTypeConnection = {
  __typename?: 'PersonPropertyTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PersonPropertyTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PersonPropertyType` and its cursor. */
export type PersonPropertyTypeEdge = {
  __typename?: 'PersonPropertyTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<PersonPropertyType>;
};

export type PersonToObjectRelationObjectUnion = MessageType | OperationType | OrganizationType | ProjectType | RoleType | ShiftType | TaskType;

export type PersonToObjectType = Node & {
  __typename?: 'PersonToObjectType';
  bookmarked: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  person: PersonType;
  relationObject: PersonToObjectRelationObjectUnion;
  unnoticed: Scalars['Boolean']['output'];
};

export type PersonToObjectTypeConnection = {
  __typename?: 'PersonToObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PersonToObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PersonToObjectType` and its cursor. */
export type PersonToObjectTypeEdge = {
  __typename?: 'PersonToObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<PersonToObjectType>;
};

export type PersonType = Node & {
  __typename?: 'PersonType';
  aceSet: AceTypeConnection;
  adminLevel: AdminLevel;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateJoined: Scalars['DateTime']['output'];
  defaultMessageFilter?: Maybe<MessageFilterTypeConnection>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  mobilePhone?: Maybe<Scalars['String']['output']>;
  modifiedAt: Scalars['DateTime']['output'];
  number?: Maybe<Scalars['String']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  onlyJobRelatedTopics?: Maybe<GeorgaPersonOnlyJobRelatedTopicsChoices>;
  organizationsSubscribed: OrganizationTypeConnection;
  postalCode?: Maybe<Scalars['String']['output']>;
  privatePhone?: Maybe<Scalars['String']['output']>;
  properties: PersonPropertyTypeConnection;
  street?: Maybe<Scalars['String']['output']>;
  title?: Maybe<GeorgaPersonTitleChoices>;
};


export type PersonTypeAceSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonTypeDefaultMessageFilterArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonTypeOrganizationsSubscribedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonTypePropertiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  group?: InputMaybe<Scalars['ID']['input']>;
  group_Codename?: InputMaybe<Scalars['String']['input']>;
  group_Codename_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Name?: InputMaybe<Scalars['String']['input']>;
  group_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonTypeConnection = {
  __typename?: 'PersonTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PersonTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PersonType` and its cursor. */
export type PersonTypeEdge = {
  __typename?: 'PersonTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<PersonType>;
};

export type ProjectType = Node & {
  __typename?: 'ProjectType';
  ace?: Maybe<AceTypeConnection>;
  channelFilters?: Maybe<ChannelFiltersType>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  messageFilters?: Maybe<MessageFilterTypeConnection>;
  messages?: Maybe<MessageTypeConnection>;
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  organization: OrganizationType;
  personAttributes?: Maybe<PersonToObjectTypeConnection>;
  state: GeorgaProjectStateChoices;
};


export type ProjectTypeAceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type ProjectTypeMessageFiltersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type ProjectTypeMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<GeorgaMessageStateChoices>;
};


export type ProjectTypePersonAttributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectTypeConnection = {
  __typename?: 'ProjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProjectType` and its cursor. */
export type ProjectTypeEdge = {
  __typename?: 'ProjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<ProjectType>;
};

export type QueryType = {
  __typename?: 'QueryType';
  getPersonProfile?: Maybe<PersonType>;
  listAces?: Maybe<AceTypeConnection>;
  listDevices?: Maybe<DeviceTypeConnection>;
  listEquipment?: Maybe<EquipmentTypeConnection>;
  listLocationCategories?: Maybe<LocationCategoryTypeConnection>;
  listLocations?: Maybe<LocationTypeConnection>;
  listMessageFilters?: Maybe<MessageFilterTypeConnection>;
  listMessages?: Maybe<MessageTypeConnection>;
  listOperations?: Maybe<OperationTypeConnection>;
  listOrganizations?: Maybe<OrganizationTypeConnection>;
  listParticipants?: Maybe<ParticipantTypeConnection>;
  listPersonProperties?: Maybe<PersonPropertyTypeConnection>;
  listPersonPropertyGroups?: Maybe<PersonPropertyGroupTypeConnection>;
  listPersonToObjects?: Maybe<PersonToObjectTypeConnection>;
  listPersons?: Maybe<PersonTypeConnection>;
  listProjects?: Maybe<ProjectTypeConnection>;
  listResources?: Maybe<ResourceTypeConnection>;
  listRoleSpecifications?: Maybe<RoleSpecificationTypeConnection>;
  listRoles?: Maybe<RoleTypeConnection>;
  listShifts?: Maybe<ShiftTypeConnection>;
  listTaskFields?: Maybe<TaskFieldTypeConnection>;
  listTasks?: Maybe<TaskTypeConnection>;
  node?: Maybe<Node>;
};


export type QueryTypeListAcesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  instance?: InputMaybe<Scalars['ID']['input']>;
  instance_In?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListDevicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListEquipmentArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListLocationCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  postalAddressName?: InputMaybe<Scalars['String']['input']>;
  postalAddressName_Icontains?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTypeListMessageFiltersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  scope?: InputMaybe<Scalars['ID']['input']>;
  scope_In?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type QueryTypeListMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  scope?: InputMaybe<Scalars['ID']['input']>;
  scope_In?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  state?: InputMaybe<GeorgaMessageStateChoices>;
};


export type QueryTypeListOperationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  project?: InputMaybe<Scalars['ID']['input']>;
  project_Organization?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTypeListOrganizationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListParticipantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  role_Shift?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task_Operation?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task_Operation_Project?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task_Operation_Project_Organization?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTypeListPersonPropertiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  group?: InputMaybe<Scalars['ID']['input']>;
  group_Codename?: InputMaybe<Scalars['String']['input']>;
  group_Codename_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Name?: InputMaybe<Scalars['String']['input']>;
  group_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListPersonPropertyGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  codename?: InputMaybe<Scalars['String']['input']>;
  codename_Icontains?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  necessity?: InputMaybe<GeorgaPersonPropertyGroupNecessityChoices>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  organization_Name?: InputMaybe<Scalars['String']['input']>;
  organization_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTypeListPersonToObjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  relationObject?: InputMaybe<Scalars['ID']['input']>;
  relationObject_In?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type QueryTypeListPersonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  city_Icontains?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  dateJoined?: InputMaybe<Scalars['DateTime']['input']>;
  dateJoined_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  dateJoined_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_Icontains?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstName_Icontains?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  lastLogin?: InputMaybe<Scalars['DateTime']['input']>;
  lastLogin_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastLogin_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lastName_Icontains?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  mobilePhone_Icontains?: InputMaybe<Scalars['String']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  number_Icontains?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  occupation_Icontains?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyJobRelatedTopics?: InputMaybe<GeorgaPersonOnlyJobRelatedTopicsChoices>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  postalCode_Icontains?: InputMaybe<Scalars['String']['input']>;
  privatePhone?: InputMaybe<Scalars['String']['input']>;
  privatePhone_Icontains?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['ID']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  street_Icontains?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<GeorgaPersonTitleChoices>;
};


export type QueryTypeListProjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTypeListResourcesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListRoleSpecificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListRolesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListShiftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
  task_Operation?: InputMaybe<Scalars['ID']['input']>;
  task_Operation_Project?: InputMaybe<Scalars['ID']['input']>;
  task_Operation_Project_Organization?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTypeListTaskFieldsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeListTasksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  operation?: InputMaybe<Scalars['ID']['input']>;
  operation_Project?: InputMaybe<Scalars['ID']['input']>;
  operation_Project_Organization?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTypeNodeArgs = {
  id: Scalars['ID']['input'];
};

export type RefreshInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type RegisterPersonMutationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  onlyJobRelatedTopics?: InputMaybe<Scalars['String']['input']>;
  organizationsSubscribed?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  password: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  privatePhone?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  street?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterPersonMutationPayload = {
  __typename?: 'RegisterPersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type RequestPersonActivationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

export type RequestPersonActivationMutationPayload = {
  __typename?: 'RequestPersonActivationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type RequestPersonPasswordResetMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

export type RequestPersonPasswordResetMutationPayload = {
  __typename?: 'RequestPersonPasswordResetMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ResetPersonPasswordMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetPersonPasswordMutationPayload = {
  __typename?: 'ResetPersonPasswordMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ResourceType = Node & {
  __typename?: 'ResourceType';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  equipmentNeeded: EquipmentTypeConnection;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  personalHint: Scalars['String']['output'];
  shift: ShiftType;
};


export type ResourceTypeEquipmentNeededArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ResourceTypeConnection = {
  __typename?: 'ResourceTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ResourceTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ResourceType` and its cursor. */
export type ResourceTypeEdge = {
  __typename?: 'ResourceTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<ResourceType>;
};

export type RevokeInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};

export type RevokePayload = {
  __typename?: 'RevokePayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  revoked: Scalars['Int']['output'];
};

export type RoleSpecificationType = Node & {
  __typename?: 'RoleSpecificationType';
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  necessity: GeorgaRoleSpecificationNecessityChoices;
  personProperties: PersonPropertyTypeConnection;
  role: RoleType;
};


export type RoleSpecificationTypePersonPropertiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  group?: InputMaybe<Scalars['ID']['input']>;
  group_Codename?: InputMaybe<Scalars['String']['input']>;
  group_Codename_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Name?: InputMaybe<Scalars['String']['input']>;
  group_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name?: InputMaybe<Scalars['String']['input']>;
  group_Organization_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type RoleSpecificationTypeConnection = {
  __typename?: 'RoleSpecificationTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RoleSpecificationTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `RoleSpecificationType` and its cursor. */
export type RoleSpecificationTypeEdge = {
  __typename?: 'RoleSpecificationTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<RoleSpecificationType>;
};

export type RoleType = Node & {
  __typename?: 'RoleType';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isTemplate: Scalars['Boolean']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  needsAdminAcceptance: Scalars['Boolean']['output'];
  participantSet: ParticipantTypeConnection;
  participantsAccepted?: Maybe<Scalars['Int']['output']>;
  participantsDeclined?: Maybe<Scalars['Int']['output']>;
  participantsPending?: Maybe<Scalars['Int']['output']>;
  personAttributes?: Maybe<PersonToObjectTypeConnection>;
  quantity: Scalars['Int']['output'];
  shift: ShiftType;
};


export type RoleTypeParticipantSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  role_Shift?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task_Operation?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task_Operation_Project?: InputMaybe<Scalars['ID']['input']>;
  role_Shift_Task_Operation_Project_Organization?: InputMaybe<Scalars['ID']['input']>;
};


export type RoleTypePersonAttributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type RoleTypeConnection = {
  __typename?: 'RoleTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RoleTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `RoleType` and its cursor. */
export type RoleTypeEdge = {
  __typename?: 'RoleTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<RoleType>;
};

export type ShiftType = Node & {
  __typename?: 'ShiftType';
  channelFilters?: Maybe<ChannelFiltersType>;
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  enrollmentDeadline: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  messageFilters?: Maybe<MessageFilterTypeConnection>;
  messages?: Maybe<MessageTypeConnection>;
  modifiedAt: Scalars['DateTime']['output'];
  personAttributes?: Maybe<PersonToObjectTypeConnection>;
  roleSet: RoleTypeConnection;
  startTime: Scalars['DateTime']['output'];
  state: GeorgaShiftStateChoices;
  task: TaskType;
};


export type ShiftTypeMessageFiltersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type ShiftTypeMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<GeorgaMessageStateChoices>;
};


export type ShiftTypePersonAttributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type ShiftTypeRoleSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ShiftTypeConnection = {
  __typename?: 'ShiftTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ShiftTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ShiftType` and its cursor. */
export type ShiftTypeEdge = {
  __typename?: 'ShiftTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<ShiftType>;
};

export type SubscriptionType = {
  __typename?: 'SubscriptionType';
  testSubscription?: Maybe<TestSubscription>;
};


export type SubscriptionTypeTestSubscriptionArgs = {
  arg1?: InputMaybe<Scalars['String']['input']>;
  arg2?: InputMaybe<Scalars['String']['input']>;
};

export type TaskFieldType = Node & {
  __typename?: 'TaskFieldType';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  organization: OrganizationType;
};

export type TaskFieldTypeConnection = {
  __typename?: 'TaskFieldTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TaskFieldTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TaskFieldType` and its cursor. */
export type TaskFieldTypeEdge = {
  __typename?: 'TaskFieldTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<TaskFieldType>;
};

export type TaskType = Node & {
  __typename?: 'TaskType';
  channelFilters?: Maybe<ChannelFiltersType>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  field: TaskFieldType;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  messageFilters?: Maybe<MessageFilterTypeConnection>;
  messages?: Maybe<MessageTypeConnection>;
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operation: OperationType;
  personAttributes?: Maybe<PersonToObjectTypeConnection>;
  resourcesDesirable: ResourceTypeConnection;
  resourcesRequired: ResourceTypeConnection;
  roleSet: RoleTypeConnection;
  startTime: Scalars['DateTime']['output'];
  state: GeorgaTaskStateChoices;
};


export type TaskTypeMessageFiltersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type TaskTypeMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<GeorgaMessageStateChoices>;
};


export type TaskTypePersonAttributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type TaskTypeResourcesDesirableArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type TaskTypeResourcesRequiredArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type TaskTypeRoleSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_Lte?: InputMaybe<Scalars['DateTime']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type TaskTypeConnection = {
  __typename?: 'TaskTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TaskTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TaskType` and its cursor. */
export type TaskTypeEdge = {
  __typename?: 'TaskTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<TaskType>;
};

export type TestSubscription = {
  __typename?: 'TestSubscription';
  message?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

export type TestSubscriptionEventMutationPayload = {
  __typename?: 'TestSubscriptionEventMutationPayload';
  response?: Maybe<Scalars['String']['output']>;
};

export type UpdateDeviceMutationInput = {
  appStore?: InputMaybe<Scalars['String']['input']>;
  appType?: InputMaybe<Scalars['String']['input']>;
  appVersion?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  osType?: InputMaybe<Scalars['String']['input']>;
  osVersion?: InputMaybe<Scalars['String']['input']>;
  pushToken?: InputMaybe<Scalars['String']['input']>;
  pushTokenType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDeviceMutationPayload = {
  __typename?: 'UpdateDeviceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  device?: Maybe<DeviceType>;
  errors: Array<ErrorType>;
};

export type UpdateLocationCategoryMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateLocationCategoryMutationPayload = {
  __typename?: 'UpdateLocationCategoryMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  locationCategory?: Maybe<LocationCategoryType>;
};

export type UpdateLocationMutationInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  postalAddressCity?: InputMaybe<Scalars['String']['input']>;
  postalAddressCountry?: InputMaybe<Scalars['String']['input']>;
  postalAddressName?: InputMaybe<Scalars['String']['input']>;
  postalAddressStreet?: InputMaybe<Scalars['String']['input']>;
  postalAddressZipCode?: InputMaybe<Scalars['String']['input']>;
  shift?: InputMaybe<Scalars['ID']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateLocationMutationPayload = {
  __typename?: 'UpdateLocationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  location?: Maybe<LocationType>;
};

export type UpdateMessageFilterMutationInput = {
  app?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  person?: InputMaybe<Scalars['ID']['input']>;
  push?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['ID']['input']>;
  sms?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageFilterMutationPayload = {
  __typename?: 'UpdateMessageFilterMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  messageFilter?: Maybe<MessageFilterType>;
};

export type UpdateMessageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  priority?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageMutationPayload = {
  __typename?: 'UpdateMessageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  message?: Maybe<MessageType>;
};

export type UpdateOperationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOperationMutationPayload = {
  __typename?: 'UpdateOperationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  operation?: Maybe<OperationType>;
};

export type UpdateOrganizationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationMutationPayload = {
  __typename?: 'UpdateOrganizationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  organization?: Maybe<OrganizationType>;
};

export type UpdateParticipantMutationInput = {
  acceptance?: InputMaybe<Scalars['String']['input']>;
  adminAcceptance?: InputMaybe<Scalars['String']['input']>;
  adminAcceptanceUser?: InputMaybe<Scalars['ID']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  person?: InputMaybe<Scalars['ID']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateParticipantMutationPayload = {
  __typename?: 'UpdateParticipantMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  participant?: Maybe<ParticipantType>;
};

export type UpdatePersonMutationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  onlyJobRelatedTopics?: InputMaybe<Scalars['String']['input']>;
  organizationsSubscribed?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  privatePhone?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  street?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePersonMutationPayload = {
  __typename?: 'UpdatePersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  person?: Maybe<PersonType>;
};

export type UpdatePersonProfileMutationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  onlyJobRelatedTopics?: InputMaybe<Scalars['String']['input']>;
  organizationsSubscribed?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  privatePhone?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  street?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePersonProfileMutationPayload = {
  __typename?: 'UpdatePersonProfileMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  person?: Maybe<PersonType>;
};

export type UpdatePersonPropertyGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  codename?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  necessity?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  selectionType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePersonPropertyGroupMutationPayload = {
  __typename?: 'UpdatePersonPropertyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personPropertyGroup?: Maybe<PersonPropertyGroupType>;
};

export type UpdatePersonPropertyMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePersonPropertyMutationPayload = {
  __typename?: 'UpdatePersonPropertyMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personProperty?: Maybe<PersonPropertyType>;
};

export type UpdatePersonToObjectMutationInput = {
  bookmarked?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  person?: InputMaybe<Scalars['ID']['input']>;
  unnoticed?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePersonToObjectMutationPayload = {
  __typename?: 'UpdatePersonToObjectMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  personToObject?: Maybe<PersonToObjectType>;
};

export type UpdateProjectMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateProjectMutationPayload = {
  __typename?: 'UpdateProjectMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  project?: Maybe<ProjectType>;
};

export type UpdateRoleMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  needsAdminAcceptance?: InputMaybe<Scalars['Boolean']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  shift?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateRoleMutationPayload = {
  __typename?: 'UpdateRoleMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  role?: Maybe<RoleType>;
};

export type UpdateRoleSpecificationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  necessity?: InputMaybe<Scalars['String']['input']>;
  personProperties?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  role?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateRoleSpecificationMutationPayload = {
  __typename?: 'UpdateRoleSpecificationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  roleSpecification?: Maybe<RoleSpecificationType>;
};

export type UpdateShiftMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  enrollmentDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateShiftMutationPayload = {
  __typename?: 'UpdateShiftMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  shift?: Maybe<ShiftType>;
};

export type UpdateTaskFieldMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTaskFieldMutationPayload = {
  __typename?: 'UpdateTaskFieldMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  taskField?: Maybe<TaskFieldType>;
};

export type UpdateTaskMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  field?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  operation?: InputMaybe<Scalars['ID']['input']>;
  resourcesDesirable?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  resourcesRequired?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTaskMutationPayload = {
  __typename?: 'UpdateTaskMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<ErrorType>;
  task?: Maybe<TaskType>;
};

export type VerifyInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyPayload = {
  __typename?: 'VerifyPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  payload: Scalars['GenericScalar']['output'];
};

export type TestSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TestSubscriptionSubscription = { __typename?: 'SubscriptionType', testSubscription?: { __typename?: 'TestSubscription', message?: string | null, time?: string | null } | null };

export type TestSubscriptionEventMutationVariables = Exact<{
  message: Scalars['String']['input'];
}>;


export type TestSubscriptionEventMutation = { __typename?: 'MutationType', testSubscriptionEvent?: { __typename?: 'TestSubscriptionEventMutationPayload', response?: string | null } | null };

export type ListMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListMessagesQuery = { __typename?: 'QueryType', listMessages?: { __typename?: 'MessageTypeConnection', edges: Array<{ __typename?: 'MessageTypeEdge', node?: { __typename?: 'MessageType', title: string, priority: GeorgaMessagePriorityChoices, category: GeorgaMessageCategoryChoices, state: GeorgaMessageStateChoices, delivery: MessageDeliveryState } | null } | null> } | null };

export type ListOperationsQueryVariables = Exact<{
  project?: InputMaybe<Scalars['ID']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ListOperationsQuery = { __typename?: 'QueryType', listOperations?: { __typename?: 'OperationTypeConnection', edges: Array<{ __typename?: 'OperationTypeEdge', node?: { __typename?: 'OperationType', id: string, state: GeorgaOperationStateChoices, name: string, description?: string | null } | null } | null> } | null };

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateOrganizationMutation = { __typename?: 'MutationType', createOrganization?: { __typename?: 'CreateOrganizationMutationPayload', organization?: { __typename?: 'OrganizationType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type GetOrganizationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrganizationQuery = { __typename?: 'QueryType', listOrganizations?: { __typename?: 'OrganizationTypeConnection', edges: Array<{ __typename?: 'OrganizationTypeEdge', node?: { __typename?: 'OrganizationType', id: string, createdAt: any, modifiedAt: any, state: GeorgaOrganizationStateChoices, name: string, description?: string | null, icon?: string | null } | null } | null> } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateOrganizationMutation = { __typename?: 'MutationType', updateOrganization?: { __typename?: 'UpdateOrganizationMutationPayload', organization?: { __typename?: 'OrganizationType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type GetPersonOrganizationsProfileQueryVariables = Exact<{
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPersonOrganizationsProfileQuery = { __typename?: 'QueryType', getPersonProfile?: { __typename?: 'PersonType', organizationsSubscribed: { __typename?: 'OrganizationTypeConnection', edges: Array<{ __typename?: 'OrganizationTypeEdge', node?: { __typename?: 'OrganizationType', id: string, name: string, description?: string | null, icon?: string | null } | null } | null> } } | null };

export type ListOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOrganizationsQuery = { __typename?: 'QueryType', listOrganizations?: { __typename?: 'OrganizationTypeConnection', edges: Array<{ __typename?: 'OrganizationTypeEdge', node?: { __typename?: 'OrganizationType', id: string, state: GeorgaOrganizationStateChoices, name: string, icon?: string | null, description?: string | null } | null } | null> } | null };

export type ListParticipantsQueryVariables = Exact<{
  shift?: InputMaybe<Scalars['ID']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
  operation?: InputMaybe<Scalars['ID']['input']>;
  project?: InputMaybe<Scalars['ID']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ListParticipantsQuery = { __typename?: 'QueryType', listParticipants?: { __typename?: 'ParticipantTypeConnection', edges: Array<{ __typename?: 'ParticipantTypeEdge', node?: { __typename?: 'ParticipantType', id: string, acceptance: GeorgaParticipantAcceptanceChoices, adminAcceptance?: GeorgaParticipantAdminAcceptanceChoices | null, person: { __typename?: 'PersonType', firstName: string, lastName: string } } | null } | null> } | null };

export type ActivatePersonMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ActivatePersonMutation = { __typename?: 'MutationType', activatePerson?: { __typename?: 'ActivatePersonMutationPayload', email?: string | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type TokenAuthMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type TokenAuthMutation = { __typename?: 'MutationType', tokenAuth?: { __typename?: 'LoginPersonMutationPayload', id?: string | null, token: string, refreshExpiresIn: number, adminLevel: AdminLevel } | null };

export type GetPersonProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonProfileQuery = { __typename?: 'QueryType', getPersonProfile?: { __typename?: 'PersonType', firstName: string, lastName: string, email: string, occupation?: string | null, street?: string | null, number?: string | null, postalCode?: string | null, city?: string | null, privatePhone?: string | null, mobilePhone?: string | null, onlyJobRelatedTopics?: GeorgaPersonOnlyJobRelatedTopicsChoices | null } | null };

export type UpdatePersonProfileMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  privatePhone?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  onlyJobRelatedTopics?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdatePersonProfileMutation = { __typename?: 'MutationType', updatePersonProfile?: { __typename?: 'UpdatePersonProfileMutationPayload', person?: { __typename?: 'PersonType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type ListPersonPropertyGroupsQueryVariables = Exact<{
  organization?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ListPersonPropertyGroupsQuery = { __typename?: 'QueryType', listPersonPropertyGroups?: { __typename?: 'PersonPropertyGroupTypeConnection', edges: Array<{ __typename?: 'PersonPropertyGroupTypeEdge', node?: { __typename?: 'PersonPropertyGroupType', id: string, codename: string, name?: string | null, selectionType: GeorgaPersonPropertyGroupSelectionTypeChoices, personpropertySet: { __typename?: 'PersonPropertyTypeConnection', edges: Array<{ __typename?: 'PersonPropertyTypeEdge', node?: { __typename?: 'PersonPropertyType', id: string, name?: string | null } | null } | null> } } | null } | null> } | null };

export type GetPersonProfilePropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonProfilePropertiesQuery = { __typename?: 'QueryType', getPersonProfile?: { __typename?: 'PersonType', properties: { __typename?: 'PersonPropertyTypeConnection', edges: Array<{ __typename?: 'PersonPropertyTypeEdge', node?: { __typename?: 'PersonPropertyType', id: string, group: { __typename?: 'PersonPropertyGroupType', id: string } } | null } | null> } } | null };

export type UpdatePersonProfilePropertiesMutationVariables = Exact<{
  properties?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type UpdatePersonProfilePropertiesMutation = { __typename?: 'MutationType', updatePersonProfile?: { __typename?: 'UpdatePersonProfileMutationPayload', person?: { __typename?: 'PersonType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type RegisterPersonMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterPersonMutation = { __typename?: 'MutationType', registerPerson?: { __typename?: 'RegisterPersonMutationPayload', id?: string | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type ListPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPersonsQuery = { __typename?: 'QueryType', listPersons?: { __typename?: 'PersonTypeConnection', edges: Array<{ __typename?: 'PersonTypeEdge', node?: { __typename?: 'PersonType', id: string, email: string, firstName: string, lastName: string, dateJoined: any, organizationsSubscribed: { __typename?: 'OrganizationTypeConnection', edges: Array<{ __typename?: 'OrganizationTypeEdge', node?: { __typename?: 'OrganizationType', id: string, name: string } | null } | null> } } | null } | null> } | null };

export type CreateProjectMutationVariables = Exact<{
  organization: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateProjectMutation = { __typename?: 'MutationType', createProject?: { __typename?: 'CreateProjectMutationPayload', project?: { __typename?: 'ProjectType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'QueryType', listProjects?: { __typename?: 'ProjectTypeConnection', edges: Array<{ __typename?: 'ProjectTypeEdge', node?: { __typename?: 'ProjectType', id: string, createdAt: any, modifiedAt: any, state: GeorgaProjectStateChoices, name: string, description?: string | null, organization: { __typename?: 'OrganizationType', id: string, name: string } } | null } | null> } | null };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProjectMutation = { __typename?: 'MutationType', updateProject?: { __typename?: 'UpdateProjectMutationPayload', project?: { __typename?: 'ProjectType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type ListProjectsQueryVariables = Exact<{
  organization?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ListProjectsQuery = { __typename?: 'QueryType', listProjects?: { __typename?: 'ProjectTypeConnection', edges: Array<{ __typename?: 'ProjectTypeEdge', node?: { __typename?: 'ProjectType', id: string, state: GeorgaProjectStateChoices, name: string, description?: string | null } | null } | null> } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'MutationType', deleteProject?: { __typename?: 'DeleteProjectMutationPayload', project?: { __typename?: 'ProjectType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type ListQualificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListQualificationsQuery = { __typename?: 'QueryType', listPersonPropertyGroups?: { __typename?: 'PersonPropertyGroupTypeConnection', edges: Array<{ __typename?: 'PersonPropertyGroupTypeEdge', node?: { __typename?: 'PersonPropertyGroupType', id: string, name?: string | null, selectionType: GeorgaPersonPropertyGroupSelectionTypeChoices, necessity: GeorgaPersonPropertyGroupNecessityChoices, personpropertySet: { __typename?: 'PersonPropertyTypeConnection', edges: Array<{ __typename?: 'PersonPropertyTypeEdge', node?: { __typename?: 'PersonPropertyType', id: string, name?: string | null } | null } | null> } } | null } | null> } | null };

export type ListShiftsQueryVariables = Exact<{
  task?: InputMaybe<Scalars['ID']['input']>;
  operation?: InputMaybe<Scalars['ID']['input']>;
  project?: InputMaybe<Scalars['ID']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ListShiftsQuery = { __typename?: 'QueryType', listShifts?: { __typename?: 'ShiftTypeConnection', edges: Array<{ __typename?: 'ShiftTypeEdge', node?: { __typename?: 'ShiftType', id: string, state: GeorgaShiftStateChoices, startTime: any, endTime: any, enrollmentDeadline: any } | null } | null> } | null };

export type CreateTaskMutationVariables = Exact<{
  operation: Scalars['ID']['input'];
  field: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type CreateTaskMutation = { __typename?: 'MutationType', createTask?: { __typename?: 'CreateTaskMutationPayload', task?: { __typename?: 'TaskType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTaskQuery = { __typename?: 'QueryType', listTasks?: { __typename?: 'TaskTypeConnection', edges: Array<{ __typename?: 'TaskTypeEdge', node?: { __typename?: 'TaskType', id: string, createdAt: any, modifiedAt: any, state: GeorgaTaskStateChoices, name: string, description?: string | null, startTime: any, endTime?: any | null, field: { __typename?: 'TaskFieldType', id: string, name: string }, operation: { __typename?: 'OperationType', id: string, name: string }, roleSet: { __typename?: 'RoleTypeConnection', edges: Array<{ __typename?: 'RoleTypeEdge', node?: { __typename?: 'RoleType', id: string, name: string, description?: string | null, quantity: number, participantsAccepted?: number | null, participantsDeclined?: number | null, participantsPending?: number | null } | null } | null> } } | null } | null> } | null };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  field?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateTaskMutation = { __typename?: 'MutationType', updateTask?: { __typename?: 'UpdateTaskMutationPayload', task?: { __typename?: 'TaskType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type ListTasksQueryVariables = Exact<{
  operation?: InputMaybe<Scalars['ID']['input']>;
  project?: InputMaybe<Scalars['ID']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ListTasksQuery = { __typename?: 'QueryType', listTasks?: { __typename?: 'TaskTypeConnection', edges: Array<{ __typename?: 'TaskTypeEdge', node?: { __typename?: 'TaskType', id: string, state: GeorgaTaskStateChoices, name: string, description?: string | null, startTime: any, endTime?: any | null, field: { __typename?: 'TaskFieldType', name: string, description?: string | null } } | null } | null> } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'MutationType', deleteTask?: { __typename?: 'DeleteTaskMutationPayload', task?: { __typename?: 'TaskType', id: string } | null, errors: Array<{ __typename?: 'ErrorType', field: string, messages: Array<string> }> } | null };

export type ListTaskFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTaskFieldsQuery = { __typename?: 'QueryType', listTaskFields?: { __typename?: 'TaskFieldTypeConnection', edges: Array<{ __typename?: 'TaskFieldTypeEdge', node?: { __typename?: 'TaskFieldType', id: string, name: string, description?: string | null } | null } | null> } | null };

export type OrganizationPartsFragment = { __typename?: 'OrganizationType', id: string, name: string, description?: string | null, icon?: string | null, organizationState: GeorgaOrganizationStateChoices } & { ' $fragmentName'?: 'OrganizationPartsFragment' };

export type ProjectPartsFragment = { __typename?: 'ProjectType', id: string, name: string, description?: string | null, projectState: GeorgaProjectStateChoices, organization: (
    { __typename?: 'OrganizationType' }
    & { ' $fragmentRefs'?: { 'OrganizationPartsFragment': OrganizationPartsFragment } }
  ) } & { ' $fragmentName'?: 'ProjectPartsFragment' };

export type OperationPartsFragment = { __typename?: 'OperationType', id: string, name: string, description?: string | null, operationState: GeorgaOperationStateChoices, project: (
    { __typename?: 'ProjectType' }
    & { ' $fragmentRefs'?: { 'ProjectPartsFragment': ProjectPartsFragment } }
  ) } & { ' $fragmentName'?: 'OperationPartsFragment' };

export type TaskPartsFragment = { __typename?: 'TaskType', id: string, name: string, description?: string | null, startTime: any, taskState: GeorgaTaskStateChoices, taskEndTime?: any | null, operation: (
    { __typename?: 'OperationType' }
    & { ' $fragmentRefs'?: { 'OperationPartsFragment': OperationPartsFragment } }
  ) } & { ' $fragmentName'?: 'TaskPartsFragment' };

export type ShiftPartsFragment = { __typename?: 'ShiftType', id: string, state: GeorgaShiftStateChoices, startTime: any, shiftEndTime: any, task: (
    { __typename?: 'TaskType' }
    & { ' $fragmentRefs'?: { 'TaskPartsFragment': TaskPartsFragment } }
  ) } & { ' $fragmentName'?: 'ShiftPartsFragment' };

export type GetFilterObjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFilterObjectQuery = { __typename?: 'QueryType', node?: { __typename: 'ACEType' } | { __typename: 'DeviceType' } | { __typename: 'EquipmentType' } | { __typename: 'LocationCategoryType' } | { __typename: 'LocationType' } | { __typename: 'MessageFilterType' } | { __typename: 'MessageType' } | (
    { __typename: 'OperationType' }
    & { ' $fragmentRefs'?: { 'OperationPartsFragment': OperationPartsFragment } }
  ) | (
    { __typename: 'OrganizationType' }
    & { ' $fragmentRefs'?: { 'OrganizationPartsFragment': OrganizationPartsFragment } }
  ) | { __typename: 'ParticipantType' } | { __typename: 'PersonPropertyGroupType' } | { __typename: 'PersonPropertyType' } | { __typename: 'PersonToObjectType' } | { __typename: 'PersonType' } | (
    { __typename: 'ProjectType' }
    & { ' $fragmentRefs'?: { 'ProjectPartsFragment': ProjectPartsFragment } }
  ) | { __typename: 'ResourceType' } | { __typename: 'RoleSpecificationType' } | { __typename: 'RoleType' } | (
    { __typename: 'ShiftType' }
    & { ' $fragmentRefs'?: { 'ShiftPartsFragment': ShiftPartsFragment } }
  ) | { __typename: 'TaskFieldType' } | (
    { __typename: 'TaskType' }
    & { ' $fragmentRefs'?: { 'TaskPartsFragment': TaskPartsFragment } }
  ) | null };

export const OrganizationPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"organizationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]} as unknown as DocumentNode<OrganizationPartsFragment, unknown>;
export const ProjectPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"projectState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"organizationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]} as unknown as DocumentNode<ProjectPartsFragment, unknown>;
export const OperationPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OperationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"operationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"organizationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"projectState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationParts"}}]}}]}}]} as unknown as DocumentNode<OperationPartsFragment, unknown>;
export const TaskPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"taskState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","alias":{"kind":"Name","value":"taskEndTime"},"name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"operation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"organizationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"projectState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OperationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"operationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectParts"}}]}}]}}]} as unknown as DocumentNode<TaskPartsFragment, unknown>;
export const ShiftPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShiftParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShiftType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","alias":{"kind":"Name","value":"shiftEndTime"},"name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"organizationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"projectState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OperationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"operationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"taskState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","alias":{"kind":"Name","value":"taskEndTime"},"name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"operation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationParts"}}]}}]}}]} as unknown as DocumentNode<ShiftPartsFragment, unknown>;
export const TestSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}}]} as unknown as DocumentNode<TestSubscriptionSubscription, TestSubscriptionSubscriptionVariables>;
export const TestSubscriptionEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestSubscriptionEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscriptionEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<TestSubscriptionEventMutation, TestSubscriptionEventMutationVariables>;
export const ListMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"delivery"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListMessagesQuery, ListMessagesQueryVariables>;
export const ListOperationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOperations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOperations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}},{"kind":"Argument","name":{"kind":"Name","value":"project_Organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListOperationsQuery, ListOperationsQueryVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"icon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"icon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"icon"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOrganizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"icon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"icon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"icon"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const GetPersonOrganizationsProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonOrganizationsProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name_Icontains"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersonProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationsSubscribed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name_Icontains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name_Icontains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonOrganizationsProfileQuery, GetPersonOrganizationsProfileQueryVariables>;
export const ListOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export const ListParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListParticipants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shift"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"operation"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listParticipants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"role_Shift"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shift"}}},{"kind":"Argument","name":{"kind":"Name","value":"role_Shift_Task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}},{"kind":"Argument","name":{"kind":"Name","value":"role_Shift_Task_Operation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"operation"}}},{"kind":"Argument","name":{"kind":"Name","value":"role_Shift_Task_Operation_Project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}},{"kind":"Argument","name":{"kind":"Name","value":"role_Shift_Task_Operation_Project_Organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"acceptance"}},{"kind":"Field","name":{"kind":"Name","value":"adminAcceptance"}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListParticipantsQuery, ListParticipantsQueryVariables>;
export const ActivatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activatePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<ActivatePersonMutation, ActivatePersonMutationVariables>;
export const TokenAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TokenAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"adminLevel"}}]}}]}}]} as unknown as DocumentNode<TokenAuthMutation, TokenAuthMutationVariables>;
export const GetPersonProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersonProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"privatePhone"}},{"kind":"Field","name":{"kind":"Name","value":"mobilePhone"}},{"kind":"Field","name":{"kind":"Name","value":"onlyJobRelatedTopics"}}]}}]}}]} as unknown as DocumentNode<GetPersonProfileQuery, GetPersonProfileQueryVariables>;
export const UpdatePersonProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePersonProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occupation"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postalCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"privatePhone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mobilePhone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onlyJobRelatedTopics"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePersonProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"occupation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occupation"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"postalCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postalCode"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"privatePhone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"privatePhone"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mobilePhone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mobilePhone"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"onlyJobRelatedTopics"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onlyJobRelatedTopics"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePersonProfileMutation, UpdatePersonProfileMutationVariables>;
export const ListPersonPropertyGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPersonPropertyGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPersonPropertyGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"codename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selectionType"}},{"kind":"Field","name":{"kind":"Name","value":"personpropertySet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListPersonPropertyGroupsQuery, ListPersonPropertyGroupsQueryVariables>;
export const GetPersonProfilePropertiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonProfileProperties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersonProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonProfilePropertiesQuery, GetPersonProfilePropertiesQueryVariables>;
export const UpdatePersonProfilePropertiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePersonProfileProperties"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"properties"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePersonProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"properties"},"value":{"kind":"Variable","name":{"kind":"Name","value":"properties"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePersonProfilePropertiesMutation, UpdatePersonProfilePropertiesMutationVariables>;
export const RegisterPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterPersonMutation, RegisterPersonMutationVariables>;
export const ListPersonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPersons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPersons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"organizationsSubscribed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListPersonsQuery, ListPersonsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectQuery, GetProjectQueryVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const ListProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListProjectsQuery, ListProjectsQueryVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const ListQualificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListQualifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPersonPropertyGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selectionType"}},{"kind":"Field","name":{"kind":"Name","value":"necessity"}},{"kind":"Field","name":{"kind":"Name","value":"personpropertySet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListQualificationsQuery, ListQualificationsQueryVariables>;
export const ListShiftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListShifts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"operation"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listShifts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}},{"kind":"Argument","name":{"kind":"Name","value":"task_Operation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"operation"}}},{"kind":"Argument","name":{"kind":"Name","value":"task_Operation_Project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}},{"kind":"Argument","name":{"kind":"Name","value":"task_Operation_Project_Organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"enrollmentDeadline"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListShiftsQuery, ListShiftsQueryVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"operation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"field"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"operation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"operation"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"Variable","name":{"kind":"Name","value":"field"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const GetTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"operation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roleSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"participantsAccepted"}},{"kind":"Field","name":{"kind":"Name","value":"participantsDeclined"}},{"kind":"Field","name":{"kind":"Name","value":"participantsPending"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTaskQuery, GetTaskQueryVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"field"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"Variable","name":{"kind":"Name","value":"field"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const ListTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"operation"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"operation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"operation"}}},{"kind":"Argument","name":{"kind":"Name","value":"operation_Project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}},{"kind":"Argument","name":{"kind":"Name","value":"operation_Project_Organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListTasksQuery, ListTasksQueryVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const ListTaskFieldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTaskFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTaskFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListTaskFieldsQuery, ListTaskFieldsQueryVariables>;
export const GetFilterObjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilterObject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationParts"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectParts"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OperationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationParts"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShiftType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShiftParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"organizationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"projectState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OperationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"operationState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"taskState"},"name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","alias":{"kind":"Name","value":"taskEndTime"},"name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"operation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShiftParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShiftType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","alias":{"kind":"Name","value":"shiftEndTime"},"name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}}]} as unknown as DocumentNode<GetFilterObjectQuery, GetFilterObjectQueryVariables>;