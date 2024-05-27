import React, { useEffect, useState } from 'react';
import '@aws-amplify/ui-react/styles.css';
import { LegalCasesInterface } from '../elements/LegalCasesInterface';
import LegalCaseItem from '../elements/LegalCaseItem';
import Pagination from '../elements/Pagination';

interface ApiResponse {
  paginaActual: number;
  totalPaginas: number;
  casosPorPagina: LegalCasesInterface[];
}

const GetLegalCases: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10; // Number of items per page

  const BearerToken: string = "Bearer eyJraWQiOiJKaCtRaXFhaG8yYzNiKytJM011QWhVWmgxd1pQbk8xSlwvWjlTTkVtaGZjYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9McHVNeXl3SzkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2cTBuNGFuNmE1ZXQzOWdubzdkOGpmNDgwbiIsIm9yaWdpbl9qdGkiOiJhZjgwMTVhOC0xNzZhLTQzODktYTA3Mi0yYWYwOTdkZjUxYzgiLCJldmVudF9pZCI6IjIzYTcxODc1LTJjM2YtNDc5ZC05MzhiLWEwYzUwOWVjN2JiNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNzE2ODIwMzcwLCJleHAiOjE3MTY4MjM5NzAsImlhdCI6MTcxNjgyMDM3MCwianRpIjoiOWViZWRmYWEtMzA4NS00OWUxLWI4MDktOTk2NzZiOTJkMmUwIiwidXNlcm5hbWUiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIifQ.AhYSqLmo6A_cRooJKOHQZrRAUqpVDPjJoAnNZFDDP7DAQatmOad0XaYNDmLR-Qcr8JWgqsA2_Bm7pnJYIlUy9HxXtV2TWo9VKfYDhh7CTKAlEP6wOs2DsjdUAnXPjEjEeGQ78tsaKoTNiUjLUQMRpPUj0jrWLVxsCE6fEomsX6WUPjolHhQvZgbM3qdHJ4eusdTxGAbs8EkeCTwIpZHmiAgQGrA3TEt7kmFmisftf5z9u0LqqNiqdo3eqarnIme-UZjR2xCO55-3hoc-Q1duoSEbFUTT9j8A-o-zhcRuN-cJDzt6r-jhuqWGpDBPAodinsh7hyXwbir90Yc-rkxWqA";

  const fetchLegalCases = async (page: number) => {
    const offset = (page - 1) * limit;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", BearerToken);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`https://rhg5a9pdvh.execute-api.us-east-1.amazonaws.com/legalCases?limit=${limit}&offset=${offset}`, requestOptions);
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      setError(error as Error); // Explicitly cast the error to Error
    }
  };

  useEffect(() => {
    fetchLegalCases(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <Pagination
            currentPage={data.paginaActual}
            totalPages={data.totalPaginas}
            onPageChange={handlePageChange}
          />
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
