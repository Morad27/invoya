import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les métriques
    fetch('http://127.0.0.1:8000/dashboard')
      .then(res => res.json())
      .then(data => setMetrics(data));

    // Récupérer les factures
    fetch('http://127.0.0.1:8000/factures')
      .then(res => res.json())
      .then(data => {
        setFactures(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '14px'}}>
      Chargement...
    </div>
  );

  return (
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>

      {/* Topbar */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #eee',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{fontSize: '15px', fontWeight: '600', color: '#1a1a1a'}}>
          Tableau de bord — Mai 2026
        </div>
        <button style={{
          background: '#185FA5',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '13px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          + Nouvelle facture
        </button>
      </div>

      {/* Contenu */}
      <div style={{flex: 1, overflowY: 'auto', padding: '24px'}}>

        {/* Métriques */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'CA ce mois', value: metrics ? metrics.ca_mois + ' €' : '...', trend: '↑ +12%', color: '#3B6D11' },
            { label: 'Factures émises', value: metrics ? metrics.factures_emises : '...', trend: '↑ +5 cette semaine', color: '#3B6D11' },
            { label: 'Impayés', value: metrics ? metrics.impayes + ' €' : '...', trend: 'À relancer', color: '#854F0B' },
            { label: 'Clients actifs', value: metrics ? metrics.clients_actifs : '...', trend: '3 cabinets', color: '#185FA5' },
          ].map((m, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '10px',
              padding: '16px',
              border: '1px solid #eee'
            }}>
              <div style={{fontSize: '12px', color: '#888', marginBottom: '8px'}}>{m.label}</div>
              <div style={{fontSize: '22px', fontWeight: '600', color: '#1a1a1a'}}>{m.value}</div>
              <div style={{fontSize: '11px', color: m.color, marginTop: '4px'}}>{m.trend}</div>
            </div>
          ))}
        </div>

        {/* Dernières factures */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          border: '1px solid #eee',
          overflow: 'hidden'
        }}>
          <div style={{padding: '14px 20px', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: '600'}}>
            Dernières factures
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
            <thead>
              <tr style={{background: '#f9f9f9'}}>
                {['N° Facture', 'Client', 'Date', 'Montant HT', 'Statut', 'Factur-X'].map((h, i) => (
                  <th key={i} style={{padding: '10px 16px', textAlign: 'left', fontSize: '11px', color: '#888', fontWeight: '500'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {factures.map((f, i) => (
                <tr key={i} style={{borderTop: '1px solid #f0f0f0'}}>
                  <td style={{padding: '12px 16px', color: '#185FA5'}}>{f.numero}</td>
                  <td style={{padding: '12px 16px'}}>{f.client}</td>
                  <td style={{padding: '12px 16px', color: '#888'}}>{f.date}</td>
                  <td style={{padding: '12px 16px', fontWeight: '500'}}>{f.montant} €</td>
                  <td style={{padding: '12px 16px'}}>
                    <span style={{
                      background: f.statut === 'Payée' ? '#EAF3DE' : '#FAEEDA',
                      color: f.statut === 'Payée' ? '#3B6D11' : '#854F0B',
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: '500'
                    }}>{f.statut}</span>
                  </td>
                  <td style={{padding: '12px 16px'}}>
                    <span style={{background: '#E6F1FB', color: '#185FA5', padding: '3px 8px', borderRadius: '99px', fontSize: '11px', fontWeight: '500'}}>Conforme</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;