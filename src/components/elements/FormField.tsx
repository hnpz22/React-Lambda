interface FormFieldProps {
    label: string;
    type: string;
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const FormField = ({
    label,
    type,
    id,
    value,
    onChange,
  }: FormFieldProps) => {
    return (
      <div className="mb-2">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };

  export default FormField;