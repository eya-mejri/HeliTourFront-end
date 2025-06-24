// components/FlouciPayment.jsx
import React, { useState, useEffect } from 'react';
    import axios from 'axios';
import { Modal, Spin, message } from 'antd';
type FlouciPaymentProps = {
  amount: number;
  reservationId: string;
  email: string;
  phone: string;
  onSuccess: () => void;
  onClose: () => void;
};
const FlouciPayment: React.FC<FlouciPaymentProps> = ({
  amount,
  reservationId,
  email,
  phone,
  onSuccess,
  onClose,
}) => {
  const [paymentUrl, setPaymentUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        // Replace with your actual backend endpoint
        const response = await axios.post('http://localhost:3000/paiements/flouci-initiate', {
          amount,
          reservationId,
          customer_email: email,
          customer_phone: phone
        });
        
        setPaymentUrl(response.data.payment_url);
        setLoading(false);
        
        // Open payment in new tab
        window.open(response.data.payment_url, '_blank');
        
        // Start polling for payment status
        pollPaymentStatus(response.data.payment_id);
      } catch (error) {
        message.error('Failed to initiate payment');
        onClose();
      }
    };

    initiatePayment();
  }, []);

  const pollPaymentStatus = async (paymentId: any) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/paiements/flouci-status/${paymentId}`);
        
        if (response.data.status === 'paid') {
          clearInterval(interval);
          setPaymentVerified(true);
          message.success('Payment successful!');
          onSuccess();
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    }, 3000); // Check every 3 seconds
  };

  return (
    <Modal
      title="Processing Payment"
     
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="text-center p-4">
        {loading ? (
          <>
            <Spin size="large" />
            <p>Preparing payment gateway...</p>
          </>
        ) : paymentVerified ? (
          <>
            <div className="text-success mb-3">
              <i className="fas fa-check-circle fa-5x"></i>
            </div>
            <h4>Payment Verified Successfully!</h4>
            <p>Your reservation is now confirmed.</p>
          </>
        ) : (
          <>
            <div className="mb-3">
              <i className="fas fa-credit-card fa-5x text-primary"></i>
            </div>
            <h4>Complete Your Payment</h4>
            <p>A new tab has opened with the payment gateway.</p>
            <p>If it didn't open, <a href={paymentUrl} target="_blank" rel="noopener noreferrer">click here</a>.</p>
            <div className="mt-3">
              <Spin tip="Waiting for payment confirmation..." />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default FlouciPayment;