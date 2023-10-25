/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  subscription TestSubscription {\n    testSubscription {\n      message\n      time\n    }\n  }\n": types.TestSubscriptionDocument,
    "\n  mutation TestSubscriptionEvent (\n    $message: String!\n  ) {\n    testSubscriptionEvent(\n      message: $message\n    ) {\n      response\n    }\n  }\n": types.TestSubscriptionEventDocument,
    "\n  mutation ActivatePerson(\n    $token: String!\n  ) {\n    activatePerson(\n      input: {\n        token: $token\n      }\n    ) {\n      email\n      errors {\n        field\n        messages\n      }\n    }\n  }\n": types.ActivatePersonDocument,
    "\n  query ListPersons (\n    $email_Icontains: String\n  ) {\n    listPersons(\n      email_Icontains: $email_Icontains\n    ) {\n      edges {\n        node {\n          email\n          firstName\n          lastName\n          dateJoined\n        }\n      }\n    }\n  }\n": types.ListPersonsDocument,
    "\n  mutation TokenAuth (\n    $email: String!\n    $password: String!\n  ) {\n    tokenAuth(\n      input: {\n        email: $email\n        password: $password\n      }\n    ) {\n      id\n      token\n      refreshExpiresIn\n      adminLevel\n    }\n  }\n": types.TokenAuthDocument,
    "\n  query GetPersonOrganizationsProfile (\n    $name_Icontains: String\n  ) {\n    getPersonProfile {\n      organizationsSubscribed (\n        name_Icontains: $name_Icontains\n      ) {\n        edges {\n          node {\n            id\n            name\n            description\n            icon\n          }\n        }\n      }\n    }\n  }\n": types.GetPersonOrganizationsProfileDocument,
    "\n  query ListPersonPropertyGroups (\n    $organization: ID\n  ) {\n    listPersonPropertyGroups (\n      organization: $organization\n    ) {\n      edges {\n        node {\n          id\n          codename\n          name\n          selectionType\n          personpropertySet {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ListPersonPropertyGroupsDocument,
    "\n  query GetPersonProfile {\n    getPersonProfile {\n      firstName\n      lastName\n      email\n      occupation\n      street\n      number\n      postalCode\n      city\n      privatePhone\n      mobilePhone\n      onlyJobRelatedTopics\n    }\n  }\n": types.GetPersonProfileDocument,
    "\n  mutation UpdatePersonProfile (\n    $firstName: String\n    $lastName: String\n    $occupation: String\n    $street: String\n    $number: String\n    $postalCode: String\n    $city: String\n    $privatePhone: String\n    $mobilePhone: String\n    $onlyJobRelatedTopics: String\n  ) {\n    updatePersonProfile (\n      input: {\n        firstName: $firstName\n        lastName: $lastName\n        occupation: $occupation\n        street: $street\n        number: $number\n        postalCode: $postalCode\n        city: $city\n        privatePhone: $privatePhone\n        mobilePhone: $mobilePhone\n        onlyJobRelatedTopics: $onlyJobRelatedTopics\n      }\n    ) {\n      person {\n        id\n      }\n      errors {\n        field\n        messages\n      }\n    }\n  }\n": types.UpdatePersonProfileDocument,
    "\n  mutation RegisterPerson (\n    $email: String!\n    $password: String!\n  ) {\n    registerPerson(\n      input: {\n        email: $email\n        password: $password\n      }\n    ) {\n      id\n      errors {\n        field\n        messages\n      }\n    }\n  }\n": types.RegisterPersonDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription TestSubscription {\n    testSubscription {\n      message\n      time\n    }\n  }\n"): (typeof documents)["\n  subscription TestSubscription {\n    testSubscription {\n      message\n      time\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation TestSubscriptionEvent (\n    $message: String!\n  ) {\n    testSubscriptionEvent(\n      message: $message\n    ) {\n      response\n    }\n  }\n"): (typeof documents)["\n  mutation TestSubscriptionEvent (\n    $message: String!\n  ) {\n    testSubscriptionEvent(\n      message: $message\n    ) {\n      response\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ActivatePerson(\n    $token: String!\n  ) {\n    activatePerson(\n      input: {\n        token: $token\n      }\n    ) {\n      email\n      errors {\n        field\n        messages\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ActivatePerson(\n    $token: String!\n  ) {\n    activatePerson(\n      input: {\n        token: $token\n      }\n    ) {\n      email\n      errors {\n        field\n        messages\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListPersons (\n    $email_Icontains: String\n  ) {\n    listPersons(\n      email_Icontains: $email_Icontains\n    ) {\n      edges {\n        node {\n          email\n          firstName\n          lastName\n          dateJoined\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPersons (\n    $email_Icontains: String\n  ) {\n    listPersons(\n      email_Icontains: $email_Icontains\n    ) {\n      edges {\n        node {\n          email\n          firstName\n          lastName\n          dateJoined\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation TokenAuth (\n    $email: String!\n    $password: String!\n  ) {\n    tokenAuth(\n      input: {\n        email: $email\n        password: $password\n      }\n    ) {\n      id\n      token\n      refreshExpiresIn\n      adminLevel\n    }\n  }\n"): (typeof documents)["\n  mutation TokenAuth (\n    $email: String!\n    $password: String!\n  ) {\n    tokenAuth(\n      input: {\n        email: $email\n        password: $password\n      }\n    ) {\n      id\n      token\n      refreshExpiresIn\n      adminLevel\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPersonOrganizationsProfile (\n    $name_Icontains: String\n  ) {\n    getPersonProfile {\n      organizationsSubscribed (\n        name_Icontains: $name_Icontains\n      ) {\n        edges {\n          node {\n            id\n            name\n            description\n            icon\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonOrganizationsProfile (\n    $name_Icontains: String\n  ) {\n    getPersonProfile {\n      organizationsSubscribed (\n        name_Icontains: $name_Icontains\n      ) {\n        edges {\n          node {\n            id\n            name\n            description\n            icon\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListPersonPropertyGroups (\n    $organization: ID\n  ) {\n    listPersonPropertyGroups (\n      organization: $organization\n    ) {\n      edges {\n        node {\n          id\n          codename\n          name\n          selectionType\n          personpropertySet {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPersonPropertyGroups (\n    $organization: ID\n  ) {\n    listPersonPropertyGroups (\n      organization: $organization\n    ) {\n      edges {\n        node {\n          id\n          codename\n          name\n          selectionType\n          personpropertySet {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPersonProfile {\n    getPersonProfile {\n      firstName\n      lastName\n      email\n      occupation\n      street\n      number\n      postalCode\n      city\n      privatePhone\n      mobilePhone\n      onlyJobRelatedTopics\n    }\n  }\n"): (typeof documents)["\n  query GetPersonProfile {\n    getPersonProfile {\n      firstName\n      lastName\n      email\n      occupation\n      street\n      number\n      postalCode\n      city\n      privatePhone\n      mobilePhone\n      onlyJobRelatedTopics\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePersonProfile (\n    $firstName: String\n    $lastName: String\n    $occupation: String\n    $street: String\n    $number: String\n    $postalCode: String\n    $city: String\n    $privatePhone: String\n    $mobilePhone: String\n    $onlyJobRelatedTopics: String\n  ) {\n    updatePersonProfile (\n      input: {\n        firstName: $firstName\n        lastName: $lastName\n        occupation: $occupation\n        street: $street\n        number: $number\n        postalCode: $postalCode\n        city: $city\n        privatePhone: $privatePhone\n        mobilePhone: $mobilePhone\n        onlyJobRelatedTopics: $onlyJobRelatedTopics\n      }\n    ) {\n      person {\n        id\n      }\n      errors {\n        field\n        messages\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePersonProfile (\n    $firstName: String\n    $lastName: String\n    $occupation: String\n    $street: String\n    $number: String\n    $postalCode: String\n    $city: String\n    $privatePhone: String\n    $mobilePhone: String\n    $onlyJobRelatedTopics: String\n  ) {\n    updatePersonProfile (\n      input: {\n        firstName: $firstName\n        lastName: $lastName\n        occupation: $occupation\n        street: $street\n        number: $number\n        postalCode: $postalCode\n        city: $city\n        privatePhone: $privatePhone\n        mobilePhone: $mobilePhone\n        onlyJobRelatedTopics: $onlyJobRelatedTopics\n      }\n    ) {\n      person {\n        id\n      }\n      errors {\n        field\n        messages\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterPerson (\n    $email: String!\n    $password: String!\n  ) {\n    registerPerson(\n      input: {\n        email: $email\n        password: $password\n      }\n    ) {\n      id\n      errors {\n        field\n        messages\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterPerson (\n    $email: String!\n    $password: String!\n  ) {\n    registerPerson(\n      input: {\n        email: $email\n        password: $password\n      }\n    ) {\n      id\n      errors {\n        field\n        messages\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;