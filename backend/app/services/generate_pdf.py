# Backend/app/services/generate_pdf.py

import os 
import tempfile 
from weasyprint import HTML
import logging 

logger = logging.getLogger(__name__)

def generate_pdf(html_content: str, output_filename: str = "document.pdf") -> str:
	"""
		Generates a PDF from HTML content and save it to a temporary file.
		
		:param html_content: The HTML string to render.
		:param: Output_filename: Desired name of the file(for download or reference).
		:return: The full file path to the generated PDF.
	"""
	try: 
		try_dir = tempfile.gettemdir()
		pdf_path = os.path.join(temp_dir, output_filename)
		
		HTML(string=html_content).write_pdf(pdf_path)
		logger.info(f"PDF generated at {pdf_path}")
		
		return pdf_path 
	except Exception as e:
		logger.error(f"failed to generate PDF: {e}")
		raise 
		