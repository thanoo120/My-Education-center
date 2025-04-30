import React, { useEffect, useState } from 'react';
import { getFeeStatus } from '../services/studentService';

function FeeStatus() {
  const [fees, setFees] = useState({});

  useEffect(() => {
    async function fetchFees() {
      const data = await getFeeStatus();
      setFees(data);
    }
    fetchFees();
  }, []);

  return (
    <div>
      <h2>💵 Fee Status</h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Total Fees:</strong> {fees.total} USD</p>
        <p><strong>Paid:</strong> {fees.paid} USD</p>
        <p><strong>Pending:</strong> {fees.pending} USD</p>
      </div>
    </div>
  );
}

export default FeeStatus;
