/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { ApolloError } from '@apollo/client/errors';

type PersonRegisterFormErrors = {
  form?: ApolloError["message"],
  email?: string[],
  password?: string[],
}

type PersonLoginFormErrors = {
  form?: ApolloError["message"],
}

type PersonProfileFormErrors = {
  form?: ApolloError["message"],
  firstName?: string[],
  lastName?: string[],
  street?: string[],
  number?: string[],
  postalCode?: string[],
  city?: string[],
  privatePhone?: string[],
  mobilePhone?: string[],
  occupation?: string[],
  onlyJobRelatedTopics?: string[],
}

type PersonPropertiesFormErrors = {
  form?: ApolloError["message"],
  properties?: string[],
}

export type {
  PersonRegisterFormErrors,
  PersonLoginFormErrors,
  PersonProfileFormErrors,
  PersonPropertiesFormErrors,
};
