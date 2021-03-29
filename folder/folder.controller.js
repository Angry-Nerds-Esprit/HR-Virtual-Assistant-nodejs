


const express = require('express');
const router = express.Router();
const folderService = require('./folder.service');

// routes

router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);


module.exports = router;


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