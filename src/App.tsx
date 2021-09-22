import React, {useState} from 'react';
import './App.css';
import { EventList } from './components/EventList';
import { RegistrationList } from './components/RegistrationList';

function App() {
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const handleOnEventNameChange = (eventName: string) => 
  {
    setSelectedEventName(eventName);
  }

  return (
    <div className="App">
      <h2>Events:</h2>
      <EventList onEventNameChange={handleOnEventNameChange} />
      {selectedEventName ? <><h2>Registrations:</h2><RegistrationList eventName={selectedEventName} /></> : <h2>Please select an event</h2>}
    </div>
  );
}

export default App;
