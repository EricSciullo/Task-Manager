var express = require('express')
var router = express.Router()
const Sequelize = require('sequelize')

const db = {}

// Modify this to match the configuration of your MySQL DB
// new Sequelize(db name, user, password)
const sequelize = new Sequelize('tasks_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
})

db.sequelize = sequelize

task = db.sequelize.define(
    // Table name
    'tasks',
    // Table structure
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.CHAR
        },
        completed: {
            type: Sequelize.TINYINT
        }
    },
    {
        timestamps: false
    }
)

// Get all tasks
router.get('/api/get_tasks', (req, res) => {
    task.findAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// Add task
router.post('/api/task_add', (req, res) => {
    if (!req.body.name) {
        res.status(400)
        res.json({
            error: 'Task Name cannot be NULL'
        })
    } else {
        task.create(req.body)
            .then(() => {
                res.send('Task added')
            })
            .catch(err => {
                res.send('Error: ' + err.response.data.error)
            })
    }
})

// Delete task
router.delete('/api/task_del/:id', (req, res) => {
    task.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send('Task deleted')
        })
        .catch(err => {
            res.send('error: ' + err.response.data.error)
        })
})

// Update name of task or if it is completed
router.put('/api/task_update/:id', (req, res) => {
    if (!req.body.name && req.body.completed != 0 && req.body.completed != 1) {
        res.status(400)
        res.json({
            error: 'Task Name cannot be NULL'
        })
    } else {
        if (req.body.name){
        task.update(
            { name: req.body.name },
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send('Task updated')
            })
            .error(err => res.send(err))
        }
        if (req.body.completed === 1 || req.body.completed === 0){
            task.update(
                { completed: req.body.completed },
                { where: { id: req.params.id } }
            )
                .then(() => {
                    res.send('task Updated!')
                })
                .error(err => res.send(err.response.data.error))
            }
    }
})

module.exports = router
