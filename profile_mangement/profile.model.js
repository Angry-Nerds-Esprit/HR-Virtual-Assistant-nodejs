var mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const Mixed = mongoose.Schema.Types.Mixed;

const schema = new Schema({
    userProfile: {
      fullName: {
        type: String
      },
      title: {
        type: String
      },
      location: {
        city: {
          type: String
        },
        province: {
          type: String
        },
        country: {
          type: Mixed
        }
      },
      photo: {
        type: String
      },
      description: {
        type: Mixed
      },
      url: {
        type: String
      }
    },
    experiences: {
      type: [
        Mixed
      ]
    },
    education: {
      type: [
        Mixed
      ]
    },
    volunteerExperiences: {
      type: Array
    },
    skills: {
      type: [
        Mixed
      ]
    }
  });
mongoose.model('profile', schema);

module.exports = mongoose.model('profile');