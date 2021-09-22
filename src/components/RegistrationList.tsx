import React, { useState, useEffect } from 'react';
import { Registration } from './Registration';
import { InsertRegistrationForm } from './InsertRegistrationForm';

interface RegistrationListProps {
    eventName: string;
}

interface RegistrationModel {
    name: string,
    phone: string,
    email: string,
}

export const RegistrationList: React.FC<RegistrationListProps> = props => 
{
    const [registrations, setRegistrations] = useState<RegistrationModel[]>([]);

    useEffect(() => { //this effect with these parameters calls the function only one time on the first load
        if(props.eventName === ""){
            return;
        }
        
        fetchRegistrations();
    }, [props.eventName]);

    const insertTestRegistration = () => {
        fetch('http://localhost:5000/api/registration', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({eventName: 'test event 1', email: 'jakub@jakub.com', name: 'Jakub Pištěk', phone: '+420666999888'})
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            alert("data: " + JSON.stringify(data));
          });
    }

    const fetchRegistrations = () => {
        fetch(`http://localhost:5000/api/registration/${props.eventName}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            }).then(responseJson => {                
                let registrationArr: RegistrationModel[] = [];
                responseJson.registrations.forEach(function (event: any) {
                    let registrationModelItem: RegistrationModel = {
                        name: event.name,
                        phone: event.phone,
                        email: event.email,
                    };
                    registrationArr.push(registrationModelItem);
                });
                setRegistrations(registrationArr);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            {registrations.length ? registrations.map((entry, rowIndex) => {
                return  (
                    <div>
                        <Registration 
                            key={rowIndex} 
                            name={entry.name} 
                            phone={entry.phone} 
                            email={entry.email} />
                        <hr />
                    </div>);
            }) : <h3>there are no registrations for event {props.eventName}</h3>}
            <button onClick={insertTestRegistration} >Insert test registration</button><br />
            <InsertRegistrationForm eventName={props.eventName} />
        </>
    );
}