const express = require('express')
const db = require("../data/helpers/projectModel")
const router = express.Router()
const actionsRouter = require("../actions/actions-router")

// get all
router.get("/", (req, res)=>{
    db.get()
    .then((projects)=> res.status(200).json(projects))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

// get by ID
router.get("/:id", projectIdValidation, (req, res)=>{
    const {id} = req.params
    db.get(id)
    .then((project)=> res.status(200).json(project))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

// post project

router.post("/", projectBodyValidation, (req, res)=>{
    const newProject = req.body
    db.insert(newProject)
    .then((project)=> res.status(201).json(project))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

// update project

router.put("/:id", projectIdValidation, projectBodyValidation, (req, res) =>{
    const {id} = req.params
    const changes = req.body
    db.update(id, changes)
    .then((changed) => res.status(200).json(changed))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

// delete project

router.delete("/:id", projectIdValidation, (req, res )=> {
    const {id} = req.params
    db.remove(id)
    .then(()=> res.status(200).json(`you have deleted the record with the id: ${id}`) )
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
} )


// get actions by the project id

router.get('/:id/actions', projectIdValidation, (req, res)=>{
    const {id} = req.params
    db.getProjectActions(id)
    .then((actions)=> res.status(200).json(actions))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

//nested router for actions
router.use('/', actionsRouter)


// meddleware check for ID
function projectIdValidation (req, res, next){
    const {id} = req.params
    db.get(id)
    .then((project) =>{
        project ? next() : res.status(404).json({message: "Make sure to provied the Correct ID"})
    })
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
} 

function projectBodyValidation (req, res, next){
    req.body.name && req.body.description ? next() : res.status(400).json({message: "Make sure to provied name and description"})
}

module.exports = router