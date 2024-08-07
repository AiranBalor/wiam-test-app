import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import AddressWorkForm from '../components/AddressWorkForm';
import LoanParametersForm from '../components/LoanParametersForm';
import ConfirmationModal from '../components/ConfirmationModal';

const FormPage = () => {
    const [formData, setFormData] = useState({
        phone: '',
        firstName: '',
        lastName: '',
        gender: '',
        workPlace: '',
        address: '',
        loanAmount: 200,
        loanTerm: 10
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const history = useHistory();

    const updateFormData = (newData) => {
        setFormData({ ...formData, ...newData });
    };

    const submitForm = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/products/add', {
                title: `${formData.firstName} ${formData.lastName}`
            });
            setModalData({
                lastName: formData.lastName,
                firstName: formData.firstName,
                loanAmount: formData.loanAmount,
                loanTerm: formData.loanTerm
            });
            setModalVisible(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <Switch>
                <Route path="/form1" render={() => (
                    <PersonalDetailsForm formData={formData} updateFormData={updateFormData} history={history} />
                )} />
                <Route path="/form2" render={() => (
                    <AddressWorkForm formData={formData} updateFormData={updateFormData} history={history} />
                )} />
                <Route path="/form3" render={() => (
                    <LoanParametersForm formData={formData} updateFormData={updateFormData} submitForm={submitForm} history={history} />
                )} />
                <Route exact path="/" render={() => (
                    <PersonalDetailsForm formData={formData} updateFormData={updateFormData} history={history} />
                )} />
            </Switch>
            <ConfirmationModal visible={modalVisible} data={modalData} onClose={() => setModalVisible(false)} />
        </div>
    );
};

export default FormPage;