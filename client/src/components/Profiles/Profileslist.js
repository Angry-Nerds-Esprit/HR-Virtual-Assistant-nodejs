import React, { useState, useEffect, useRef, useReducer } from "react";
import ProfileService from "../../services/ProfileService";
import { Link } from "react-router-dom";
import "./Card.css";
import Popup from "react-animated-popup";
import { useParams } from "react-router-dom";
import AdvancedFilter from "./AdvancedFilter";
import { useHistory } from "react-router-dom";



const ProfilesList = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [folderId, setFolderId] = useState();
  const componentIsMounted = useRef(true);
  const history = useHistory();

  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      location: "",
      job: "",
    

    }
  );
  const filterProfiles = list => {
    return list.filter(item => {
      return (
        item.personal_info.name
          .toLowerCase()
          .includes(
              filterInput.name.toLowerCase()
          ) &&
        item.personal_info.location
          .toLowerCase()
          .includes(
              filterInput.location.toLowerCase()
          ) 
          
          &&
          item.personal_info.headline
          .toLowerCase()
          .includes(
              filterInput.job.toLowerCase()
          )         
       
          
      );
      
    });
  };

const profilesList = filterProfiles(profiles);

  const handleFilterProfiles= event => {
    const { name, value } = event.target;
    console.log(name,value);
    setFilterInput({ [name]: value });
    
};

  const buttonStyle = {
    backgroundColor: "cadetblue",
    color: "#fff",
    padding: 10,
    cursor: "pointer",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const pStyle = {
    textAlign: "center",
  };
  useEffect(() => {

    if (props.match.params.id)
    { 
      retrieveProfilesByFolder(props.match.params.id)

    }else{
      retrieveProfiles();
    }
  }, []);

const  handleClick = (id) =>  {
    history.push(`profile/${id}`);
  }

  const retrieveProfiles = () => {
    ProfileService.getAll()
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveProfilesByFolder = (id) => {
    ProfileService.getByFolder(id)
      .then((response) => {
        setProfiles(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveProfiles();
    setCurrentProfile(null);
    setCurrentIndex(-1);
  };

  const setActiveProfile = (profile, index) => {
    setCurrentProfile(profile);
    setCurrentIndex(index);
    setVisible(!visible);
  };

  

  return (
    <section id="team" className="pb-5">
        
        <AdvancedFilter  className="form-control"
        searchValue={filterInput}
        handleChangeValue={handleFilterProfiles}
      />
    

      <div className="row">
        <div className="container">
          <div className="row">
            {profilesList &&
              profilesList.map((profile, index) => (
                <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div className="box-part text-center">
                    <div className="font-icon-detail">
                      <i className="nc-icon nc-single-02" aria-hidden="true"></i>
                    </div>
                    <div className="title">
                      
                      <a  onClick={() => handleClick(profile._id)} href=""><h4>{profile.personal_info.name}</h4></a>
                    </div>

                    <div className="text">
                      <span>
                      <strong>{profile.personal_info.headline} </strong><br />
                        Location :  {profile.personal_info.location}
                      </span>
                    </div>

                    <a 
                      id="a"
                      href="#"
                      className={
                        "title " + (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveProfile(profile, index)}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
       
      </div>
      <Popup visible={visible} onClose={() => setVisible(false)}>
      <div className="container">

        <div id="scroll" className="row">
         
          {currentProfile ? (
            <div id="pop" className="row">
            
              <h4>
                <strong>Profile Information</strong>
              </h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProfile.personal_info.name}
              </div>
              <div>
                <label>
                  <strong>Company:</strong>
                </label>{" "}
                {currentProfile.personal_info.company}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentProfile.personal_info.location}
              </div>
              <div>
                <label>
                  <strong>Skills :</strong>
                </label>{" "}
                {currentProfile.skills.map((value) => (
                  <span> {value.name} , </span>
                ))}
              </div>
              <div>
            
                <div>
                  <b>Education :</b>
                  <br />

                  {currentProfile.experiences.education.map((value) => (
                    <span>
                      {" "}
                      University : {value.name} , date range :{" "}
                      {value.date_range}{" "}
                    </span>
                  ))}
                </div>
               
              </div>

              
            </div>
          ) : 
            <div>
              <br />
             
            </div>
          }
         
        </div>
        
      </div>
      </Popup>
    </section>
  );
};

export default ProfilesList;
