import React, { useState, useEffect } from "react";
import folderDataService from "../../services/FolderService";
import { Link ,useHistory } from "react-router-dom";
import Fuse from 'fuse.js';
import Addfolder from "./AddFolder";



const FoldersList = () => {
  const history = useHistory();

  const [folders, setfolders] = useState([]);
  const [currentfolder, setCurrentfolder] = useState(null);
  const [addForm, setaddForm] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchFolderName, setSearchFolderName] = useState("");
  const fuse = new Fuse(folders, {
    keys: [
      'folderName',
      'description',
      
    ],includeScore: true
  })
  useEffect(() => {
    retrievefolders();
    
  }, []);

  const onChangeSearchFolderName = e => {
    const searchFolderName = e.target.value;
    setSearchFolderName(searchFolderName);
    console.log(fuse.search(searchFolderName))
    const result = searchFolderName ? fuse.search(searchFolderName).map(character => character.item) : retrievefolders();
    setfolders( result)

  };

  const retrievefolders = () => {
    folderDataService.getAll()
      .then(response => {
        setfolders(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievefolders();
    setCurrentfolder(null);
    setCurrentIndex(-1);
  };

  const setActivefolder = (folder, index) => {
    setaddForm(false);
    setCurrentfolder(folder);
    setCurrentIndex(index);
  };


  const   handleOnSubmit = (id) => {
 
    history.push(`folder/${id}`);
  }

  const findByFolderName = () => {
    folderDataService.findByFolderName(searchFolderName)
      .then(response => {
        setfolders(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const toggleAddForm =()=>{
    setActivefolder(false )
    setaddForm(true);


  }
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by FolderName"
            value={searchFolderName}
            onChange={onChangeSearchFolderName}
          />
          <div className="input-group-append">

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByFolderName}
            >
              Search
            </button>
                      {/*

                        <Link
              to={"folder/" + currentfolder._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
                      */}
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => toggleAddForm()}
              title="add folder"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <h4>folders List</h4>

        <div className="folder-container">
          {folders &&
            folders.map((folder, index) => (
              <div key={index}
                className={
                  "floder " + (index === currentIndex ? "floderselected" : "")
                }
                onClick={() => setActivefolder(folder, index)}
                onDoubleClick={()=>handleOnSubmit(folder._id)}
              >
              <img
                src={require("assets/folder-15.png").default}
                alt="..."
              />
              <p>{folder.folderName}</p>
              

              
              </div>
            ))}
        </div>


      </div>
      <div className="col-md-3">
        {currentfolder &&
          <div>
            <h4>folder</h4>
            <div>
              <label>
                <strong>FolderName:</strong>
              </label>{" "}
              {
                currentfolder.folderName
              
              }
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentfolder.description}
            </div>
            <div>
              <label>
                <strong>requete:</strong>
              </label>{" "}
              {currentfolder.requete }
            </div>

            <Link
              to={"folder/" + currentfolder._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
         
        
        
          }{!currentfolder&&!addForm&&
          <div>
            <br />
            <p>Please click on a folder...</p>
          </div>
        }
        {addForm&&<Addfolder></Addfolder>

        }
      </div>
    </div>
  );
};

export default FoldersList;
