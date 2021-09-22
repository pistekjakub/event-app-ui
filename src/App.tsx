import React, {useState} from 'react';
import './App.css';
import { EventList } from './components/EventList';
import { RegistrationList } from './components/RegistrationList';

function App() {
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const handleOnEventNameChange = (eventName: string) => 
  {
    // alert("handleOnEventNameChange: " + eventName);
    setSelectedEventName(eventName);
  }

  return (
    <div className="App">
      <h2>Events:</h2>
      <EventList onEventNameChange={handleOnEventNameChange} />
      <h2>Registrations:</h2>
      <RegistrationList eventName={selectedEventName} />
    </div>
  );
}

export default App;
