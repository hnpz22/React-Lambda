import React from 'react';
import { LegalCasesInterface } from './LegalCasesInterface';

interface LegalCaseItemProps {
  legalCase: LegalCasesInterface;
}

const LegalCaseItem: React.FC<LegalCaseItemProps> = ({ legalCase }) => {
    return (
      <tr key={legalCase.case_id}>
        <td>{legalCase.case_id}</td>
        <td>{legalCase.case_title}</td>
        <td>{legalCase.client_id}</td>
        <td>{legalCase.lawyer_id}</td>
        <td>{legalCase.court}</td>
        <td>{legalCase.relevant_statutes}</td>
        <td>{legalCase.summary}</td>
        <td>{legalCase.date_filed}</td>
        <td>{legalCase.created_at}</td>
      </tr>
    );
  };
  
  export default LegalCaseItem;