## Authors

- [@Niharika K V](https://github.com/NIHARIKA983/fundooNotes)


## Tech Stack

**Server:** Node, Express


# FundooNotes Note Keeping App

FundooNote Application it is API based application which are using express framework, nodeJS engine, by this application we can save on note in the app and when we want we fetch all the notes which are existing. If anyone want to use this project in their system so follow the given mentioned steps:


## Installation
### Step: 1

Clone the repository in your system.

### Step: 2
Install given npm packages in your project to run it finely:
1.exprees using npm i install express.
2.do npm i in your terminal so whatever I've in my pacakge.json it will installed in you system

### Step: 3

localhost:3000/
cpoy the above link paste it in your browser before that run the project using nodemon start
```
````

## Features

- User Registration
- User login
- Note CRUD operation APIs
- Label CRUD operation APIs
- Add label to note
- Collaboration with user(sharing note with another user)
- Social login through google

```
````


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`: to connect with database

`PORT`: to run server on particular port number

`EMAIL`: to check nodemail are able to send email to the user for reset password link

`PASSWORD`: to take access of gmail account to send mail to the user for reset link

`SECRET_KEY`: to generate jwt token for user authentication

`GOOGLE_SECRET`: for passpost.authentication using google

`GOOGLE_CLIENT_ID`: for passpost.authentication using google

```
````


## Run Locally

Clone the project

```bash
  git clone https://github.com/NIHARIKA983/fundooNotes.git
```

Go to the project directory

```bash
  cd \Fundoo-Notes-app>
```

Install dependencies

```bash
  npm install 
```

Start the server

```bash
  npm run server
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```