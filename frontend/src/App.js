import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Factures from './Factures';
import Clients from './Clients';

function App() {
  const [token, setToken] = useState(null);
  const [nom, setNom] = useState('');
  const [page, setPage] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Entrez votre email et mot de passe');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.access_token);
        setNom(data.nom);
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
    setLoading(false);
  };

  if (token) {
    return (
      <div style={{display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', background: '#f5f5f5'}}>

        {/* Sidebar */}
        <div style={{width: '200px', background: 'white', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column'}}>
          <div style={{padding: '20px 16px', fontSize: '20px', fontWeight: '600', borderBottom: '1px solid #eee'}}>
            In<span style={{color: '#185FA5'}}>voya</span>
          </div>

          {[
            { id: 'dashboard', icon: '📊', label: 'Tableau de bord' },
            { id: 'factures', icon: '📄', label: 'Factures' },
            { id: 'clients', icon: '👥', label: 'Clients' },
            { id: 'fournisseurs', icon: '🏢', label: 'Fournisseurs' },
            { id: 'journaux', icon: '📒', label: 'Journaux' },
            { id: 'balance', icon: '⚖️', label: 'Balance' },
            { id: 'bilan', icon: '📈', label: 'Bilan' },
            { id: 'dossiers', icon: '💼', label: 'Dossiers' },
            { id: 'parametres', icon: '⚙️', label: 'Paramètres' },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                fontSize: '13px',
                cursor: 'pointer',
                background: page === item.id ? '#E6F1FB' : 'transparent',
                color: page === item.id ? '#185FA5' : '#666',
                fontWeight: page === item.id ? '600' : '400',
                borderLeft: page === item.id ? '3px solid #185FA5' : '3px solid transparent'
              }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}

          {/* Utilisateur connecté */}
          <div style={{marginTop: 'auto', padding: '14px 16px', borderTop: '1px solid #eee', fontSize: '12px', color: '#888'}}>
            👤 {nom}
            <div
              onClick={() => { setToken(null); setNom(''); }}
              style={{color: '#185FA5', cursor: 'pointer', marginTop: '4px', fontSize: '12px'}}>
              Déconnexion
            </div>
          </div>
        </div>

        {/* Page active */}
        {page === 'dashboard' && <Dashboard token={token} />}
        {page === 'factures' && <Factures token={token} />}
        {page === 'clients' && <Clients token={token} />}
        {!['dashboard', 'factures', 'clients'].includes(page) && (
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '14px'}}>
            Page {page} — bientôt disponible
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif'}}>
      <div style={{background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
        <h1 style={{textAlign: 'center', fontSize: '28px', marginBottom: '8px', color: '#1a1a1a'}}>
          In<span style={{color: '#185FA5'}}>voya</span>
        </h1>
        <p style={{textAlign: 'center', color: '#888', fontSize: '13px', marginBottom: '32px'}}>
          Facturation électronique conforme 2026
        </p>

        {error && (
          <div style={{background: '#FAEEDA', color: '#854F0B', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px'}}>
            {error}
          </div>
        )}

        <div style={{marginBottom: '16px'}}>
          <label style={{display: 'block', fontSize: '13px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>Adresse email</label>
          <input
            type="email"
            placeholder="vous@cabinet.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box'}}
          />
        </div>

        <div style={{marginBottom: '24px'}}>
          <label style={{display: 'block', fontSize: '13px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box'}}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{width: '100%', padding: '11px', background: loading ? '#aaa' : '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer'}}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p style={{textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#888'}}>
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