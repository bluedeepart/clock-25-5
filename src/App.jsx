import Session from './components/Session';
import SessionController from './components/SessionController';
import Credit from './components/Credit';
import LengthContainer from './components/LengthContainer';
import { ClockContextProvider } from './context/ClockContext';

function App() {

  return (
    <ClockContextProvider>
      <header className="card">
        <h1>25 + 5 <span>Clock</span></h1>
        <LengthContainer key='Length Container' />
        <Session key='timer' />
        <SessionController key='Session Controller' />
      </header>
      <Credit />
    </ClockContextProvider>
  );
}

export default App;
