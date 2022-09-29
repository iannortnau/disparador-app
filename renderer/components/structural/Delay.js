import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import Line from '../structural/Line';
import DelayDot from './DelayDot';




export default function Delay(){
  const {
    setDelay
  } = useContext(GlobalContext);

  return (
    <Line
      style={{
        justifyContent:"space-around",
        margin:5
    }}
    >
      <DelayDot
        value={0}
        onClick={setDelay}
      />
      <DelayDot
        value={5}
        onClick={setDelay}
      />
      <DelayDot
        value={10}
        onClick={setDelay}
      />
      <DelayDot
        value={15}
        onClick={setDelay}
      />
      <DelayDot
        value={20}
        onClick={setDelay}
      />
      <DelayDot
        value={25}
        onClick={setDelay}
      />
      <DelayDot
        value={30}
        onClick={setDelay}
      />
    </Line>
  );
}
