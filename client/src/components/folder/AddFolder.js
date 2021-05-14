import React, { useState } from "react";
import folderDataService from "../../services/FolderService";
import { useSelector } from "react-redux";

const Addfolder = () => {
  const initialfolderstate = {
    _id: null,
    description:"",
    folderName: "",
    requete: "",
    userid: ""
  };
  const user = useSelector((state) => state.authentication.user);

  const [folder, setfolder] = useState(initialfolderstate);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(folder)
    setfolder({ ...folder, [name]: value });
  };

  const savefolder = () => {
    var data = {
      folderName: folder.folderName,
      description: folder.description,
      requete:folder.requete,
      userid:user.id
    };


    folderDataService.create(data)
      .then(response => {
        setfolder({
          id: response.data._id,
          folderName: response.data.folderName,
          description: response.data.description,
          requete:response.data.requete,
          userid:response.data.userid
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      window.location.reload(false);


  };

  const newfolder = () => {
    setfolder(initialfolderstate);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newfolder}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="folderName">folderName</label>
            <input
              type="text"
              className="form-control"
              id="folderName"
              required
              value={folder.folderName}
              onChange={handleInputChange}
              name="folderName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="requete">requete</label>
            <input
              type="text"
              className="form-control"
              id="requete"
              required
              value={folder.requete}
              onChange={handleInputChange}
              name="requete"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={folder.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>



          <button onClick={savefolder} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Addfolder;
