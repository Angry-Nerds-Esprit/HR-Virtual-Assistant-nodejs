


const express = require('express');
const router = express.Router();
const folderService = require('./folder.service');

// routes

router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

router.post('/addProfile/folderId/:folder/profileId/:profile',addProfile);
router.post('/removeProfile/folderId/:folder/profileId/:profile',removeProfile);


module.exports = router;

function addProfile(req,res,next){
 folderService.addProfile(req.params.folder,req.params.profile)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function removeProfile(req,res,next){
    folderService.removeProfile(req.params.folder,req.params.profile)
           .then(() => res.json({}))
           .catch(err => next(err));
   }

function add(req, res, next) {
    folderService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    folderService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}



function getById(req, res, next) {
    folderService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    folderService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    folderService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}