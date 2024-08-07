import React, { useState } from 'react';
import { requiredFieldMessage } from '../constants/errorMessage';

const LoanParametersForm = ({ formData, updateFormData, submitForm }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.loanAmount || isNaN(formData.loanAmount)) newErrors.loanAmount = requiredFieldMessage;
        if (!formData.loanTerm || isNaN(formData.loanTerm)) newErrors.loanTerm = requiredFieldMessage;
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            submitForm();
        }
    };

    return (
        <div className="container mt-5">
            <h2>Параметры займа</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="loanAmount" className="form-label">Сумма займа ($200 - $1000)</label>
                    <input
                        type="range"
                        className={`form-range ${errors.loanAmount ? 'is-invalid' : ''}`}
                        id="loanAmount"
                        name="loanAmount"
                        min="200"
                        max="1000"
                        step="100"
                        value={formData.loanAmount}
                        onChange={handleChange}
                    />
                    <div>{formData.loanAmount}</div>
                    {errors.loanAmount && <div className="invalid-feedback">{errors.loanAmount}</div>}
                </div>
                <div className="mb-3">
                <label htmlFor="loanTerm" className="form-label">Срок займа (10 - 30 дней)</label>
                    <input
                        type="range"
                        className={`form-range ${errors.loanTerm ? 'is-invalid' : ''}`}
                        id="loanTerm"
                        name="loanTerm"
                        min="10"
                        max="30"
                        step="1"
                        value={formData.loanTerm}
                        onChange={handleChange}
                    />
                    <div>{formData.loanTerm} дней</div>
                    {errors.loanTerm && <div className="invalid-feedback">{errors.loanTerm}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Подать заявку</button>
            </form>
        </div>
    );
};

export default LoanParametersForm;