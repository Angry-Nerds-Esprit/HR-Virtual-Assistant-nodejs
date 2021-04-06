


const express = require('express');
const router = express.Router();
const profileService = require('./profile.service');

// routes

router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.put('/addfloder/:id/:idFolder', addToFolder);
router.put('/removreFolder/:id/:idFolder', removreFromfolder);



module.exports = router;


function add(req, res, next) {
    profileService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    profileService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}



function getById(req, res, next) {
    profileService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    profileService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function addToFolder(req, res, next) {
    profile= profileService.addtofolder(req.params.id,req.params.idFolder,req.body)
    
    console.log(req.body)
    return update(req,res,next)
}

function removreFromfolder(req, res, next) {
    profile= profileService.removeFromFolder(req.params.id,req.params.idFolder,req.body)
    
    console.log(req.body)
    return update(req,res,next)
}


function _delete(req, res, next) {
    profileService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}