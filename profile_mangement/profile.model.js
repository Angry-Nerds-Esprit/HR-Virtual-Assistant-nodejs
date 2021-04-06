var mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const Mixed = mongoose.Schema.Types.Mixed;

const schema = new Schema({
  accomplishments: {
    certifications: {
      type: Array
    },
    courses: {
      type: Array
    },
    honors: {
      type: Array
    },
    languages: {
      type: Array
    },
    organizations: {
      type: Array
    },
    patents: {
      type: Array
    },
    projects: {
      type: Array
    },
    publications: {
      type: Array
    },
    test_scores: {
      type: Array
    }
  },
  experiences: {
    education: {
      type: Array
    },
    jobs: {
      type: [
        Mixed
      ]
    },
    volunteering: {
      type: Array
    }
  },
  interests: {
    type: [
      String
    ]
  },
  personal_info: {
    company: {
      type: Mixed
    },
    connected: {
      type: Mixed
    },
    current_company_link: {
      type: String
    },
    email: {
      type: Mixed
    },
    followers: {
      type: String
    },
    headline: {
      type: String
    },
    image: {
      type: String
    },
    location: {
      type: String
    },
    name: {
      type: String
    },
    phone: {
      type: Mixed
    },
    school: {
      type: Mixed
    },
    summary: {
      type: String
    },
    websites: {
      type: [
        String
      ]
    }
  },
  recommendations: {
    given: {
      type: [
        Mixed
      ]
    },
    received: {
      type: [
        Mixed
      ]
    }
  },
  skills: {
    type: [
      Mixed
    ]
  },
  idFolder: {
    type: [
      String
    ]
  },
  idUser: {
    type: [
      String
    ]
  }
});
mongoose.model('profile', schema);

module.exports = mongoose.model('profile');