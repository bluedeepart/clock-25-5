import { useContext } from 'react';
import ClockContext from '../context/ClockContext';

function Session() {
  const { timer, sessionHeading } = useContext(ClockContext);
  return (
    <div className='session-container'>
      <div id='timer-label' className='label'>{sessionHeading}</div>
      <div id='time-left'>{timer}</div>
    </div>
  );
}

export default Session;
