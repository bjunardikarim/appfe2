import React, { useState, useEffect, useCallback } from "react";
import MetaTags from "react-meta-tags";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import './TestingPage.css';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import '../../config';
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
  CardTitle,
  CardSubtitle
} from "reactstrap";

import { getData as onGetData, getDataImage as onGetDataImage, resetDonwload } from "../../store/donwloaddata/actions"

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

//redux
import { useSelector, useDispatch } from "react-redux"

import { PhotoshopPicker } from "react-color";
import { Link } from "react-router-dom";

const TestingPage = () => {

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

  const [isSending, setIsSending] = useState(false)
  const sendRequest = useCallback(async () => {
    setReq({ page: 1, limit: 5, offset: 0, sort: "id", order: "asc", search: {} });
    //dispatch(onGetData(req));
    //}, [entrydata]) // update the callback if the state changes
  }, [])
  const entrydata = useSelector(state => {
    return state.GetData.resp;
  });
  const [req, setReq] = useState({ page: 1, limit: 5, offset: 0, sort: "id", order: "asc", search: {} });
  const handleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
    if (type === "sort") {
      setReq({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: {} });
    }
    if (type === "pagination") {
      setReq({ page: page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: sortField, order: sortOrder, search: {} });
    }
  };

  const columnFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (row && row.fileNm) {
      return (
        <a
          href="#"
          onClick={() => {
            var indexed_array = {
              "file_name": row.fileNm,
              "file_location": row.fileLoc
            };
            getImage(indexed_array);

          }}
        >
          {row.fileNm}
        </a>
      );
    } else {
      return row.fileNm;
    }
  };

  const columnFormatterOriginal = (cell, row, rowIndex, formatExtraData) => {
    if (row && row.fileNmOld) {
      return (
        <a
          href="#"
          onClick={() => {
            var indexed_array = {
              "file_name": row.fileNmOld,
              "file_location": row.fileLoc
            };
            getImage(indexed_array)

          }}
        >
          {row.fileNmOld}
        </a>
      );
    } else {
      return row.fileNmOld;
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "poc",
      text: "POC",
      sort: true
    },
    {
      dataField: "userId",
      text: "User ID",
      sort: true
    },
    {
      dataField: "userNm",
      text: "User Name",
      sort: true
    },
    {
      dataField: "dateipt",
      text: "Tanggal Entry",
      sort: true
    },
    {
      dataField: "fileNm",
      text: "File Edit",
      sort: true,
      formatter: columnFormatter
    },
    {
      dataField: "fileNmOld",
      text: "File Original",
      sort: true,
      formatter: columnFormatterOriginal
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Korindo App
          </title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Testing Page" />
          <Link to="/donwload">
            <Button color="primary" className="btn btn-primary col-sm-1">
              Refresh
            </Button>
          </Link>
          <Button color="primary" className="btn btn-primary col-sm-1 delete-button"
            onClick={() => { if (window.confirm('Are you sure want to delete?')) this.onCancel(item) }}>
            Confirm
          </Button>
          <br />
          <br />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle>Validation type</CardTitle><br />
                  <CardSubtitle className="mb-3">
                    Parsley is a availity reactstrap validation. It helps you
                    provide your users with feedback on their form submission
                    before sending it to your server. Parsley is a availity reactstrap validation. It helps you
                    provide your users with feedback on their form submission
                    before sending it to your server. Parsley is a availity reactstrap validation. It helps you
                    provide your users with feedback on their form submission
                    before sending it to your server. Parsley is a availity reactstrap validation. It helps you
                    provide your users with feedback on their form submission
                    before sending it to your server. Parsley is a availity reactstrap validation. It helps you
                    provide your users with feedback on their form submission
                    before sending it to your server. Parsley is a availity reactstrap validation. It helps you
                    provide your users with feedback on their form submission
                    before sending it to your server.
                  </CardSubtitle><br />

                  {/* <div className="table-responsive">
                    <BootstrapTable
                      keyField="id"
                      remote={{ filter: true, pagination: true, sort: true, cellEdit: true }}
                      data={entrydata.data}
                      columns={columns}
                      pagination={paginationFactory({
                        page: req.page,
                        sizePerPage: req.limit,
                        sizePerPageList: [5, 10, 20],
                        totalSize: entrydata.total,
                        showTotal: true,
                      })}
                      onTableChange={handleTableChange}
                      striped
                      hover
                      condensed
                    />
                  </div> */}
                  

                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default TestingPage