import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(true);

  const handleConfirm = () => {
    setVisible(false);
    onConfirm();
  };

  const handleCancel = () => {
    setVisible(false);
    onCancel();
  };

  return (
    <Modal
      title="Confirmation"
      open={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="confirm" onClick={handleConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to perform this action?</p>
    </Modal>
  );
};

export default ConfirmationDialog;
