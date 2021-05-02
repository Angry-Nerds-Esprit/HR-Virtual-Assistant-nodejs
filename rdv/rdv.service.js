const db = require('_helpers/db');

const RDV = db.Rdv;


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await RDV.find();
}

async function getById(id) {
    return await RDV.findById(id);
}

async function create(rdvParam) {
    const rdv = new RDV(rdvParam);
    // validate

    
    // save Folder
    
    await rdv.save();
}

async function update(id, rdvParam) {
    const rdv = await RDV.findById(id);

    // validate
    if (!rdv) throw 'RDV not found';
    if (rdv.profilename !== rdvParam.rdvName && await rdv.findOne({ rdvName: rdvParam.rdvName })) {
        throw 'profilename "' + rdvParam.rdvName + '" exist already';
    }

    // copy folderParam properties to Folder
    Object.assign(RDV, rdvParam);

    await rdv.save();
}

async function _delete(id) {
    await RDV.findByIdAndRemove(id);
}