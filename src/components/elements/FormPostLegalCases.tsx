import React from "react"
import FormField from "./FormField"
import { LegalCasesInterface } from "./LegalCasesInterface"

interface FormPostLegalCasesProps {
    formData: LegalCasesInterface;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const FormPostLegalCases: React.FC<FormPostLegalCasesProps> = ({formData, handleChange, handleSubmit}) => {
    return (
        <div className='container'>
        <h3>POST a Legal Case</h3>
        <form className="row g-3 px-2 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
            <FormField
            label="Client ID"
            type="number"
            id="client_id"
            value={formData.client_id}
            onChange={handleChange}
            />
        </div>
        <div className="col-md-4">
            <FormField
            label="Lawyer ID"
            type="number"
            id="lawyer_id"
            value={formData.lawyer_id}
            onChange={handleChange}
            />
        </div>
        <div className="col-md-12">
            <FormField
            label="Case Title"
            type="text"
            id="case_title"
            value={formData.case_title}
            onChange={handleChange}
            />
        </div>
        <div className="col-md-6">
            <FormField
            label="Court"
            type="text"
            id="court"
            value={formData.court}
            onChange={handleChange}
            />
        </div>
        <div className="col-md-6">
            <FormField
            label="Date Filed"
            type="date"
            id="date_filed"
            value={formData.date_filed}
            onChange={handleChange}
            />
        </div>
        <div className="col-md-12">
            <FormField
            label="Relevant Statutes"
            type="text"
            id="relevant_statutes"
            value={formData.relevant_statutes}
            onChange={handleChange}
            />
        </div>
        <div className="col-md-12">
            <FormField
            label="Summary"
            type="text"
            id="summary"
            value={formData.summary}
            onChange={handleChange}
            />
        </div>
        <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
        </div>
    )
}

export default FormPostLegalCases;