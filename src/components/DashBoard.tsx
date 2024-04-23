import React, { useState, useEffect } from 'react';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const [userType, setUserType] = useState<string>('user');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Split the token into its three parts: header, payload, and signature
        const parts = token.split('.');
        
        // Decode the payload (second part)
        const payload = JSON.parse(atob(parts[1]));
        
        // Extract user type from the decoded payload
        const userTypeFromToken = payload.type;
        console.log('User Type from Token:', userTypeFromToken);
        
        // Set the user type
        setUserType(userTypeFromToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('User not authenticated');
    }
  }, []);
  
  return (
    <div>
      {userType === 'user' && <UserDashboard />}
      {userType === 'admin' && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
