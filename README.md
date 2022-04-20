# Overview

Grammr is a Flickr clone that allows users to upload pictures that relate to grammar and punctuation. It was inspired (and contains) many of the pages from my all-ages webcomic The Punctuators: Super-Powered Punctuation.

## Website Structure

Grammr uses a React frontend with a Flask backend; it uses PostGreSQL as a database. Grammr also incorporates AWS S3(Amazon Web Services Simple Storage Service) to allow users to upload images from their devices.

## Software used

### Frontend

* React
* Redux
* Javascript
* HTML
* CSS

### Backend

* Flask
* Python
* PostgreSQL
* SQLAlchemy

### API
* Amazon Web Services S3

## Grammr setup

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/exclaMachine/Grammr.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the .env.example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
