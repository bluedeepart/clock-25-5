import { createContext, useEffect, useRef, useState } from 'react';
import AUDIOFILE from '../assets/BeepSound.wav';

const ClockContext = createContext({
  breakVal: 0,
  setBreakVal: () => { },
  sessionVal: 0,
  setSessionVal: () => { },
  isActive: false,
  timer: '00:00',
  setTimer: () => { },
  sessionHeading: '',
  onPlayPause: () => { },
  onReset: () => { },
});

const BREAK_INITIALIZE = 5;
const SESSION_INITIALIZE = 25;
const HEADING_SESSION = 'Session';
const HEADING_BREAK = 'Break';

/* FORMAT TIME (MM:SS) */
const formatTime = (totalSeconds) => {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutesStr}:${secondsStr}`;
};

// Helper function to convert formatted time (MM:SS) to total seconds
const formatTimeToSeconds = (formattedTime) => {
  if (!formattedTime || !formattedTime.includes(':')) {
    throw new Error("Bad time string");
  }
  const [minutes, seconds] = formattedTime.split(':').map(Number);
  if (isNaN(minutes) || isNaN(seconds)) {
    throw new Error("Bad time string");
  }
  return (minutes * 60) + seconds;
};

// eslint-disable-next-line react/prop-types
export const ClockContextProvider = ({ children }) => {
  const [breakVal, setBreakVal] = useState(BREAK_INITIALIZE); 
  const [sessionVal, setSessionVal] = useState(SESSION_INITIALIZE); 
  const [isActive, setIsActive] = useState(false);
  const [sessionHeading, setSessionHeading] = useState(HEADING_SESSION);
  const [timer, setTimer] = useState(formatTime(SESSION_INITIALIZE * 60)); 

  const audioRef = useRef(null);

  useEffect(() => {
    let timerInterval;

    if (isActive) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          const totalSeconds = formatTimeToSeconds(prevTimer);

          if (totalSeconds <= 0) {
            if (audioRef.current) {
              audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
              });
            }

            // Switch between session and break
            if (sessionHeading === HEADING_SESSION) {
              setSessionHeading(HEADING_BREAK);
              setTimer(formatTime(breakVal * 60)); 
              return formatTime(breakVal * 60);
            } else {
              setSessionHeading(HEADING_SESSION);
              setTimer(formatTime(sessionVal * 60)); 
              return formatTime(sessionVal * 60);
            }
          } else {
            const newSeconds = totalSeconds - 1;
            return formatTime(newSeconds);
          }
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isActive, timer, breakVal, sessionVal, sessionHeading]);

  /* INCREMENT/DECREMENT TIMER VALUE */
  useEffect(() => {
    setTimer(formatTime(sessionVal * 60)); 
  }, [sessionVal]);

  /* Play/pause Handler */
  function playPauseHandler() {
    setIsActive((prevState) => !prevState);
  }

  /* RESET */
  function resetTimerHandler() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsActive(false);
    setBreakVal(BREAK_INITIALIZE);
    setSessionVal(SESSION_INITIALIZE);
    setTimer(formatTime(SESSION_INITIALIZE * 60));
    setSessionHeading(HEADING_SESSION);
  }

  return (
    <ClockContext.Provider
      value={{
        breakVal,
        setBreakVal,
        sessionVal,
        setSessionVal,
        isActive,
        timer,
        sessionHeading,
        onPlayPause: playPauseHandler,
        onReset: resetTimerHandler,
      }}>
      {children}
      <audio id='beep' src={AUDIOFILE} ref={audioRef}></audio>
    </ClockContext.Provider>
  );
};

export default ClockContext;
