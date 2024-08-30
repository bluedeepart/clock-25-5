import { useContext } from "react";
import LengthControl from "./LengthControl";
import ClockContext from "../context/ClockContext";

function LengthContainer() {
  const {breakVal, sessionVal, isActive, setBreakVal, setSessionVal} = useContext(ClockContext);

  return (
    <div className='length-container'>
      <LengthControl
        key='break'
        label='Break Length'
        id='break'
        value={breakVal}
        isActive={isActive}
        setValue={setBreakVal}
      />
      <LengthControl
        key='session'
        label='Session Length'
        id='session'
        value={sessionVal}
        isActive={isActive}
        setValue={setSessionVal}
      />
    </div>
  );
}

export default LengthContainer;