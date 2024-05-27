import React, { useState } from 'react';
import '@aws-amplify/ui-react/styles.css';
import FormPostLegalCases from '../elements/FormPostLegalCases';

const CreateLegalCase: React.FC = () => {
    const [formData, setFormData] = useState({
        summary: '',
        date_filed: '',
        client_id: 0,
        relevant_statutes: '',
        court: '',
        lawyer_id: 0,
        case_title: '',
    });

    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    const BearerToken: string = 
    "Bearer eyJraWQiOiJKaCtRaXFhaG8yYzNiKytJM011QWhVWmgxd1pQbk8xSlwvWjlTTkVtaGZjYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9McHVNeXl3SzkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2cTBuNGFuNmE1ZXQzOWdubzdkOGpmNDgwbiIsIm9yaWdpbl9qdGkiOiI0MTMyY2EwZC0yOTZkLTRjMzYtOTQ4Yy1kNGFmZDFjODIzYmUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTcxNjgyMDY4NywiZXhwIjoxNzE2ODI0Mjg3LCJpYXQiOjE3MTY4MjA2ODcsImp0aSI6IjM1OGMyNTE0LTQzMzItNDkwMi1iZGRjLWExZGQ2MmI1OGQ0MSIsInVzZXJuYW1lIjoiNDQ1ODI0MjgtYzA0MS03MGFjLTdlOGItY2Y0MDM0YjIzMTQyIn0.0fT-MjjA-YzpFBrGHb7wBsiKCjqGBPSIKG-iT4sp4FYQyJ1uizsEV2UwQxEqmA_BPfp4P32jdPCxqeeWAYlu3d-EQKwtFjjx3q-U4QIX3Fu0dcRiPPo-oqdyyTT797u_lqgyzXdnppO5Sk_F48M50qxdrXccttTSrpqOk9zEIuSN3zqsQfKomFrjZUdVoWxQDhVy9IX3a-dh16WXonPH1sV8Fq3cfAz1f7nks5DUa4P1k6C47I3ediX3Nnx7PynV5vJMW1zHMFdiMzuS6jf7f0I98yzm132_WNj3vuNG9_lokWdY2E0sf3mxoR6J2LLCWMEFNRl0kwaQ-MLp3oznlg"
    ;
    const formatDateForApi = (date: string): string => {
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear();
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = parsedDate.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: id === 'client_id' || id === 'lawyer_id' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", BearerToken);

        const formattedDate = formatDateForApi(formData.date_filed);

        const payload = {
            ...formData,
            date_filed: formattedDate,
        };

        const raw = JSON.stringify(payload);

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect,
        };

        fetch("https://rhg5a9pdvh.execute-api.us-east-1.amazonaws.com/legalCases", requestOptions) //?page=1&limit=20
            .then(response => response.text())
            .then(result => {
                setResponse(result);
                console.log('Form data submitted:', result);
            })
            .catch(error => {
                setError(error);
                console.error('Error:', error);
            });
    };


    return (
        <div className='container'>
            {error && <p>Error: {error.message}</p>}
            {response && <p>Response: {response}</p>}
            <FormPostLegalCases formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
};

export default CreateLegalCase;
