from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
import io

def generate_facture_pdf(facture_data):
    """
    Génère une facture PDF
    """
    
    try:
        # Créer un buffer en mémoire
        buffer = io.BytesIO()
        
        # Créer le document PDF
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        styles = getSampleStyleSheet()
        story = []
        
        # En-tête
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#185FA5'),
            spaceAfter=30,
        )
        title = Paragraph("FACTURE", title_style)
        story.append(title)
        
        # Infos facture
        facture_info = f"""
        <b>Numéro :</b> {facture_data.get('numero', '')}<br/>
        <b>Date :</b> {facture_data.get('date_emission', '')}<br/>
        <b>Échéance :</b> {facture_data.get('date_echeance', '')}<br/>
        """
        story.append(Paragraph(facture_info, styles['Normal']))
        story.append(Spacer(1, 0.3*inch))
        
        # Client
        client_info = f"""
        <b>Client :</b> {facture_data.get('client_nom', '')}<br/>
        <b>SIRET :</b> {facture_data.get('client_siret', '')}<br/>
        <b>Email :</b> {facture_data.get('client_email', '')}<br/>
        <b>Adresse :</b> {facture_data.get('client_adresse', '')} {facture_data.get('client_ville', '')}<br/>
        """
        story.append(Paragraph(client_info, styles['Normal']))
        story.append(Spacer(1, 0.5*inch))
        
        # Tableau des montants
        data = [
            ['Montant HT', f"{facture_data.get('montant_ht', 0):.2f} €"],
            ['TVA (20%)', f"{facture_data.get('tva', 0):.2f} €"],
            ['TOTAL TTC', f"{facture_data.get('montant_ttc', 0):.2f} €"],
        ]
        
        table = Table(data, colWidths=[3*inch, 2*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f5f5f5')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#185FA5')),
            ('ALIGN', (0, 0), (-1, -1), 'RIGHT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))
        
        story.append(table)
        story.append(Spacer(1, 0.5*inch))
        
        # Footer
        footer = """
        <b>Conforme Factur-X 2026</b><br/>
        Cette facture a été générée par Invoya
        """
        story.append(Paragraph(footer, styles['Normal']))
        
        # Construire le PDF
        doc.build(story)
        
        # Retourner le contenu
        buffer.seek(0)
        return buffer.getvalue()
        
    except Exception as e:
        print(f"Erreur PDF : {e}")
        return None