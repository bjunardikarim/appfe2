import React, { useState, useEffect , useCallback } from "react";
import MetaTags from "react-meta-tags";  

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import '../../config';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  UncontrolledAlert,
  Button,
  Alert
} from "reactstrap";

import { getData as onGetData, getDataImage as onGetDataImage, resetDonwload } from "../../store/donwloaddata/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import "../../assets/scss/datatables2.scss"


const DonwloadData = () => {

  const dispatch = useDispatch()

  const [req, setReq] = useState({page : 1, limit: 5, offset: 0, sort: "id", order: "asc", search: {}});

  const handleTableChange = (type, {page, sortField, sortOrder, sizePerPage}) => {   
    if(type === "sort"){
      setReq({page : 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: {}});
    }
    if(type==="pagination"){
      setReq({page : page, limit: sizePerPage, offset: ((page-1) * sizePerPage), sort: sortField, order: sortOrder, search: {}});
    }
  };

  function getImage(indexed_array) {
    dispatch(onGetDataImage(indexed_array));
  }

  const entrydata  = useSelector(state => {
    return state.GetData.resp;
  });
  
  const error  = useSelector(state => {
    return state.GetData.error;
  });

  useEffect(() => {
    dispatch(onGetData(req))
  }, [req])

  // useEffect(() => {
  //   dispatch(onGetData(req))
  // }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetDonwload());
    }, 5000);
  }, [dispatch, error])

  const columnFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (row && row.fileNm) {
      return (
        <a
          href="#"
          onClick={() => {
              var indexed_array = {
                "file_name" : row.fileNm,
                "file_location" : row.fileLoc
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
              "file_name" : row.fileNmOld,
              "file_location" : row.fileLoc
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

  const [isSending, setIsSending] = useState(false)
  const sendRequest = useCallback(async () => {
    setReq({page : 1, limit: 5, offset: 0, sort: "id", order: "asc", search: {}});
    //dispatch(onGetData(req));
  //}, [entrydata]) // update the callback if the state changes
  }, [])
  
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
          Korindo App
          </title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Download foto dengan marking" />

          {error && error ? <Alert color="danger">{error}</Alert> : null}
         
          <Button disabled={isSending} onClick={sendRequest}
            color="primary"
            className="btn btn-primary col-sm-1"
          >
            Refresh
          </Button>
          <br/>
          <br/>
          <Row>
              
                    
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>List Entry Data Marking </CardTitle>

                  <div className="table-responsive">
                  <BootstrapTable
                    keyField = "id"
                    remote ={{ filter: true, pagination: true, sort: true, cellEdit: true }}
                    data = {entrydata.data}
                    columns = {columns}
                    pagination = {paginationFactory ({
                        page : req.page,
                        sizePerPage : req.limit,
                        sizePerPageList : [5,10,20],
                        totalSize : entrydata.total,
                        showTotal: true,
                    })}
                    onTableChange = {handleTableChange}
                    striped
                    hover
                    condensed
                  />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
  
export default DonwloadData  
