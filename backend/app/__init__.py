# Backend/app/__init__.py

import os 
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv 

# Load environment variables early
load_dotenv()

# Initialize extensions 
db = SQLAlchemy()
migrate = Migrate()
    
 def register_blueprint(app):
    """Register all app blueprint here."""
    from app.routes.employee_routes import employee_bp
    app.register_blueprint(employee_bp, url_prefix="/api/employees")
    
    # Add other blueprint as needed here 
    
def setup_logging(app):
    log_level = logging.DEBUG if app.config["ENV"] == "development" else logging.INFO
    logging.basicConfig(level=log_level, format="%(levelname)s:%(name)s:%(message)s")
    logger.info(f"Starting app is in {app.config['ENV']} mode")
    logger.info(f"Database: {app.config['SQLALCHEMY_DATABASE_URI']}")
   
def create_app():
    """Application factory function"""
    
    app = Flask(__name__)
    
    # Load configuration
    config_name = os.getenv('FLASK_ENV', 'development')
    config_module = f"app.config.{config_name.capitalize()}Config"
    app.config.form_object(config_module)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Import models so alembic can detect them
    from app import models
    
    # Register Blueprints
    register_blueprint(app)
    
    # Setup logging 
    setup_logging(app)
    
    return app
