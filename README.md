# Task Manager
A simple task managing application built with Node.js, Vue.js, and MySQL
<img src="https://github.com/EricSciullo/Task-Manager/blob/master/readme_images/example.gif?raw=true" width="60%">

### Requirements
----
A running MySQL database with the following configuration: 
DB name: `tasks_db`
Table name: `tasks`

Table structure:

![db config](https://github.com/EricSciullo/Task-Manager/blob/master/readme_images/db_config.png?raw=true)

[Node.js and NPM](https://nodejs.org/en/)

### Getting started
----
You may need to update `/task_manager_backend/router.js` to match the configuration of your DB.
```JavaScript
// Modify this to match the configuration of your MySQL DB
// new Sequelize(db name, user, password)
const sequelize = new Sequelize('tasks_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
})
```
If you configured your DB the same way I did, then you will likely just need to update `user` and `password`
You may also need to update the following part of `router.js` if you have a different table name
```JavaScript
task = db.sequelize.define(
    // Table name
    'tasks'
```
#### Back-end
```
cd task_manager_backend
npm i
npm start
```
You should see:
`Express server listening on port 3000`

#### Front-end
```
cd task_manager_frontend
npm i
npm start
```

You should see:
`Your application is running here: http://localhost:8080`

Everything is now up and running. Navigate to `http://localhost:8080` to see the running application.
