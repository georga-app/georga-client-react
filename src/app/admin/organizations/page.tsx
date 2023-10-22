/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import ThreeColumns from '@/theme/layouts/ThreeColumns';

function Organizations() {
  return (
    <ThreeColumns
      bg='admin'
      left={
        <p>Left</p>
      }
      middle={
        <p>Middle</p>
      }
      right={
        <p>Right</p>
      }
    />
  );
}

export default Organizations;
