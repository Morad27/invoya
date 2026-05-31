import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert('Connexion en cours...');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '28px',
          marginBottom: '8px',
          color: '#1a1a1a'
        }}>
          In<span style={{color: '#185FA5'}}>voya</span>
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#888',
          fontSize: '13px',
          marginBottom: '32px'
        }}>
          Facturation électronique conforme 2026
        </p>

        <div style={{marginBottom: '16px'}}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '500',
            color: '#555',
            marginBottom: '6px'
          }}>
            Adresse email
          </label>
          <input
            type="email"
            placeholder="vous@cabinet.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{marginBottom: '24px'}}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '500',
            color: '#555',
            marginBottom: '6px'
          }}>
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '11px',
            background: '#185FA5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Se connecter
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '13px',
          color: '#888'
        }}>
          Pas encore de compte ?{' '}
          <span style={{color: '#185FA5', cursor: 'pointer', fontWeight: '500'}}>
            Essai gratuit 14 jours
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;