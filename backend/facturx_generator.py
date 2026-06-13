from xml.etree import ElementTree as ET
from datetime import datetime

def generate_factur_x(facture_data):
    """
    Génère une facture Factur-X (EN 16931) en XML
    """
    
    # Créer la racine XML
    root = ET.Element("Invoice", xmlns="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100")
    
    # ExchangedDocumentContext
    context = ET.SubElement(root, "ExchangedDocumentContext")
    ET.SubElement(context, "GuidelineSpecifiedDocumentContextParameter").text = "urn:cen.eu:en16931:2017"
    
    # ExchangedDocument
    doc = ET.SubElement(root, "ExchangedDocument")
    ET.SubElement(doc, "ID").text = facture_data.get("numero", "")
    ET.SubElement(doc, "TypeCode").text = "380"  # 380 = Invoice
    ET.SubElement(doc, "IssueDateTime").text = facture_data.get("date_emission", "")
    
    # SpecifiedMonetarySummation
    summary = ET.SubElement(root, "SpecifiedMonetarySummation")
    ET.SubElement(summary, "LineTotalAmount").text = str(facture_data.get("montant_ht", 0))
    ET.SubElement(summary, "TaxTotalAmount").text = str(facture_data.get("tva", 0))
    ET.SubElement(summary, "DuePayableAmount").text = str(facture_data.get("montant_ttc", 0))
    
    # SellerTradeParty (Invoya)
    seller = ET.SubElement(root, "SellerTradeParty")
    ET.SubElement(seller, "Name").text = "Invoya SAS"
    seller_id = ET.SubElement(seller, "ID")
    seller_id.set("schemeID", "FR:SIRET")
    seller_id.text = "12345678900012"
    
    seller_address = ET.SubElement(seller, "PostalTradeAddress")
    ET.SubElement(seller_address, "LineOne").text = "123 rue de l'Innovation"
    ET.SubElement(seller_address, "CityName").text = "Paris"
    ET.SubElement(seller_address, "PostcodeCode").text = "75008"
    ET.SubElement(seller_address, "CountryID").text = "FR"
    
    # BuyerTradeParty (Client)
    buyer = ET.SubElement(root, "BuyerTradeParty")
    ET.SubElement(buyer, "Name").text = facture_data.get("client_nom", "")
    
    buyer_id = ET.SubElement(buyer, "ID")
    buyer_id.set("schemeID", "FR:SIRET")
    buyer_id.text = facture_data.get("client_siret", "")
    
    buyer_address = ET.SubElement(buyer, "PostalTradeAddress")
    ET.SubElement(buyer_address, "LineOne").text = facture_data.get("client_adresse", "")
    ET.SubElement(buyer_address, "CityName").text = facture_data.get("client_ville", "")
    ET.SubElement(buyer_address, "CountryID").text = "FR"
    
    # Créer l'arborescence XML
    tree = ET.ElementTree(root)
    
    # Retourner le XML en bytes
    import io
    output = io.BytesIO()
    tree.write(output, encoding='UTF-8', xml_declaration=True)
    return output.getvalue()