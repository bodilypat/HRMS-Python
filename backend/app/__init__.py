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

def create_app():
    """Application factory function"""
    
    app = Flask(__name__)
    
    # Configuration
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3')
    app.config['SQLALCHEMY_TRACK_MODIFICAIONS'] = False 
    app.config['SECRET_KEY'] = os.getenv['SECRET_KEY', 'default_key')
    
    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app) # Optional: allow cross-origin requests
    
    # Register Blueprints 
    register_blueprints(app)

    # Setup Logging
    setup_logging(app)
    
    # Log basic startup info 
    """ Register all application blueprints"""
    from app.routes.employee_routes import employee_bp
    app.register_blueprint(employee_bp, url_prefix='/api/employees')
    # Future: register more blueprint here 
    # from app.routes.department_routes import department_bp
    # app.register_blueprint(department_bp, url_prefix='/api/departments')
    
    def setup_logging(app):
        """Configure logging"""
        log_level = logging.DEBUG if app.config.get("ENV") == "development" else logging.INFO
        logging.basicConfig(level=log_level)
        logger = logging.getLogger(__name__)
        
        logger.info(f"Environment: {app.config.get('ENV', 'development')}")
        logger.ingo(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
        logger.info("Application initialzed successfully.")
        
        
    return app
    