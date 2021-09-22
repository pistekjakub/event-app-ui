import React, { useState } from 'react';

interface InsertRegistrationFormProps {
    eventName: string,
    onRegistrationAdded: () => void,
}

export const InsertRegistrationForm: React.FC<InsertRegistrationFormProps> = props => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleNameOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const handlePhoneOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPhone(event.currentTarget.value);
    }

    const handleEmailOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handleSubmit = () => {
        // trim fields
        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();
        const trimmedEmail = email.trim();

        if (trimmedName === "" || trimmedPhone === "" || trimmedEmail === "") {
            setError("Name, Phone and Email are required");
            setShowError(true);
            return;
        }

        insertRegistration(props.eventName, name, phone, email);
    }

    const insertRegistration = async (registrationEventName: string, registrationName: string, registrationPhone: string, registrationEmail: string) => {
        var result = await fetch('http://localhost:5000/api/registration', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventName: registrationEventName, email: registrationEmail, name: registrationName, phone: registrationPhone })
        }).then(function (response) {
            return response.json();
        }).catch(error => {
            setShowError(true);
            setError(error);
            console.log(error);
        });

        if(result.error !== "")
        {
            setShowError(true);
            setError(result.error);
        } else {
            setShowError(false);
            setName("");
            setPhone("");
            setEmail("");    
        }
    }

    return (
        <>
            <label htmlFor="registration-name">Name: </label> 
            <input id="registration-name" type="text" onChange={handleNameOnChange} value={name} /><br />
            
            <label htmlFor="registration-phone">Phone: </label>
            <input id="registration-phone" type="text" onChange={handlePhoneOnChange} value={phone} /><br />
            
            <label htmlFor="registration-email">Email: </label>
            <input id="registration-email" type="text" onChange={handleEmailOnChange} value={email} /><br />

            <button onClick={handleSubmit}>Submit registration</button><br />
            {showError && <span>{error}</span>}
        </>
    )
}