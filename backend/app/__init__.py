from flask import Flask
from flask_sqlalchemy import SQLALchemy
from flask_migrate import Migrate 
from dotenv import load_dotenv
import os

db = SQLALchemy()
migrate = Migrate()

def create_app():
	 load_dotenv()
	 
	 app = Flask(__name__)
	 app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
	 app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
	 app.config['SECRETE_KEY'] = os.getenv('SECRETE_KEY', 'default_key')
	 
	 db.init_app(app)
	 migrate.init_app(app, db)
	 
	 # Register Blueprints
	 from app.routes.employee_routes import employee_bp
	 app.register_blueprint(employee_bp, url_prefix='api/employees')
	 
	 return app
	 