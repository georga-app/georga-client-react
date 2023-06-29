import ThreeColumns from '../../Theme/Layouts/ThreeColumns';

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
