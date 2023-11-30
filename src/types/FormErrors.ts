/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { ApolloError } from '@apollo/client/errors';

type FormErrors<T> = Partial<Record<keyof T, string[]>>
                     & { form?: ApolloError['message']  };
type FormError = ApolloError['message']
type FormFieldError = string[]

export type { FormErrors, FormError, FormFieldError };
