import React, { useEffect, useState } from 'react';
import {LegalCasesInterface} from '../elements/LegalCasesInterface';
import LegalCaseItem from '../elements/LegalCaseItem';

interface ApiResponse {
  paginaActual: number;
  totalPaginas: number;
  casosPorPagina: LegalCasesInterface[];
}

const GetLegalCases: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const BearerToken: string = 
  "Bearer eyJraWQiOiJKaCtRaXFhaG8yYzNiKytJM011QWhVWmgxd1pQbk8xSlwvWjlTTkVtaGZjYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9McHVNeXl3SzkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2cTBuNGFuNmE1ZXQzOWdubzdkOGpmNDgwbiIsIm9yaWdpbl9qdGkiOiIyZWRjYjIwYi01N2U1LTQ3OWQtYmFjMy03MDZmZDE4YmM1OGUiLCJldmVudF9pZCI6IjI1ZmFhNzQ0LWFmNzItNGZhZS1iMDcwLTgwMWZlNWNmZWZlNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNzE2NTE3MjQyLCJleHAiOjE3MTY1MjA4NDIsImlhdCI6MTcxNjUxNzI0MiwianRpIjoiMDA1YWYyYjctMzI2OS00N2M5LTlmYjUtOTk4ZTgyNzRkMjgyIiwidXNlcm5hbWUiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIifQ.vd77imuKJrsjiS5slOpVus7zb02kt0F6K9LabcpVxYLURWB5oBnCRx2tMJddRw2x5QqDcmVCswQiHbo43Xr2PAWbu9Is0LFbFD1e4JyZPXAlRlYt8uLVe3hP9GBt5vZvYq5zey_LdSehCaRs9gIXxiUg7ebPjclYG6uZQwWDIb4woAFOFRhVZvhVkv2l7xlD-7L6J66BMT8iDgvlHOgLJiFkwImw9DAaa37RZWrourjSzaMnzFsYWNQvuO4JZ6R5kM1NIfFoChRn2PXCpAQPakIIMsPTO9iRM6FT7Yv89JgE7my98SHJiuqwXfekeQuyAwxGmcUtTcMA4DDAB0lGCQ"
  ;
  
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", BearerToken);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://rhg5a9pdvh.execute-api.us-east-1.amazonaws.com/legalCases?page=2&limit=20", requestOptions) //?page=1&limit=20
      .then(response => response.json())
      .then(result => {
        setData(result);
        console.log(result);
      })
      .catch(error => {
        setError(error);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-xl mt-4">
      <h2>Legal Cases</h2>
      {error && <div className="alert alert-danger">{error.message}</div>}
      {data ? (
        <div>
          <p>Page {data.paginaActual} of {data.totalPaginas}</p>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Case ID</th>
                <th>Case Title</th>
                <th>Client ID</th>
                <th>Lawyer ID</th>
                <th>Court</th>
                <th>Relevant Statutes</th>
                <th>Summary</th>
                <th>Date Filed</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.casosPorPagina.map(legalCase => (
                <LegalCaseItem key={legalCase.case_id} legalCase={legalCase} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};
export default GetLegalCases;