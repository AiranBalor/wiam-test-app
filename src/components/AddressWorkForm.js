import React, { useState, useEffect } from 'react';
import { requiredFieldMessage } from '../constants/errorMessage';
import axios from 'axios'
import { AppRoutes } from '../constants/routes';
import { appApi } from '../constants/api';

const AddressWorkForm = ({ formData, updateFormData, navigate }) => {
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(appApi.categories)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.workPlace) newErrors.workPlace = requiredFieldMessage;
        if (!formData.address) newErrors.address = requiredFieldMessage;
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            navigate(AppRoutes.thirdForm)
        }
    };

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className="container mt-5">
            <h2>Информация о работе и адресе проживания</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="workPlace" className="form-label">Область работы</label>
                    <select
                        id="workPlace"
                        name="workPlace"
                        className={`form-control ${errors.workPlace ? 'is-invalid' : ''}`}
                        value={formData.workPlace}
                        onChange={handleChange}
                    >
                        <option value="">Select a work place</option>
                        {categories.map((category) => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.workPlace && <div className="invalid-feedback">{errors.workPlace}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Адрес проживания</label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <button type="button" className="btn btn-primary" onClick={goBack}>Назад</button>
                <button type="submit" className="btn btn-primary ms-2">Вперед</button>
            </form>
        </div>
    );
};

export default AddressWorkForm;