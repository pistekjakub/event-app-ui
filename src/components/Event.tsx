import React from 'react';

interface EventProps {
    name: string,
    description?: string,
    location?: string,
    startTime?: Date, 
    endTime?: Date,
    onEventNameChange: (eventName: string) => void,
}

export const Event: React.FC<EventProps> = props => 
{
    const handleEventNameChange = (eventName: string) => 
    {
        props.onEventNameChange(eventName);
    }

    return (
        <>
            <b>Name:</b> <a href="#" onClick={() => handleEventNameChange(props.name)}>{props.name}</a><br />
            <b>Description:</b> {props.description}<br />
            <b>Location:</b> {props.location}<br />
            <b>Start:</b> {props.startTime}<br />
            <b>End:</b> {props.endTime}<br />
        </>
    )
}