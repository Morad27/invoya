import React, { useState } from 'react';

function Factures() {
  const [showForm, setShowForm] = useState(false);

  const factures = [
    { num: 'FA-2026-0047', client: 'Cabinet Dupont', date: '27/05/2026', montant: '3 200 €', statut: 'Payée', statutColor: '#3B6D11', statutBg: '#EAF3DE' },
    { num: 'FA-2026-0046', client: 'SAS Technova', date: '25/05/2026', montant: '1 850 €', statut: 'En attente', statutColor: '#854F0B', statutBg: '#FAEEDA' },
    { num: 'FA-2026-0045', client: 'SARL Bâtiplus', date: '22/05/2026', montant: '5 600 €', statut: 'Payée', statutColor: '#3B6D11', statutBg: '#EAF3DE' },
    { num: 'FA-2026-0044', client: 'Auto-ent. Leroy', date: '20/05/2026', montant: '420 €', statut: 'En attente', statutColor: '#854F0B', statutBg: '#FAEEDA' },
  ];

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
          Factures
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
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

        {/* Formulaire nouvelle facture */}
        {showForm && (
          <div style={{
            background: 'white',
            borderRadius: '10px',
            border: '1px solid #eee',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#1a1a1a'
            }}>
              Nouvelle facture
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div>
                <label style={{display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>Client</label>
                <select style={{width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none'}}>
                  <option>Cabinet Dupont & Associés</option>
                  <option>SAS Technova</option>
                  <option>SARL Bâtiplus</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>N° SIRET</label>
                <input type="text" placeholder="552 144 848 00021" style={{width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box'}} />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>Date d'émission</label>
                <input type="date" style={{width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box'}} />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>Date d'échéance</label>
                <input type="date" style={{width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box'}} />
              </div>
            </div>

            {/* Lignes facture */}
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '8px'}}>Lignes de facture</label>
              <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
                <thead>
                  <tr style={{background: '#f9f9f9'}}>
                    {['Description', 'Quantité', 'Prix unitaire HT', 'TVA', 'Total HT'].map((h, i) => (
                      <th key={i} style={{padding: '8px 12px', textAlign: 'left', fontSize: '11px', color: '#888', fontWeight: '500', border: '1px solid #eee'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{border: '1px solid #eee', padding: '6px'}}><input type="text" placeholder="Mission comptable" style={{width: '100%', padding: '6px', border: 'none', outline: 'none', fontSize: '13px'}} /></td>
                    <td style={{border: '1px solid #eee', padding: '6px'}}><input type="number" defaultValue="1" style={{width: '60px', padding: '6px', border: 'none', outline: 'none', fontSize: '13px'}} /></td>
                    <td style={{border: '1px solid #eee', padding: '6px'}}><input type="text" placeholder="1 500,00 €" style={{width: '100%', padding: '6px', border: 'none', outline: 'none', fontSize: '13px'}} /></td>
                    <td style={{border: '1px solid #eee', padding: '6px'}}>
                      <select style={{padding: '6px', border: 'none', outline: 'none', fontSize: '13px'}}>
                        <option>20%</option>
                        <option>10%</option>
                        <option>0%</option>
                      </select>
                    </td>
                    <td style={{border: '1px solid #eee', padding: '6px', background: '#f9f9f9'}}><input type="text" placeholder="1 500,00 €" readOnly style={{width: '100%', padding: '6px', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent'}} /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '20px'}}>
              <div style={{width: '240px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginBottom: '6px'}}>
                  <span>Total HT</span><span>1 500,00 €</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginBottom: '8px'}}>
                  <span>TVA 20%</span><span>300,00 €</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '600', color: '#1a1a1a', paddingTop: '8px', borderTop: '1px solid #eee'}}>
                  <span>Total TTC</span><span>1 800,00 €</span>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
              <button
                onClick={() => setShowForm(false)}
                style={{padding: '9px 18px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'}}>
                Annuler
              </button>
              <button style={{padding: '9px 18px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '500'}}>
                Émettre la facture
              </button>
            </div>
          </div>
        )}

        {/* Liste factures */}
        <div style={{background: 'white', borderRadius: '10px', border: '1px solid #eee', overflow: 'hidden'}}>
          <div style={{padding: '14px 20px', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: '600'}}>
            Toutes les factures
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
            <thead>
              <tr style={{background: '#f9f9f9'}}>
                {['N° Facture', 'Client', 'Date', 'Montant HT', 'Statut', 'Factur-X', 'Actions'].map((h, i) => (
                  <th key={i} style={{padding: '10px 16px', textAlign: 'left', fontSize: '11px', color: '#888', fontWeight: '500'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {factures.map((f, i) => (
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
                  <td style={{padding: '12px 16px'}}>
                    <button style={{background: 'none', border: '1px solid #ddd', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer', color: '#555'}}>
                      Voir
                    </button>
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

export default Factures;