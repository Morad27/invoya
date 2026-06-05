import React from 'react';

function Dashboard() {
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
            { label: 'CA ce mois', value: '84 200 €', trend: '↑ +12%', color: '#3B6D11' },
            { label: 'Factures émises', value: '47', trend: '↑ +5 cette semaine', color: '#3B6D11' },
            { label: 'Impayés', value: '12 400 €', trend: '8 factures', color: '#854F0B' },
            { label: 'Clients actifs', value: '23', trend: '3 cabinets', color: '#185FA5' },
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
              {[
                { num: 'FA-2026-0047', client: 'Cabinet Dupont', date: '27/05/2026', montant: '3 200 €', statut: 'Payée', statutColor: '#3B6D11', statutBg: '#EAF3DE' },
                { num: 'FA-2026-0046', client: 'SAS Technova', date: '25/05/2026', montant: '1 850 €', statut: 'En attente', statutColor: '#854F0B', statutBg: '#FAEEDA' },
                { num: 'FA-2026-0045', client: 'SARL Bâtiplus', date: '22/05/2026', montant: '5 600 €', statut: 'Payée', statutColor: '#3B6D11', statutBg: '#EAF3DE' },
                { num: 'FA-2026-0044', client: 'Auto-ent. Leroy', date: '20/05/2026', montant: '420 €', statut: 'En attente', statutColor: '#854F0B', statutBg: '#FAEEDA' },
              ].map((f, i) => (
                <tr key={i} style={{borderTop: '1px solid #f0f0f0'}}>
                  <td style={{padding: '12px 16px', color: '#185FA5'}}>{f.num}</td>
                  <td style={{padding: '12px 16px'}}>{f.client}</td>
                  <td style={{padding: '12px 16px', color: '#888'}}>{f.date}</td>
                  <td style={{padding: '12px 16px', fontWeight: '500'}}>{f.montant}</td>
                  <td style={{padding: '12px 16px'}}>
                    <span style={{background: f.statutBg, color: f.statutColor, padding: '3px 8px', borderRadius: '99px', fontSize: '11px', fontWeight: '500'}}>{f.statut}</span>
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