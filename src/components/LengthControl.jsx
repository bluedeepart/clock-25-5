// eslint-disable-next-line react/prop-types
function LengthControl({ label, id, value, setValue, isActive }) {

  function onIncremenet(setValue) {
    setValue((prevValue) => prevValue < 60 ? prevValue + 1 : prevValue);
  }

  function onDecrement() {
    setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : prevValue));
  }

  return (
    <div className="length-control">
      <label id={`${id}-label`} htmlFor={`${id}-length`}>{label}</label>
      <button onClick={() => onDecrement(setValue)} id={`${id}-decrement`} disabled={isActive}>-</button>
      <input type="text" id={`${id}-length`} value={value} readOnly min='1' max='60'/>
      <button onClick={() => onIncremenet(setValue)} id={`${id}-increment`} disabled={isActive}>+</button>
    </div>
  );
}

export default LengthControl;