import React, { useState } from 'react';
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
    "Bearer eyJraWQiOiJKaCtRaXFhaG8yYzNiKytJM011QWhVWmgxd1pQbk8xSlwvWjlTTkVtaGZjYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9McHVNeXl3SzkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2cTBuNGFuNmE1ZXQzOWdubzdkOGpmNDgwbiIsIm9yaWdpbl9qdGkiOiIyZWRjYjIwYi01N2U1LTQ3OWQtYmFjMy03MDZmZDE4YmM1OGUiLCJldmVudF9pZCI6IjI1ZmFhNzQ0LWFmNzItNGZhZS1iMDcwLTgwMWZlNWNmZWZlNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNzE2NTE3MjQyLCJleHAiOjE3MTY1MjA4NDIsImlhdCI6MTcxNjUxNzI0MiwianRpIjoiMDA1YWYyYjctMzI2OS00N2M5LTlmYjUtOTk4ZTgyNzRkMjgyIiwidXNlcm5hbWUiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIifQ.vd77imuKJrsjiS5slOpVus7zb02kt0F6K9LabcpVxYLURWB5oBnCRx2tMJddRw2x5QqDcmVCswQiHbo43Xr2PAWbu9Is0LFbFD1e4JyZPXAlRlYt8uLVe3hP9GBt5vZvYq5zey_LdSehCaRs9gIXxiUg7ebPjclYG6uZQwWDIb4woAFOFRhVZvhVkv2l7xlD-7L6J66BMT8iDgvlHOgLJiFkwImw9DAaa37RZWrourjSzaMnzFsYWNQvuO4JZ6R5kM1NIfFoChRn2PXCpAQPakIIMsPTO9iRM6FT7Yv89JgE7my98SHJiuqwXfekeQuyAwxGmcUtTcMA4DDAB0lGCQ"
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
