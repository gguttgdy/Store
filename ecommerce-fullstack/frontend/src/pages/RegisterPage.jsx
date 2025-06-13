import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      paddingTop: '120px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.7
      }}></div>
      
      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '120px',
        height: '120px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        backdropFilter: 'blur(10px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        backdropFilter: 'blur(10px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      
      <RegisterForm />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
