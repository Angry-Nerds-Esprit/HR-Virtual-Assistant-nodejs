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
import rdvService from "services/rdvService";

const Rdv = (props) => {
  const initialFolderState = {
    _id: null,
    rdvDate:"",
    note: "",
    name: "",
    userid: "",
    candidateName:"",
    profileId:""
  };

  const [currentRdv, setCurrentRdv] = useState(initialFolderState);
  const [message, setMessage] = useState("");

  const getRdv = (id) => {
    rdvService.get(id)
      .then((response) => {
        setCurrentRdv(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRdv(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentRdv({ ...currentRdv, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentRdv.id,
      rdvDate:currentRdv.rdvDate,
      note: currentRdv.note,
      name: currentRdv.name,
      published: status,
    };

    rdvService.update(currentRdv.id, data)
      .then((response) => {
        setCurrentRdv({ ...currentRdv, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateRdv = () => {
    rdvService.update(currentRdv._id, currentRdv)
      .then((response) => {
        console.log(response.data);
        setMessage("The Appointment was updated successfully!");
        
      })
      .catch((e) => {
        console.log(e);
      });
      
  };

  const deleteRdv = () => {
    rdvService.remove(currentRdv._id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/admin/calender");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          
          <Col >
            {currentRdv ? (
              <div className="edit-form">
                <h4>Appointment</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Appointment Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={currentRdv.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Note">Note</label>
                    <input
                      type="text"
                      className="form-control"
                      id="note"
                      name="note"
                      value={currentRdv.note}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentRdv.published ? "Published" : "Pending"}
                  </div>
                </form>

                {currentRdv.published ? (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => updatePublished(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => updatePublished(true)}
                  >
                    Publish
                  </button>
                )}

                <button
                  className="badge badge-danger mr-2"
                  onClick={deleteRdv}
                >
                  Delete
                </button>

                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={updateRdv}
                >
                  Update
                </button>
                <p>{message}</p>
              </div>
            ) : (
              <div>
                <br />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Rdv;
