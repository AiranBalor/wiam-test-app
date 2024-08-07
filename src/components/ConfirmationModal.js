import React, { useEffect } from 'react';
import { AppRoutes } from '../constants/routes';

const ConfirmationModal = ({ visible, data, handleClose, navigate }) => {

    useEffect(() => {
        if (!visible) {
            navigate(AppRoutes.root)
        }
    }, [visible])

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <p>Поздравляем, {data.lastName} {data.firstName}. Вам одобрена сумма {data.loanAmount} на срок {data.loanTerm} дней.</p>
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;