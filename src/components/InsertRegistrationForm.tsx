import React, { useState } from 'react';

interface InsertRegistrationFormProps {
    eventName: string,
    onRegistrationInserted: () => void,
    firstFieldRef: React.Ref<HTMLInputElement>,
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

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
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
        if(!showError)
        {
            props.onRegistrationInserted();
        }

        event.preventDefault();
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

        if (result.error !== "") {
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
        <form>
            <fieldset>
                <legend>Submit registration</legend>
                <table>
                    <tr>
                        <td><label htmlFor="registration-name">Name:</label></td>
                        <td><input ref={props.firstFieldRef} id="registration-name" type="text" onChange={handleNameOnChange} value={name} /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="registration-phone">Phone:</label></td>
                        <td><input id="registration-phone" type="text" onChange={handlePhoneOnChange} value={phone} /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="registration-email">Email:</label></td>
                        <td><input id="registration-email" type="text" onChange={handleEmailOnChange} value={email} /></td>
                    </tr>
                </table>
                <input type="submit" onClick={handleSubmit} value="Submit registration" />
            </fieldset>
            {showError && <span>{error}</span>}
        </form>
    )
}