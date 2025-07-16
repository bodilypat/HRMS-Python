# run.py

import os 
from app import create_app

env = os.getenv("FLASK_ENV", "development") # fallback to development
app = create_app()

if __name__ == "__name__":
	debug_mode = env == "development"
	app.run(host="0.0.0.0", port=5000, debug=debug_mode)