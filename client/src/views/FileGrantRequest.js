/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchViewupload } from "../actions/viewupload.actions"

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  Modal,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "../api";

import Fileotp from "./Fileotp";

const FileGrantRequest = (props) => {
  const {
    className
  } = props;

  let isLoading = useSelector((state) => state.Viewupload.loading);
  let error = useSelector((state) => state.Viewupload.error);
  let ViewuploaddocumentList = useSelector((state) => state.Viewupload.viewUploadList);
  let profile = useSelector((state) => state.auth.profile);
  const notificationAlert = React.createRef();


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchViewupload())
  }, [])


  // console.log("selectItem====>", selectItem)


  const sendNotification = (type, message) => {debugger
    var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  }

  const grantFileAccess = ({_id}) => {
    const url = `/users/file/grant-access/${_id}`;
    Axios.get(url)
      .then(res => {
        sendNotification('success', 'Access granted for file download');
        dispatch(fetchViewupload())
      })
      .catch(err => {
        sendNotification('danger', 'Sorry Something went wrong please try later..')
      })
  }



  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlert} />

        <Row>
          <Col md="10">
            <Card>
              <CardBody>
                <div>
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Upload File</th>
                        <th scope="col">File Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ViewuploaddocumentList?.map((item,index) => {
                        return (
                          <tr key={index}>
                            <td scope="row">{item?.customer.firstName}{" "}{item?.customer.lastName}</td>
                            <td>{item.category}</td>
                            <td>{item.name}</td>
                            <td>{item.fileUrl.split('\\').pop()}</td>
                            <td>{item.location}</td>
                            <td >{
                                    item.failures >2 ?
                                <button onClick={() => grantFileAccess(item)} className="btn btn-success">Grant file Access</button>
                                : 'Success'}
                                </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );

}

export default FileGrantRequest;
