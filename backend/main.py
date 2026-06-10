from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from typing import Optional
from auth import hash_password, verify_password, create_access_token, verify_token

# Configuration base de données
DATABASE_URL = "postgresql://postgres:invoya2026@localhost:5432/invoya"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI(title="Invoya API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# --- MODÈLES BASE DE DONNÉES ---

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    cabinet = Column(String)

class ClientDB(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    siret = Column(String)
    email = Column(String)
    tel = Column(String)
    ville = Column(String)
    type = Column(String)

class FactureDB(Base):
    __tablename__ = "factures"
    id = Column(Integer, primary_key=True, index=True)
    numero = Column(String)
    client = Column(String)
    date = Column(String)
    montant = Column(Float)
    statut = Column(String)

Base.metadata.create_all(bind=engine)

# --- MODÈLES PYDANTIC ---

class UserRegister(BaseModel):
    nom: str
    email: str
    password: str
    cabinet: str

class Client(BaseModel):
    nom: str
    siret: str
    email: str
    tel: str
    ville: str
    type: str

class Facture(BaseModel):
    numero: str
    client: str
    date: str
    montant: float
    statut: str

# --- HELPER ---

def get_current_user(token: str = Depends(oauth2_scheme)):
    email = verify_token(token)
    if email is None:
        raise HTTPException(status_code=401, detail="Token invalide")
    return email

# --- ROUTES AUTH ---

@app.get("/")
def root():
    return {"message": "Invoya API fonctionne ✅"}

@app.post("/register")
def register(user: UserRegister):
    db = SessionLocal()
    existing = db.query(UserDB).filter(UserDB.email == user.email).first()
    if existing:
        db.close()
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    db_user = UserDB(
        nom=user.nom,
        email=user.email,
        password=hash_password(user.password),
        cabinet=user.cabinet
    )
    db.add(db_user)
    db.commit()
    db.close()
    return {"message": "Compte créé avec succès ✅"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    user = db.query(UserDB).filter(UserDB.email == form_data.username).first()
    db.close()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    token = create_access_token({"sub": user.email, "nom": user.nom})
    return {"access_token": token, "token_type": "bearer", "nom": user.nom}

# --- ROUTES PROTÉGÉES ---

@app.get("/clients")
def get_clients(current_user: str = Depends(get_current_user)):
    db = SessionLocal()
    clients = db.query(ClientDB).all()
    db.close()
    return clients

@app.post("/clients")
def add_client(client: Client, current_user: str = Depends(get_current_user)):
    db = SessionLocal()
    db_client = ClientDB(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    db.close()
    return db_client

@app.get("/factures")
def get_factures(current_user: str = Depends(get_current_user)):
    db = SessionLocal()
    factures = db.query(FactureDB).all()
    db.close()
    return factures

@app.post("/factures")
def add_facture(facture: Facture, current_user: str = Depends(get_current_user)):
    db = SessionLocal()
    db_facture = FactureDB(**facture.dict())
    db.add(db_facture)
    db.commit()
    db.refresh(db_facture)
    db.close()
    return db_facture

@app.get("/dashboard")
def get_dashboard(current_user: str = Depends(get_current_user)):
    db = SessionLocal()
    factures = db.query(FactureDB).all()
    clients = db.query(ClientDB).all()
    db.close()
    total_ca = sum(f.montant for f in factures if f.statut == "Payée")
    total_impaye = sum(f.montant for f in factures if f.statut == "En attente")
    return {
        "ca_mois": total_ca,
        "factures_emises": len(factures),
        "impayes": total_impaye,
        "clients_actifs": len(clients)
    }

@app.post("/init-data")
def init_data():
    db = SessionLocal()
    if db.query(ClientDB).count() > 0:
        db.close()
        return {"message": "Données déjà initialisées"}
    clients = [
        ClientDB(nom="Cabinet Dupont & Associés", siret="552 144 848 00021", email="contact@dupont.fr", tel="+33 1 42 36 58 90", ville="Paris 75008", type="Cabinet"),
        ClientDB(nom="SAS Technova", siret="481 234 567 00018", email="compta@technova.fr", tel="+33 1 55 23 14 78", ville="Paris 75008", type="PME"),
        ClientDB(nom="SARL Bâtiplus", siret="392 876 543 00032", email="direction@batiplus.fr", tel="+33 4 72 18 36 90", ville="Lyon 69002", type="PME"),
    ]
    factures = [
        FactureDB(numero="FA-2026-0047", client="Cabinet Dupont", date="27/05/2026", montant=3200, statut="Payée"),
        FactureDB(numero="FA-2026-0046", client="SAS Technova", date="25/05/2026", montant=1850, statut="En attente"),
        FactureDB(numero="FA-2026-0045", client="SARL Bâtiplus", date="22/05/2026", montant=5600, statut="Payée"),
        FactureDB(numero="FA-2026-0044", client="Auto-ent. Leroy", date="20/05/2026", montant=420, statut="En attente"),
    ]
    for c in clients:
        db.add(c)
    for f in factures:
        db.add(f)
    db.commit()
    db.close()
    return {"message": "Données initialisées ✅"}