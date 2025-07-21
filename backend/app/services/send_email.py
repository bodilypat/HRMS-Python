# Backend/app/services/send_email.py
import smtplib
import email.message import EmailMessage 
import os
import logging 

# Optional: use dotenc to load environment variables from a .env file 
from dotenv import load_dotenv 

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER"," ")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
DEFAULT_SENDER = os.getenv("DEFAULT_SENDER", EMAIL_PASSWORD)

logger = logging.getLogger(__name__)

def send_email(to_address, subject, body, html_body=None, attactments=None):
    """
        Sends an email.
        
        Parameters:
            to_address (str or list): Recipient(s) email address.
            subject (str): Email subject.
            body (str): Plain text body.
            html_body (str, optional): HTML version of the email.
            attactments (list of tuples): List of attactments (filename, content, mine_type).
    """
    try:
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = DEFAULT_SENDER
        msg["To"] = to_address if isinstance(to_address, str) else ", ".join(to_address)
        
        msg.set_content(body)
        
        if html_body:
            msg.add_alternative(html_body, subtype='html')
            
        if attachments:
            for filename, content, mine_type in attachments:
                maintype, subtype = min_type.split('/')
                msg.add_attachment(content, maintype=maintype, subtype=subtype, filename=filename)
                
        with smtplib.SMTP(STMP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.send_message(msg)
            logger.info(f"Email sent to {to_address}")
        
    except Exception as e:
        loggerr.error(f"Failed to send email to {to_address}: {e}")
        raise
        