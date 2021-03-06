import React, { useState, useReducer } from "react";
import MetaTags from 'react-meta-tags';
import { useDispatch } from "react-redux";
import axios from 'axios';
import fetchUploadData from "../../store/entrydata/saga"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
  Spinner,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

import * as actionType from "../../store/entrydata/actionTypes";

const EntryData = (props) => {
  const [custom_div1, setcustom_div1] = useState(false)
  const [disableButton, setDisableButton] = useState(false);
  const [visibleSpinner, setVisibleSpinner] = useState(false);

  const rangeValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      max_L_kdUser: '',
      max_L_nmUser: '',
      max_L_poc: 'POC AHM',
      max_L_file: '',
    },
    validationSchema: Yup.object().shape({
      max_L_kdUser: Yup.string()
        .max(3, "Must be exactly 3 chars")
        .required("Max 3 chars"),
      max_L_nmUser: Yup.string()
        .max(5, "Must be exactly 5 chars")
        .required("Max 5 chars"),
      max_L_file: Yup.string()
        .required("File is Required"),
    }),

    onSubmit: (values) => {
      console.log("Proses Submite");
      setDisableButton(true);
      setVisibleSpinner(true);
      var bodyFormData = new FormData();
      bodyFormData.append('file', values.max_L_file);
      bodyFormData.append('poc', values.max_L_poc);
      bodyFormData.append('userId', values.max_L_kdUser);
      bodyFormData.append('userNm', values.max_L_nmUser);
      axios({
        method: "post",
        url: "http://localhost:9002/app/" + "app001/upload",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          if (response.data.message = 1) {
            setcustom_div1(true);
            rangeValidation.setValues({ "max_L_kdUser": "", "max_L_nmUser": "", max_L_poc: 'POC AHM' });
            document.getElementById("idFileUpload").value = "";
          }
          setDisableButton(false);
          setVisibleSpinner(false);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          setDisableButton(false);
          setVisibleSpinner(false);
          alert("Error Request Data");

        });
    }
  });

  const initialTutorialState = {
    file: null,
    poc: "",
    userId: "",
    userNm: ""
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Korindo App
          </title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Entry data marking & upload foto" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  {/* <CardTitle>Validation type</CardTitle>
                  <CardSubtitle className="mb-3">
                    Parsley is a availity reactstrap validation. It helps you
                    provide your users with feedback on their form submission
                    before sending it to your server.
                  </CardSubtitle> */}

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      rangeValidation.handleSubmit();
                      return false;
                    }}>
                    <div className="mb-2">
                      {custom_div1 ? (
                        <SweetAlert
                          title="Success Entry Data"
                          timeout={2000}
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                          }}
                          showCloseButton={false}
                          showConfirm={false}
                          success
                          onConfirm={() => {
                            setcustom_div1(false)
                          }}
                        ></SweetAlert>
                      ) : null}
                      <Label>POC AHM</Label>
                      <Input
                        name="max_L_poc"
                        type="text"
                        disabled
                        onChange={rangeValidation.handleChange}
                        onBlur={rangeValidation.handleBlur}
                        value={rangeValidation.values.max_L_poc || ""}
                        invalid={
                          rangeValidation.touched.max_L_poc && rangeValidation.errors.max_L_poc ? true : false
                        }
                      />
                      {rangeValidation.touched.max_L_poc && rangeValidation.errors.max_L_poc ? (
                        <FormFeedback type="invalid">{rangeValidation.errors.max_L_poc}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Kode User</Label>
                      <Input
                        name="max_L_kdUser"
                        placeholder="Max 3 chars"
                        type="text"
                        onChange={rangeValidation.handleChange}
                        onBlur={rangeValidation.handleBlur}
                        value={rangeValidation.values.max_L_kdUser || ""}
                        invalid={
                          rangeValidation.touched.max_L_kdUser && rangeValidation.errors.max_L_kdUser ? true : false
                        }
                      />
                      {rangeValidation.touched.max_L_kdUser && rangeValidation.errors.max_L_kdUser ? (
                        <FormFeedback type="invalid">{rangeValidation.errors.max_L_kdUser}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Nama User</Label>
                      <Input
                        name="max_L_nmUser"
                        placeholder="Max 5 chars"
                        type="text"
                        onChange={rangeValidation.handleChange}
                        onBlur={rangeValidation.handleBlur}
                        value={rangeValidation.values.max_L_nmUser || ""}
                        invalid={
                          rangeValidation.touched.max_L_nmUser && rangeValidation.errors.max_L_nmUser ? true : false
                        }
                      />
                      {rangeValidation.touched.max_L_nmUser && rangeValidation.errors.max_L_nmUser ? (
                        <FormFeedback type="invalid">{rangeValidation.errors.max_L_nmUser}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Upload File</Label>
                      <Input
                        id="idFileUpload"
                        name="max_L_file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => rangeValidation.setFieldValue("max_L_file", e.target.files[0])}
                        invalid={
                          rangeValidation.touched.max_L_file && rangeValidation.errors.max_L_file ? true : false
                        }
                      />
                      {rangeValidation.touched.max_L_file && rangeValidation.errors.max_L_file ? (
                        <FormFeedback type="invalid">{rangeValidation.errors.max_L_file}</FormFeedback>
                      ) : null}
                    </div>

                    <FormGroup className="mb-0">
                      <div>
                        <Button disabled={disableButton} onClick={rangeValidation.handleAddPost} type="submit" color="primary" className="ms-1">
                          Submit
                        </Button>
                      </div>
                      <Spinner style={{ display: visibleSpinner ? "block" : "none", marginTop: '-35px' }} className="ms-4" color="danger" />
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>


          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EntryData