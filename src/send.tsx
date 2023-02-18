import React, { useState } from 'react';
import axios from 'axios';

const DeliveryButton = () => {
  const [isSending, setIsSending] = useState(false);

  const handleDeliveryClick = async () => {
    setIsSending(true);

    try {
      await axios.post('http://localhost:5000/order', {
        coordinates: `${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}`,
        time: new Date().toLocaleString(),
        username: `user${Math.floor(Math.random() * 100)}`,
      });
      setIsSending(false);
      console.log('Delivery order sent');
    } catch (err) {
      setIsSending(false);
      console.error(err);
    }
  };

  return (
    <button disabled={isSending} onClick={handleDeliveryClick}>
      {isSending ? 'Sending...' : 'Send Delivery'}
    </button>
  );
};

export default DeliveryButton;
