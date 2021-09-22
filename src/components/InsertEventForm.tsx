import React, { useState } from 'react';

interface InsertEventFormProps {
    onEventInserted: () => void,
}

export const InsertEventForm: React.FC<InsertEventFormProps> = props => {
    const [login, setLogin] = useState<string>("admin");
    const [password, setPassword] = useState<string>("niceday");

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleLoginOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogin(event.currentTarget.value);
    }

    const handlePasswordOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }
    
    const handleNameOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const handleDescriptionOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setDescription(event.currentTarget.value);
    }

    const handleLocationOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLocation(event.currentTarget.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
        // trim fields
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();
        const trimmedLocation = location.trim();

        if (login === "" || password === "" || trimmedName === "" || trimmedLocation === "") {
            setError("Login, Password, Event name and Location are required");
            setShowError(true);
            return;
        }

        await insertEvent(login, password, trimmedName, trimmedDescription, trimmedLocation);
        if(!showError)
        {
            props.onEventInserted();
        }

        event.preventDefault();
    }

    const insertEvent = async (eventLogin: string, eventPassword: string, eventName: string, eventDescription: string, eventLocation: string) => {
        var result = await fetch('http://localhost:5000/api/event', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: eventLogin, password: eventPassword, name: eventName, description: eventDescription, location: eventLocation })
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
            setDescription("");
            setLocation("");
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Create a new event</legend>
                <table>
                    <tr>
                        <td><label htmlFor="event-login">Login:</label></td>
                        <td><input id="event-login" type="text" onChange={handleLoginOnChange} value={login} /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="event-password">Password:</label></td>
                        <td><input id="event-password" type="password" onChange={handlePasswordOnChange} value={password} /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="event-name">Event name:</label></td>
                        <td><input id="event-name" type="text" onChange={handleNameOnChange} value={name} /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="event-location">Location:</label></td>
                        <td><input id="event-location" type="text" onChange={handleLocationOnChange} value={location} /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="event-description">Description:</label></td>
                        <td><input id="event-description" type="text" onChange={handleDescriptionOnChange} value={description} /></td>
                    </tr>


                </table>
                <input type="submit" onClick={handleSubmit} value="Create" />
            </fieldset>
            {showError && <span>{error}</span>}
        </form>
    )
}