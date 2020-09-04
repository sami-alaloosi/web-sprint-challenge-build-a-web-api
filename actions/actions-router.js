const express = require('express')
const db = require('../data/helpers/actionModel')
const router = express.Router()

//get all actions

router.get('/:pid/actions', (req, res)=>{
    db.get()
    .then((actions)=> res.status(200).json(actions))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

// get action by ID

router.get('/:pid/actions/:id', actionIdValidation, (req, res)=>{
    const {id} = req.params
    db.get(id)
    .then((action)=> res.status(200).json(action))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

// post new action

router.post("/:pid/actions", actionBodyValidation, (req, res) => {
    const newAction = req.body
    const {pid} = req.params
    projectId= {project_id: pid}
    const goodAction = Object.assign(newAction, projectId )
    db.insert(goodAction)
    .then((action)=> res.status(201).json(action))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
} )

// delete action

router.delete('/:pid/actions/:id', actionIdValidation, (req, res) => {
    const {id} = req.params
    db.remove(id)
    .then(()=> res.status(200).json(`you have deleted the record with the id: ${id}`))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
} )

// update action
router.put('/:pid/actions/:id' , actionIdValidation, actionBodyValidation, (req, res)=>{
    const {id} = req.params
    const changes = req.body
    db.update(id, changes)
    .then((changed) => res.status(200).json(changed))
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
})

// meddleware check for ID
function actionIdValidation (req, res, next){
    const {id} = req.params
    db.get(id)
    .then((action) =>{
        action ? next() : res.status(404).json({message: "Make sure to provied the Correct ID"})
    })
    .catch(()=> res.status(500).json({errorMessage: "Server Error"}))
} 

function actionBodyValidation (req, res, next){
    !req.body.notes || !req.body.description ?   res.status(400).json({message: "Make Sure To Provied the Notes and Description"}) : next()
}

module.exports = router