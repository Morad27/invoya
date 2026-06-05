import React, { useState } from 'react';

function Clients() {
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    { id: 1, nom: 'Cabinet Dupont & Associés', siret: '552 144 848 00021', email: 'contact@dupont.fr', tel: '+33 1 42 36 58 90', ville: 'Paris 75008', type: 'Cabinet', factures: 12, ca: '28 400 €' },
    { id: 2, nom: 'SAS Technova', siret: '481 234 567 00018', email: 'compta@technova.fr', tel: '+33 1 55 23 14 78', ville: 'Paris 75008', type: 'PME', factures: 8, ca: '14 200 €' },
    { id: 3, nom: 'SARL Bâtiplus', siret: '392 876 543 00032', email: 'direction@batiplus.fr', tel: '+33 4 72 18 36 90', ville: 'Lyon 69002', type: 'PME', factures: 6, ca: '9 600 €' },
    { id: 4, nom: 'Auto-ent. Leroy Martin', siret: '712 345 678 00011', email: 'leroy.martin@gmail.com', tel: '+33 5 56 78 34 12', ville: 'Bordeaux 33000', type: 'TPE', factures: 3, ca: '3 200 €' },
  ];

  const typeColors = {
    Cabinet: { bg: '#E6F1FB', color: '#185FA5' },
    PME: { bg: '#EAF3DE', color: '#3B6D11' },
    TPE: { bg: '#FAEEDA', color: '#854F0B' },
  };

  if (selectedClient) {
    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>

        {/* Topbar */}
        <div style={{background: 'white', borderBottom: '1px solid #eee', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button
              onClick={() => setSelectedClient(null)}
              style={{background: 'none', border: '1px solid #ddd', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', color: '#555'}}>
              ← Retour
            </button>
            <div style={{fontSize: '15px', fontWeight: '600', color: '#1a1a1a'}}>
              {selectedClient.nom}
            </div>
          </div>
          <button style={{background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', cursor: 'pointer', fontWeight: '500'}}>
            + Nouvelle facture
          </button>
        </div>

        {/* Contenu fiche client */}
        <div style={{flex: 1, overflowY: 'auto', padding: '24px'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px'}}>

            {/* Informations */}
            <div style={{background: 'white', borderRadius: '10px', border: '1px solid #eee', padding: '20px'}}>
              <div style={{fontSize: '13px', fontWeight: '600', marginBottom: '16px', color: '#1a1a1a'}}>
                Informations
              </div>
              {[
                { label: 'SIRET', value: selectedClient.siret },
                { label: 'Email', value: selectedClient.email },
                { label: 'Téléphone', value: selectedClient.tel },
                { label: 'Ville', value: selectedClient.ville },
                { label: 'Type', value: selectedClient.type },
              ].map((item, i) => (
                <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5', fontSize: '13px'}}>
                  <span style={{color: '#888'}}>{item.label}</span>
                  <span style={{color: '#1a1a1a', fontWeight: '500'}}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Statistiques */}
            <div style={{background: 'white', borderRadius: '10px', border: '1px solid #eee', padding: '20px'}}>
              <div style={{fontSize: '13px', fontWeight: '600', marginBottom: '16px', color: '#1a1a1a'}}>
                Statistiques
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                {[
                  { label: 'CA total', value: selectedClient.ca, color: '#3B6D11' },
                  { label: 'Factures', value: selectedClient.factures, color: '#185FA5' },
                  { label: 'Impayés', value: '0 €', color: '#3B6D11' },
                  { label: 'Conformité', value: '100%', color: '#3B6D11' },
                ].map((s, i) => (
                  <div key={i} style={{background: '#f9f9f9', borderRadius: '8px', padding: '14px'}}>
                    <div style={{fontSize: '11px', color: '#888', marginBottom: '6px'}}>{s.label}</div>
                    <div style={{fontSize: '20px', fontWeight: '600', color: s.color}}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Historique factures */}
          <div style={{background: 'white', borderRadius: '10px', border: '1px solid #eee', overflow: 'hidden'}}>
            <div style={{padding: '14px 20px', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: '600'}}>
              Historique des factures
            </div>
            <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
              <thead>
                <tr style={{background: '#f9f9f9'}}>
                  {['N° Facture', 'Date', 'Montant HT', 'Statut', 'Factur-X'].map((h, i) => (
                    <th key={i} style={{padding: '10px 16px', textAlign: 'left', fontSize: '11px', color: '#888', fontWeight: '500'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { num: 'FA-2026-0047', date: '27/05/2026', montant: '3 200 €', statut: 'Payée', statutColor: '#3B6D11', statutBg: '#EAF3DE' },
                  { num: 'FA-2026-0041', date: '15/04/2026', montant: '3 200 €', statut: 'Payée', statutColor: '#3B6D11', statutBg: '#EAF3DE' },
                  { num: 'FA-2026-0035', date: '12/03/2026', montant: '3 200 €', statut: 'Payée', statutColor: '#3B6D11', statutBg: '#EAF3DE' },
                ].map((f, i) => (
                  <tr key={i} style={{borderTop: '1px solid #f0f0f0'}}>
                    <td style={{padding: '12px 16px', color: '#185FA5'}}>{f.num}</td>
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

  return (
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>

      {/* Topbar */}
      <div style={{background: 'white', borderBottom: '1px solid #eee', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{fontSize: '15px', fontWeight: '600', color: '#1a1a1a'}}>Clients</div>
        <button
          onClick={() => setShowForm(true)}
          style={{background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', cursor: 'pointer', fontWeight: '500'}}>
          + Nouveau client
        </button>
      </div>

      <div style={{flex: 1, overflowY: 'auto', padding: '24px'}}>

        {/* Formulaire nouveau client */}
        {showForm && (
          <div style={{background: 'white', borderRadius: '10px', border: '1px solid #eee', padding: '24px', marginBottom: '24px'}}>
            <div style={{fontSize: '14px', fontWeight: '600', marginBottom: '20px'}}>Nouveau client</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              {[
                { label: 'Nom / Raison sociale', placeholder: 'Cabinet Dupont & Associés' },
                { label: 'SIRET', placeholder: '552 144 848 00021' },
                { label: 'Email', placeholder: 'contact@cabinet.fr' },
                { label: 'Téléphone', placeholder: '+33 1 42 36 58 90' },
                { label: 'Adresse', placeholder: '12 rue de la Paix' },
                { label: 'Ville', placeholder: 'Paris 75008' },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>{f.label}</label>
                  <input type="text" placeholder={f.placeholder} style={{width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box'}} />
                </div>
              ))}
            </div>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '6px'}}>Type de client</label>
              <select style={{padding: '9px 12px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none'}}>
                <option>Cabinet</option>
                <option>PME</option>
                <option>TPE</option>
              </select>
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
              <button onClick={() => setShowForm(false)} style={{padding: '9px 18px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'}}>Annuler</button>
              <button style={{padding: '9px 18px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '500'}}>Enregistrer</button>
            </div>
          </div>
        )}

        {/* Liste clients */}
        <div style={{background: 'white', borderRadius: '10px', border: '1px solid #eee', overflow: 'hidden'}}>
          <div style={{padding: '14px 20px', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: '600'}}>
            Tous les clients ({clients.length})
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
            <thead>
              <tr style={{background: '#f9f9f9'}}>
                {['Client', 'SIRET', 'Email', 'Ville', 'Type', 'Factures', 'CA total', 'Actions'].map((h, i) => (
                  <th key={i} style={{padding: '10px 16px', textAlign: 'left', fontSize: '11px', color: '#888', fontWeight: '500'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} style={{borderTop: '1px solid #f0f0f0'}}>
                  <td style={{padding: '12px 16px', fontWeight: '500', color: '#1a1a1a'}}>{c.nom}</td>
                  <td style={{padding: '12px 16px', color: '#888', fontSize: '12px'}}>{c.siret}</td>
                  <td style={{padding: '12px 16px', color: '#888'}}>{c.email}</td>
                  <td style={{padding: '12px 16px', color: '#888'}}>{c.ville}</td>
                  <td style={{padding: '12px 16px'}}>
                    <span style={{background: typeColors[c.type].bg, color: typeColors[c.type].color, padding: '3px 8px', borderRadius: '99px', fontSize: '11px', fontWeight: '500'}}>{c.type}</span>
                  </td>
                  <td style={{padding: '12px 16px', color: '#888'}}>{c.factures}</td>
                  <td style={{padding: '12px 16px', fontWeight: '500'}}>{c.ca}</td>
                  <td style={{padding: '12px 16px'}}>
                    <button
                      onClick={() => setSelectedClient(c)}
                      style={{background: 'none', border: '1px solid #ddd', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer', color: '#555'}}>
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

export default Clients;