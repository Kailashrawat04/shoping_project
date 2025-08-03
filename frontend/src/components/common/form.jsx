import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Form = ({ onSubmit, children, className }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-4 ${className}`}
    >
      {children}
    </form>
  );
};

const FormField = ({ label, type, name, value, onChange, placeholder, required }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1"
      />
    </div>
  );
};

const FormButton = ({ type, children, className }) => {
  return (
    <Button type={type} className={className}>
      {children}
    </Button>
  );
};

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText, className }) => {
  return (
    <Form onSubmit={onSubmit} className={className}>
      {formControls.map((controlItem) => (
        <FormField
          key={controlItem.id}
          label={controlItem.label}
          type={controlItem.type}
          name={controlItem.name}
          value={formData[controlItem.name]}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          placeholder={controlItem.placeholder}
          required={controlItem.required}
        />
      ))}
      <FormButton type="submit">{buttonText}</FormButton>
    </Form>
  );
};

export { Form, FormField, FormButton, CommonForm };
export default CommonForm;
