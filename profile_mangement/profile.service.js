const db = require('_helpers/db');
const Profile = db.Profile;


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Profile.find();
}

async function getById(id) {
    return await Profile.findById(id);
}

async function create(profileParam) {
    const profile = new Profile(profileParam);
    // validate
    if (await Profile.findOne({ userProfile: profileParam.userProfile })) {
        throw 'profilename "' + profileParam.userProfile + '" exist already';
    }

    // save profile
    
    await profile.save();
}

async function update(id, profileParam) {
    const profile = await Profile.findById(id);

    // validate
    if (!profile) throw 'profile not found';
    if (Profile.profilename !== profileParam.profilename && await Profile.findOne({ profilename: profileParam.profilename })) {
        throw 'profilename "' + profileParam.profilename + '" exist already';
    }

    // copy profileParam properties to profile
    Object.assign(profile, profileParam);

    await Profile.save();
}

async function _delete(id) {
    await Profile.findByIdAndRemove(id);
}