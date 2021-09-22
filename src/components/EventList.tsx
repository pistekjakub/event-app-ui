import React, { useState, useEffect } from 'react';
import { Event } from './Event';
import { InsertEventForm } from './InsertEventForm';

interface EventListProps {
    onEventNameChange: (eventName: string) => void,
}

interface EventModel {
    name: string,
    description?: string,
    location?: string,
    startTime: Date, 
    endTime?: Date,
}

export const EventList: React.FC<EventListProps> = props => 
{
    const [events, setEvents] = useState<EventModel[]>([]);

    const handleEventNameChange = (eventName: string) => {
        props.onEventNameChange(eventName);
    };

    const handleOnEventInserted = () => 
    {
        setTimeout(function(){ fetchEvents() }, 100);
    }

    useEffect(() => { //this effect with these parameters calls the function only one time on the first load
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        var url = 'http://localhost:5000/api/event';
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            }).then(responseJson => {                
                let eventArr: EventModel[] = [];
                responseJson.events.forEach(function (event: any) {
                    let eventModelItem: EventModel = {
                        name: event.name,
                        description: event.description,
                        location: event.location,
                        startTime: event.startTime,
                        endTime: event.endTime,
                    };
                    eventArr.push(eventModelItem);
                });
                setEvents(eventArr);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            {events.map((entry, rowIndex) => {
                return  (
                        <>
                            <Event 
                                key={rowIndex} 
                                name={entry.name} 
                                description={entry.description} 
                                location={entry.location} 
                                startTime={entry.startTime} 
                                endTime={entry.endTime} 
                                onEventNameChange={handleEventNameChange}    
                            />
                            <hr />
                        </>);
            })}
            <InsertEventForm onEventInserted={handleOnEventInserted} />
        </>
    );
}