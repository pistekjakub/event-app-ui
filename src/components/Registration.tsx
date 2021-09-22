import React from 'react';

interface RegistrationProps {
    name: string,
    phone: string,
    email: string,
}

export const Registration: React.FC<RegistrationProps> = props => 
{
    return (
        <>
            <b>Name:</b> {props.name}, <b>Phone:</b> {props.phone}, <b>Email:</b> {props.email}<br />
        </>
    )
}