


const express = require('express');
const router = express.Router();
const rdvService = require('./rdv.service');

// routes

router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);




module.exports = router;


function add(req, res, next) {
    rdvService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    rdvService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}



function getById(req, res, next) {
    rdvService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    rdvService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    rdvService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}