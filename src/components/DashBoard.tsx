import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = decodeToken(token);
      setUserType(decodedToken.type);
    } else {
      console.log('User not authenticated');
    }
  }, []);

  const decodeToken = (token: string) => {
    const payload = token.split('.')[1];
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    return JSON.parse(decodedPayload);
  };

  return (
    <div>
      {userType === 'user' && <UserDashboard />}
      {userType === 'admin' && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
