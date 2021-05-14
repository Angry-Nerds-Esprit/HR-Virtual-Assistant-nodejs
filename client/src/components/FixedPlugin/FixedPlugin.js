import React, { useState, useRef } from "react";

import Select from "react-select";

import { Dropdown, Badge, Button, Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import FolderService from "services/FolderService";
import Scrapping from "services/Scrapping";

const options = [
  { value: "java", label: "java" },
  { value: "python", label: "python" },
  { value: "react", label: "react" },
  { value: "node", label: "node" },
];
function FixedPlugin({
  hasload,
  setHasLoad,
  hasImage,
  setHasImage,
  color,
  setColor,
  image,
  setImage,
}) {
  const initialformstate = {
    description: "",
    folderName: "",
    nbp: "",
    country: "",
    region: "",
    skills: {},
    userNameAccount: "",
    passowrdAccount: "",
  };
  const buttonRef = useRef();

  const user = useSelector((state) => state.authentication.user);

  const [form, setform] = useState(initialformstate);
  const [showfolderForm, setshowfolderForm] = useState(true);
  const [showAccountForm, setshowAccountForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const selectCountry = (val) => {
    setform({ ...form, country: val });
  };

  const selectRegion = (val) => {
    setform({ ...form, region: val });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setform({ ...form, [name]: value });
  };
  const onchangeSkills = async (value) => {
    setform({ ...form, skills: value });
  };
  const handleSubmit = async (event) => {
    const formvalidation = event.currentTarget;
    debugger;
    if (formvalidation.checkValidity() === false) {
      event.preventDefault();

      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      var skillsvalue = form.skills.map(function (item) {
        return item["value"];
      });
      var data = {
        folderName: form.folderName,
        requete:form.qeury,
        description: form.description,
        country: form.country,
        region: form.region,
        nubmerofgooglePage: form.nbp / 10,
        userid: user.id,
        skills: skillsvalue,
        userNameAccount: form.userNameAccount,
        passowrdAccount: form.passowrdAccount,
      };
      setHasLoad();
      // buttonRef.current.disabled = true;

      const res = await FolderService.create(data);

      if (!showAccountForm) {
        const myresult = await Scrapping.startScrapping(
          data.nubmerofgooglePage,
          res.data._id,
          data.userid,
          data.skills,
          data.region
        );
      } else {
        const myresult = await Scrapping.startScrappingChangeAccount(
          data.nubmerofgooglePage,
          res.data._id,
          data.userid,
          data.skills,
          data.region,
          data.userNameAccount,
          data.passowrdAccount
        );
      }
      buttonRef.current.disabled = false;
      setHasLoad();
    }
  };
  const toggleform = () => {
    setshowfolderForm((prev) => !prev);
  };
  const toggleformaccount = () => {
    setshowAccountForm((prev) => !prev);
  };

  return (
    <div className="fixed-plugin">
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-fixed-plugin"
          variant=""
          className="text-white border-0 opacity-100"
        >
          <i className="fas fa-cogs fa-2x mt-1"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formsetlinkedin">
              <li className="adjustments-line d-flex align-items-center justify-content-between">
                <Form.Label>use your linkedin account</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch-1-acouunt"
                  onChange={toggleformaccount}
                />
              </li>
            </Form.Group>
            {showAccountForm && (
              <>
                <Form.Group controlId="formLinkedinUsername">
                  <Form.Label className="header-title pro-title text-center">
                    linkedin usernname
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    value={form.userNameAccount}
                    onChange={handleInputChange}
                    name="userNameAccount"
                    required={showAccountForm}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formlinkedinpassowrd">
                  <Form.Label className="header-title pro-title text-center">
                    linkedin passowrd{" "}
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    value={form.passowrdAccount}
                    onChange={handleInputChange}
                    name="passowrdAccount"
                    required={showAccountForm}
                  ></Form.Control>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="formsetfolder">
              <li className="adjustments-line d-flex align-items-center justify-content-between">
                <Form.Label>insert into folder</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch-1"
                  defaultChecked={showfolderForm}
                  onChange={toggleform}
                />

                {/* <Form.Check
              type="switch"
              id="custom-switch-1-image"
              checked={/*hasload**/
                /*}
              onChange={/*setHasLoad*/
                /*}
            />
           */}
              </li>
            </Form.Group>

            {showfolderForm && (
              <>
                <Form.Group controlId="formfoldername">
                  <Form.Label className="header-title pro-title text-center">
                    folder name
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    value={form.folderName}
                    onChange={handleInputChange}
                    name="folderName"
                    required={showfolderForm}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formfolderdescription">
                  <Form.Label className="header-title pro-title text-center">
                    description
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    value={form.description}
                    onChange={handleInputChange}
                    name="description"
                    required={showfolderForm}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please make a description.
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="formcountry">
              <Form.Label className="header-title pro-title text-center">
                country
              </Form.Label>

              <CountryDropdown
                className="form-control"
                value={form.country}
                onChange={selectCountry}
                required
              />
            </Form.Group>
            <Form.Group controlId="formregion">
              <Form.Label className="header-title pro-title text-center">
                region
              </Form.Label>

              <RegionDropdown
                className="form-control"
                disableWhenEmpty={true}
                country={form.country}
                value={form.region}
                onChange={selectRegion}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSkills">
              <Form.Label className="header-title pro-title text-center">
                skills
              </Form.Label>

              <Select
                options={options}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                name="skills"
                onChange={onchangeSkills}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNbprofiles">
              <Form.Label className="header-title pro-title text-center">
                nembre of profiles
              </Form.Label>

              <Form.Control
                className="form-control"
                type="number"
                step="10"
                min="10"
                max="100"
                value={form.nbp}
                onChange={handleInputChange}
                name="nbp"
                required
              ></Form.Control>
            </Form.Group>

            <li className="button-container">
              <div>
                <Button
                  block
                  className="btn-fill"
                  type="submit"
                  href=""
                  rel="noopener noreferrer"
                  target="_blank"
                  variant="primary"
                  ref={buttonRef}
                  /*onClick={startscrapping}*/
                >
                  Start
                </Button>
              </div>
            </li>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
