import React, { useState, useEffect } from "react";
import FolderDataService from "../../services/FolderService";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import NotificationAlert from "react-notification-alert";

import ProfilesList from "components/Profiles/Profileslist";

const Folder = (props) => {
  const notificationAlertRef = React.useRef(null);

  const initialFolderState = {
    id: null,
    folderName: "",
    description:"",
    requete: "",
    userid: "",
  };

  const [currentFolder, setCurrentFolder] = useState(initialFolderState);
  const [message, setMessage] = useState("");
  const notify = (place ,typee) => {
    var color=1
    var options = {};
    if (typee=="update"){
      color=4
      
      options = {
        place: place,
        message: (
          <div>
          <div>
            folder <b>updated</b> - a beautiful
            freebie for every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
  }
  if (typee=="remove"){
    color=3
      
    options = {
      place: place,
      message: (
        <div>
        <div>
          folder <b>removed</b> - a beautiful
          freebie for every web dr.evelope
        </div>
      </div>
    ),
    type: type,
    icon: "nc-icon nc-bell-55",
    autoDismiss: 7,
  };
  }
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
  
  
    notificationAlertRef.current.notificationAlert(options);
  };

  const getFolder = (id) => {
    FolderDataService.get(id)
      .then((response) => {
        setCurrentFolder(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFolder(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFolder({ ...currentFolder, [name]: value });
  };



  const updateFolder = () => {
    FolderDataService.update(currentFolder._id, currentFolder)
      .then((response) => {
        console.log(response.data);
        notify("tc","update")
        setMessage("The Folder was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFolder = () => {
    FolderDataService.remove(currentFolder._id)
      .then((response) => {
        console.log(response.data);
        notify("tc","remove")
        props.history.push("/admin/folder");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
          <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col md="9">

            <ProfilesList {...props} />

          </Col>
          <Col md="3">
            {currentFolder ? (
              <div className="edit-form">
                <h4>Folder</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="folderName">folderName</label>
                    <input
                      type="text"
                      className="form-control"
                      id="folderName"
                      name="folderName"
                      value={currentFolder.folderName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={currentFolder.description}
                      onChange={handleInputChange}
                    />
                  </div>

                </form>


                <button
                  className="badge badge-danger mr-2"
                  onClick={deleteFolder}
                >
                  Delete
                </button>

                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={updateFolder}
                >
                  Update
                </button>
                <p>{message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Folder...</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Folder;
