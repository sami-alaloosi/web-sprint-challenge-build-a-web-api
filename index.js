require('dotenv').config()
const express = require('express')
const server = express()
const cors = require('cors')
const projectsRouter = require('./projects/projects-router')
// const actionsRouter = require("./actions/actions-router")


server.use(express.json())
server.use(cors())
server.use('/api/projects', projectsRouter)
// server.use('/api/actions', actionsRouter)

server.get('/', (req, res)=>{
    res.status(200).send(`<h1> API Works </h1>`)
})

const port = process.env.PORT || 4000
server.listen(port, ()=> console.log(`Server Listening On Server: ${port}`))