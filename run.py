from api import create_app
from dotenv import load_dotenv
import os

# load env variables
load_dotenv(verbose=True)

# initialise the create_app() with a variable
app = create_app()

if __name__ == '__main__':
    # use the variable to run the app
    app.run()
