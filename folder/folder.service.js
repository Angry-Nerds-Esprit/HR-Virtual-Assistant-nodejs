const db = require('_helpers/db');

const Folder = db.Folder;
const Profile = db.Profile;


module.exports = {
    getAll,
    getById,
    create,
    update,
    addProfile,
    removeProfile,
    delete: _delete
};

async function removeProfile(folderId,profileId)
{
    const folder = await Folder.findById(folderId);
    const profile = await Profile.findById(profileId);

    // validate
    if (!folder) throw 'Folder not found';
    if (!profile) throw 'profile not found';

    // remove profile form  folder 
    var index = folder.profiles.indexOf(profileId);
    folder.profiles.splice(index,1)
    folder.save();

}

async function addProfile(folderId,profileId)
{
    const folder = await Folder.findById(folderId);
    const profile = await Profile.findById(profileId);

    // validate
    if (!folder) throw 'Folder not found';
    if (!profile) throw 'profile not found';

    //add profile
    folder.profiles.push(profile);
    folder.save();

}

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
    
    await folder.save();
}

async function update(id, folderParam) {
    const folder = await Folder.findById(id);

    // validate
    if (!folder) throw 'Folder not found';
    if (folder.profilename !== folderParam.folderName && await folder.findOne({ folderName: folderParam.folderName })) {
        throw 'profilename "' + folderParam.folderName + '" exist already';
    }

    // copy folderParam properties to Folder
    Object.assign(Folder, folderParam);

    await Folder.save();
}

async function _delete(id) {
    await Folder.findByIdAndRemove(id);
}