/*!

=========================================================
* Paper Dashboard React - v1.6.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 6060 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class Mydetails extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
          <Card>
          <CardBody>
             <Row>
               <Col md="6">
                 <p>First Name</p>
               </Col>
               <Col md="6">
                 <p>Narender</p>
               </Col>
               </Row>

               <Row>
               <Col md="6">
                 <p>Last Name</p>
               </Col>
               <Col md="6">
                 <p>Baddam</p>
               </Col>
               </Row>

               <Row>
               <Col md="6">
                 <p>User Id</p>
               </Col>
               <Col md="6">
                 <p>Narender@166</p>
               </Col>
               </Row>

               <Row>
               <Col md="6">
                 <p>Mobile Number</p>
               </Col>
               <Col md="6">
                 <p>7569411668</p>
               </Col>
               </Row>

               <Row>
               <Col md="6">
                 <p>Email</p>
               </Col>
               <Col md="6">
                 <p>Narender@gmail.com</p>
               </Col>
               </Row>

               <Row>
               <Col md="6">
                 <p>Gender</p>
               </Col>
               <Col md="6">
                 <p>Male</p>
               </Col>
               </Row>
               </CardBody>
               </Card>
               </Col>
               </Row>
               
        </div>
      </>
    );
  }
}

export default Mydetails;
