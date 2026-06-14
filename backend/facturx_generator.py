from xml.etree import ElementTree as ET
from datetime import datetime

def generate_factur_x(facture_data):
    """
    Génère une facture Factur-X simple en XML
    """
    
    try:
        # Créer la racine XML
        root = ET.Element("Invoice")
        
        # Numéro
        num_elem = ET.SubElement(root, "Numero")
        num_elem.text = str(facture_data.get("numero", ""))
        
        # Date
        date_elem = ET.SubElement(root, "Date")
        date_elem.text = str(facture_data.get("date_emission", ""))
        
        # Client
        client_elem = ET.SubElement(root, "Client")
        client_nom = ET.SubElement(client_elem, "Nom")
        client_nom.text = str(facture_data.get("client_nom", ""))
        
        client_siret = ET.SubElement(client_elem, "SIRET")
        client_siret.text = str(facture_data.get("client_siret", ""))
        
        # Montants
        montants = ET.SubElement(root, "Montants")
        
        ht = ET.SubElement(montants, "HT")
        ht.text = str(facture_data.get("montant_ht", 0))
        
        tva = ET.SubElement(montants, "TVA")
        tva.text = str(facture_data.get("tva", 0))
        
        ttc = ET.SubElement(montants, "TTC")
        ttc.text = str(facture_data.get("montant_ttc", 0))
        
        # Convertir en bytes
        xml_string = ET.tostring(root, encoding='UTF-8')
        return xml_string
        
    except Exception as e:
        print(f"Erreur : {e}")
        return None