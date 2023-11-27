
# Polling Api

A Polling api in nodejs, express mysql, jwt,bcrypt and winston. For api documentation swagger. For api testing postman

* NOTE
    - POSTMAN  collection file is in project directory please clone it to test api
    - Database setup file is also there in project directory please souce it to create required database


## Run Locally

Clone the project

```bash
git clone https://github.com/tusharajmer-op/polling_app.git
```

Go to the project directory

```bash
cd polling_app
```

Install dependencies

```bash
npm install
```
start your my sql server and login

```bash
mysql -u root -p
```
source the mysql script (if you want to change user name and password change in this file)
```bash
source <path/database_setup.sql>
```
create a .env file and add the following detail accordingly
(This project contains .env in code files change it if needed)
```bash
enviornment = "dev"
DBUSERNAME = 'polling_app'
DBDATABASE = 'polling_app'
DBPASSWORD = '12345'
DBPORT = 3306
DBHOST = '127.0.0.1'
PORT = 3765
```

Start the server

```bash
npm start
```
Logs can be seen in logs file under the project directory


## More

For api documentation 
```bash
https://app.swaggerhub.com/apis/TMAJMER/polling_api/1.0.0
```

also postman collection can be found in project directory
```bash
polling_app.postman_collection.json
```

