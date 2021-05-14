import React, { useState,useEffect } from "react";
import rdvDataService from "../../services/rdvService";
import { useSelector } from "react-redux";
import ProfileService from "services/ProfileService";

const Addrdv = (props) => {
  const initialrdvstate = {
    _id: null,
    rdvDate:"",
    note: "",
    name: "",
    userid: "",
    candidateName:"",
    profileId:""
  };
  const [rdv, setrdv] = useState(initialrdvstate);
  const [submitted, setSubmitted] = useState(false);
  const [profile, setProfile] = useState();

  const user = useSelector((state) => state.authentication.user);
  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(rdv)
    setrdv({ ...rdv, [name]: value });
  };

  useEffect(() => {
      
    console.log(props.match.params.id)
     ProfileService.get(props.match.params.id)
      .then((response) => {
        setProfile(response.data);
        console.log(response.data)
        
      })
      .catch((e) => {
        console.log(e);
      });
    
  }, []);
  const saverdv = () => {
    var data = {
      rdvDate:rdv.rdvDate,
      note: rdv.note,
      name: rdv.name,
      candidateName:profile.personal_info.name,
      userid:user.id,
      profileId:profile._id
    };




    rdvDataService.create(data)
      .then(response => {
        setrdv({
          id: response.data._id,
          rdvDate:response.data.rdvDate,
          name: response.data.name,
          note: response.data.note,
          userid:response.data.userid,
          candidateName:response.data.candidateName,
          profileId:response.data.profileId
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newrdv = () => {
    setrdv(initialrdvstate);
    setSubmitted(false);
  };

  return (
    

    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newrdv}>
            Add
          </button>
        </div>
      ) : (
        profile&&<div>
          <div className="form-group">
            <label htmlFor="name">Name Your Appointment</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rdvDate">Date</label>
            <input
              type="Date"
              className="form-control"
              id="rdvDate"
              required
              onChange={handleInputChange}
              name="rdvDate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Note</label>
            <input
              type="text"
              className="form-control"
              id="note"
              required
              value={rdv.note}
              onChange={handleInputChange}
              name="note"
            />
          </div>
         
          <div className="form-group">
            <label htmlFor="candidateName">Candidate Name</label>
            <input
              type="text"
              className="form-control"
              id="candidateName"
              disabled
              value={profile.personal_info.name}
              required
              onChange={handleInputChange}
              name="candidateName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Position">Position</label>
            <input
              type="text"
              className="form-control"
              id="Position"
              disabled
              value={profile.personal_info.headline}
              required
              onChange={handleInputChange}
              name="Position"
            />
          </div>


          <div className="form-group">

            <input
              type="text"
              className="form-control"
              hidden="true"
              id="profileId"
              value={profile.id}
              required
              onChange={handleInputChange}
              name="profileId"
            />
          </div>

          


          <button onClick={saverdv} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  
  );
};

export default Addrdv;
