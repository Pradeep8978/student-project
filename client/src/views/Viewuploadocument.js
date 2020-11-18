/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Cyber Security (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Cyber Security

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchViewupload } from "../actions//viewupload.actions"
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

 const Viewuploaddocument = () => {
  let isLoading = useSelector((state) => state.Viewupload.loading);
  let error = useSelector((state) => state.Viewupload.error);
  let ViewuploaddocumentList = useSelector((state) => state.Viewupload.viewUploadList);
  console.log("ViewuploaddocumentList====>", ViewuploaddocumentList)

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchViewupload())
  }, [])
 
    return (
      <>
        <div className="content">
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
                                                <th scope="col">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ViewuploaddocumentList?.map((item) => {
                                                return(<tr>
                                                    <td scope="row">{item?.customer.firstName}{" "}{item?.customer.lastName}</td>
                                                    <td>{item.category}</td>
                                                <td>{item.name}</td>
                                                    <td>{item.location}</td>
                                                </tr>)
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

export default Viewuploaddocument;
