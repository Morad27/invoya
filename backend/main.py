from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Invoya API", version="1.0.0")

# Autoriser React à communiquer avec le serveur
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route de test
@app.get("/")
def root():
    return {"message": "Invoya API fonctionne ✅"}

# --- CLIENTS ---
clients = [
    {"id": 1, "nom": "Cabinet Dupont & Associés", "siret": "552 144 848 00021", "email": "contact@dupont.fr", "tel": "+33 1 42 36 58 90", "ville": "Paris 75008", "type": "Cabinet"},
    {"id": 2, "nom": "SAS Technova", "siret": "481 234 567 00018", "email": "compta@technova.fr", "tel": "+33 1 55 23 14 78", "ville": "Paris 75008", "type": "PME"},
    {"id": 3, "nom": "SARL Bâtiplus", "siret": "392 876 543 00032", "email": "direction@batiplus.fr", "tel": "+33 4 72 18 36 90", "ville": "Lyon 69002", "type": "PME"},
]

@app.get("/clients")
def get_clients():
    return clients

@app.post("/clients")
def add_client(client: dict):
    client["id"] = len(clients) + 1
    clients.append(client)
    return client

# --- FACTURES ---
factures = [
    {"id": 1, "numero": "FA-2026-0047", "client": "Cabinet Dupont", "date": "27/05/2026", "montant": 3200, "statut": "Payée"},
    {"id": 2, "numero": "FA-2026-0046", "client": "SAS Technova", "date": "25/05/2026", "montant": 1850, "statut": "En attente"},
    {"id": 3, "numero": "FA-2026-0045", "client": "SARL Bâtiplus", "date": "22/05/2026", "montant": 5600, "statut": "Payée"},
    {"id": 4, "numero": "FA-2026-0044", "client": "Auto-ent. Leroy", "date": "20/05/2026", "montant": 420, "statut": "En attente"},
]

@app.get("/factures")
def get_factures():
    return factures

@app.post("/factures")
def add_facture(facture: dict):
    facture["id"] = len(factures) + 1
    factures.append(facture)
    return facture

# --- DASHBOARD ---
@app.get("/dashboard")
def get_dashboard():
    total_ca = sum(f["montant"] for f in factures if f["statut"] == "Payée")
    total_impaye = sum(f["montant"] for f in factures if f["statut"] == "En attente")
    return {
        "ca_mois": total_ca,
        "factures_emises": len(factures),
        "impayes": total_impaye,
        "clients_actifs": len(clients)
    }