## Backend vacay offers - python flask app

In the project directory run;

### pipenv shell

This creates a virtual environment for the python flask app
You don't require a requirements file if you are using [Pipenv](https://docs.pipenv.org/en/latest/) for your dev environment. To install the variables run `pipenv install`, this will install the modules in Pipfile.lock

### pip install -r requirements.txt

This command is for those using other environments such as [virtualenv](https://virtualenv.pypa.io/en/latest/) and the requirements.txt file is provided

## export FLASK_APP=api

In your terminal where you have opened the app and the environment, run the command above to tell flask where the app is located

### export FLASK_DEBUG=1

Still in your terminal run the command to set debug mode to true

### flask run

This command will run you application in debug mode.

### Using wsgi server

For this the wsgi server of choice is gunicorn. To run gunicorn, you only need to call gunicorn and specify the application. Example `gunicorn run:app`, run is our application server script and app is the gunicorn app. So you are setting our app as gunicorn app

### Using a script file to run the up

In order to use this just write a create a script file `start.sh` in the root directory and add the command that run the application. For example using flask run method the script file will be as follows
`export FLASK_APP=myapp export FLASK_ENV='development' flask run --host=0.0.0.0 --port='you dev server port'`

To make the `.sh` file executable in terminal run the following command `chmod a+rx <myscript.sh>`
