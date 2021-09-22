import React, { useState } from 'react';

interface InsertRegistrationFormProps {
    eventName: string
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
        setName(name.replace(/\s/g, ""));
        setPhone(phone.replace(/\s/g, ""));
        setEmail(email.replace(/\s/g, ""));

        if (name === "" || phone === "" || email === "") {
            setError("Name, Phone and Email are required");
            setShowError(true);
        } else {
            setShowError(false);
        }
    }

    const insertRegistration = () => {
        fetch('http://localhost:5000/api/registration', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventName: props.eventName, email: email, name: name, phone: phone })
        }).then(function (response) {
            return response.json();
        }).catch(error => {
            alert("error: " + error);
            console.log(error);
        });

        //   .then(function(data) {
        //     alert("data: " + JSON.stringify(data));
        //   });
    }

    return (
        <>
            Name: <input type="text" onChange={handleNameOnChange} value={name} /><br />
            Phone: <input type="text" onChange={handlePhoneOnChange} value={phone} /><br />
            Email: <input type="text" onChange={handleEmailOnChange} value={email} /><br />
            <button onClick={handleSubmit}>Submit registration</button><br />
            {showError && <span>{error}</span>}
        </>
    )
}