# Backend/app/__init__.py

import os 
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
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
    
    # Register Blueprints 
    from app.routes.employee_routes import employee_bp
    app.register_blueprint(employee_bp, url_prefix='/api/employees')
    
    # Log basic startup info 
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    logger.info(f"App started in {os.getenv('FLASK_ENV', 'development')} mode")
    logger.info(f"Database connected: {app.config['SQLALCHEMY_DATABASE_URI']}")
    
    return app
    