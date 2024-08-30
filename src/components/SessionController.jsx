import { useContext } from 'react';
import { FaArrowsRotate, FaPlay, FaPause } from 'react-icons/fa6';
import ClockContext from '../context/ClockContext';

function SessionController() {
  const { onPlayPause, onReset, isActive } = useContext(ClockContext);
  return (
    <div className="controls">
      <button id="start_stop" onClick={onPlayPause} className="neumorphic-button">
        {!isActive && <FaPlay />}
        {isActive && <FaPause />}
      </button>
      <button id="reset" onClick={onReset} className="neumorphic-button">
        <FaArrowsRotate />
      </button>
    </div>
  );
}

export default SessionController;