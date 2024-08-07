import React, { useState } from 'react';
import { phonePatternMessage, requiredFieldMessage } from '../constants/errorMessage';
import { phonePattern } from '../constants/validationPatterns';
import { AppRoutes } from '../constants/routes';

const PersonalDetailsForm = ({ formData, updateFormData, navigate }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.phone.length) newErrors.phone = requiredFieldMessage;
        if (!formData.phone.match(phonePattern)) newErrors.phone = phonePatternMessage;
        if (!formData.firstName) newErrors.firstName = requiredFieldMessage;
        if (!formData.lastName) newErrors.lastName = requiredFieldMessage;
        if (!formData.gender) newErrors.gender = requiredFieldMessage;
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            navigate(AppRoutes.secondForm)
        }
    };

    return (
        <div className="container mt-5">
            <h2>Персональная информация</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Телефон</label>
                    <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0XXX XXX XXX"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Имя</label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Фамилия</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Пол</label>
                    <select
                        className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Выберите пол</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Вперед</button>
            </form>
        </div>
    );
};

export default PersonalDetailsForm;