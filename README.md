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
You may need to modify `/task_manager_backend/db_config.js` to match the configuration of your DB.

```JavaScript
module.exports = {
    db_name: 'tasks_db',
    user: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    table_name: 'tasks',
    
    express_port: '3000'
}
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
