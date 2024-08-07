import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddressWorkForm from './components/AddressWorkForm';
import LoanParametersForm from './components/LoanParametersForm';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import ConfirmationModal from './components/ConfirmationModal';
import axios from 'axios'
import { AppRoutes } from './constants/routes';
import { appApi } from './constants/api';

function App() {

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

  const navigate = useNavigate()

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const submitForm = async () => {
    try {
        await axios.post(appApi.requestLoan, {
            title: `${formData.firstName} ${formData.lastName}`
        });

        setModalData({
            lastName: formData.lastName,
            firstName: formData.firstName,
            loanAmount: formData.loanAmount,
            loanTerm: formData.loanTerm
        });
        setModalVisible(true);
        navigate(AppRoutes.modal);

    } catch (error) {
        console.error(error);
    }
};

const handleCloseModal = () => {
  setModalVisible(false)
  setFormData({
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
    workPlace: '',
    address: '',
    loanAmount: 0,
    loanTerm: 0
})
}

  return (
          <Routes>
              <Route path={AppRoutes.root} element={<PersonalDetailsForm formData={formData} updateFormData={updateFormData} navigate={navigate}/>} />
              <Route path={AppRoutes.secondForm} element={<AddressWorkForm formData={formData} updateFormData={updateFormData} navigate={navigate}/>} />
              <Route path={AppRoutes.thirdForm} element={<LoanParametersForm formData={formData} updateFormData={updateFormData} submitForm={submitForm}/>} />
              <Route path={AppRoutes.modal} element={<ConfirmationModal visible={modalVisible} data={modalData} handleClose={handleCloseModal} navigate={navigate}/>} />
          </Routes>
    );
}

export default App;
