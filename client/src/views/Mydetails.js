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
import { useSelector, useDispatch } from 'react-redux'
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const genderOptions = {
  male:"Male",
  female:"Female"
}

const roleOptions = {
  admin:"Admin",
  customer:"Customer"

}

const Mydetails = () => {
  let isLoading = useSelector((state) => state.auth.loading);
  let error = useSelector((state) => state.auth.error);
  let profile = useSelector((state) => state.auth.profile);
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
                    <p>{profile?.firstName}</p>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <p>Last Name</p>
                  </Col>
                  <Col md="6">
                    <p>{profile?.lastName}</p>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <p>Mobile Number</p>
                  </Col>
                  <Col md="6">
                    <p>{profile.phone}</p>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <p>Email</p>
                  </Col>
                  <Col md="6">
                    <p>{profile?.email}</p>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <p>Gender</p>
                  </Col>
                  <Col md="6">
                    <p>{genderOptions[profile?.gender]}</p>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <p>Role</p>
                  </Col>
                  <Col md="6">
                    <p>{roleOptions[profile?.role]}</p>
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

export default Mydetails;
