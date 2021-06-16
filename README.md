<h1 align="center">
  <img alt="Logo" src="./public/image/logotype.png" width="500px">

<h3 align="center">
  An API made in NodeJS for Vitto Mini Bank Project.
</h3>

<p align="center">The best way to store your financial expenses!</p>

<p align="center">

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/dvargas42/vitto-minibank-api?color=blue">

  <a href="https://www.linkedin.com/in/daniel-santos-040983ab/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Daniel%20Vargas-blue">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/dvargas42/vitto-minibank-api?color=blue">

  <a href="https://github.com/dvargas42/vitto-minibank-api/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/dvargas42/vitto-minibank-api?color=blue">
  </a>

  <a href="https://github.com/dvargas42/vitto-minibank-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/dvargas42/vitto-minibank-api?color=blue">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/dvargas42/vitto-minibank-api?color=blue">
</p>



<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-screnshots">Screenshots</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 💇🏼 About the project

This app was part of a challenge to test the ability to implement features in an API built with NodeJS. Among the applied knowledge are: creation of routes, creation of middlewares, creation of global error objects, creation of authentication routes using JWT, creation of business rules that were divided into services, among others.

## 📸 Sreenshots

Images of the application in operation.

<p align="center">
<img alt="ScreenShot01" src="https://res.cloudinary.com/dvargas42/image/upload/v1623880814/vitto-minibank/vitto-bank1_u3m45l.png" width="400px">
<img alt="ScreenShot01" src="https://res.cloudinary.com/dvargas42/image/upload/v1623880813/vitto-minibank/vitto-bank2_tvlohe.png" width="400px">
</p>


## 🚀 Technologies

Technologies that I used to develop this web application


- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Type ORM](https://typeorm.io/#/)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://jwt.io/)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [UUID V4](https://www.npmjs.com/package/uuidv4)
- [Date FNS](https://date-fns.org/)

## 💻 Getting started

To run this application you will need to have Docker installed on your PC. However, no need to worry, at the root of this project we have a Dockerfile script that will create the DBMS with the necessary database. After that, just run the migrations and the tables will be created automatically. Below I leave a step-by-step to prepare your environment.

Attention, even after all this the database will be empty. If you want, you can download our front-end from this site or use a tool like Insomnia or Postmann to manipulate the routes.

### Requirements

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)


**Clone the project and access the folder**

```bash
$ git clone https://github.com/dvargas42/vitto-minibank-api.git
```

**Follow the steps below**

It will be necessary to create a database so that our api can persist the data

Make sure the Docker is installed with the following command:

```bash
$ docker version
```
If not, just install it using the links below.

For Windows and Mac:
- [Docker](https://docs.docker.com/desktop/)

For Linux:
-[Docker](https://docs.docker.com/engine/install/)

After that, enter command that will create a postgres Docker image already with vittobank database.

```bash
$ docker build -t my-postgres ./
```

Now run the Docker image created by specifying.

```bash
$ docker run -d --name vitto_bank -p 5432:5432 my-postgres
```

Make sure the Docker image is running with the command below

```bash
$ docker ps
```

If not, just type the command below to upload the container

```bash
$ docker start vitto_bank
```

And finally to create the tables just type the command below and the migrations will be run

```bash
$ yarn typeorm migration:run
# Well done, database is started!
```

**In another terminal tab or terminal window**

```bash
# Install the dependencies
$ yarn

# To finish, run the webapp 
$ yarn dev:server

```

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork dvargas42/vitto-minibank-api

```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd vitto-minibank-api

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m "My new feature"

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp;by Daniel Vargas 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/daniel-santos-040983ab/)