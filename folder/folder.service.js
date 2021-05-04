const db = require('_helpers/db');

const Folder = db.Folder;


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};





async function getAll() {
    return await Folder.find();
}

async function getById(id) {
    return await Folder.findById(id);
}

async function create(folderParam) {
    const folder = new Folder(folderParam);
    // validate

    if (await Folder.findOne({ folderName: folderParam.folderName })) {
        throw 'folderName "' + folderParam.folderName + '" exist already';
    }
    // save Folder
    
    await folder.save(function(err,folderp) {
        folder.id=folderp.id
     });
    return  folder
}

async function update(id, folderParam) {
    const folder = await Folder.findById(id);

    // validate
    if (!folder) throw 'Folder not found';
    if (folder.profilename !== folderParam.folderName && await Folder.findOne({ folderName: folderParam.folderName })) {
        throw 'profilename "' + folderParam.folderName + '" exist already';
    }

    // copy folderParam properties to Folder
    Object.assign(folder, folderParam);
    await folder.save();
}

async function _delete(id) {
    await Folder.findByIdAndRemove(id);
}