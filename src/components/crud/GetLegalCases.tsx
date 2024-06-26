// GetLegalCases.tsx
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

  const BearerToken: string = "Bearer eyJraWQiOiJKaCtRaXFhaG8yYzNiKytJM011QWhVWmgxd1pQbk8xSlwvWjlTTkVtaGZjYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NDU4MjQyOC1jMDQxLTcwYWMtN2U4Yi1jZjQwMzRiMjMxNDIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9McHVNeXl3SzkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2cTBuNGFuNmE1ZXQzOWdubzdkOGpmNDgwbiIsIm9yaWdpbl9qdGkiOiI0MTMyY2EwZC0yOTZkLTRjMzYtOTQ4Yy1kNGFmZDFjODIzYmUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTcxNjgyMDY4NywiZXhwIjoxNzE2ODI0Mjg3LCJpYXQiOjE3MTY4MjA2ODcsImp0aSI6IjM1OGMyNTE0LTQzMzItNDkwMi1iZGRjLWExZGQ2MmI1OGQ0MSIsInVzZXJuYW1lIjoiNDQ1ODI0MjgtYzA0MS03MGFjLTdlOGItY2Y0MDM0YjIzMTQyIn0.0fT-MjjA-YzpFBrGHb7wBsiKCjqGBPSIKG-iT4sp4FYQyJ1uizsEV2UwQxEqmA_BPfp4P32jdPCxqeeWAYlu3d-EQKwtFjjx3q-U4QIX3Fu0dcRiPPo-oqdyyTT797u_lqgyzXdnppO5Sk_F48M50qxdrXccttTSrpqOk9zEIuSN3zqsQfKomFrjZUdVoWxQDhVy9IX3a-dh16WXonPH1sV8Fq3cfAz1f7nks5DUa4P1k6C47I3ediX3Nnx7PynV5vJMW1zHMFdiMzuS6jf7f0I98yzm132_WNj3vuNG9_lokWdY2E0sf3mxoR6J2LLCWMEFNRl0kwaQ-MLp3oznlg";

  const fetchLegalCases = async (page: number) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", BearerToken);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`https://rhg5a9pdvh.execute-api.us-east-1.amazonaws.com/legalCases?page=${page}`, requestOptions);
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      setError(error as Error);
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
              {data.casosPorPagina.map((legalCase) => (
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
