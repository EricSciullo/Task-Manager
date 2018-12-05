var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')
const db_config = require('./db_config')
var cors = require('cors')

var port = db_config.express_port

var express_app = express()
express_app.use(cors())
express_app.use(bodyParser.json())
express_app.use(bodyParser.urlencoded({ extended: false }))
express_app.use('', router)

express_app.listen(port, function () {
    console.log('Express server listening on port ' + port)
})
