const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",//your database password
    database: "user"//your database name
})

module.exports = client
