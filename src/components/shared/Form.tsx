/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import FormError from '@/components/shared/FormError';

import { FormError as FormErrorType } from '@/types/FormErrors';

function Form({
  handleSubmit,
  error,
  children,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  error: FormErrorType | undefined,
  children: JSX.Element[],
}) {
  return (
    <form onSubmit={handleSubmit}>
      <FormError error={error}/>
      {children}
    </form>
  )
}

export default Form;
