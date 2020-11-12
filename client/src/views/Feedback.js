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
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "../api/index"
import NotificationAlert from "react-notification-alert";

import "../containers/auth/Auth.scss"

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";


const FormikInput = ({ field, form, ...props }) => {
  return <input {...field} {...form} {...props} />;
};

const ErrorMsg = (props) => (
  <div className="form-validation-error">
    <ErrorMessage {...props} />
  </div>
);

const feedBackSchema = Yup.object().shape({
  feedback: Yup.string().required("Required"),

});

const Feedback = () => {

  const initialValues = {
    feedback: ""
  };

  const [loading, setLoading] = useState(false);
  const [succesNotification, setSuccesNotification] = useState("")
  const [errorNotification, setErrorNotification] = useState("")



  // let notificationAlert = React.createRef();
  // const notify = (place) => {
  //   var color = Math.floor(Math.random() * 5 + 1);
  //   var type;
  //   switch (color) {
  //     case 1:
  //       type = "primary";
  //       break;
  //     case 2:
  //       type = "success";
  //       break;
  //     case 3:
  //       type = "danger";
  //       break;
  //     case 4:
  //       type = "warning";
  //       break;
  //     case 5:
  //       type = "info";
  //       break;
  //     default:
  //       break;
  //   }
  //   var options = {};
  //   options = {
  //     place: place,
  //     message: (
  //       <div>
  //         <div>
  //          {succesNotification && succesNotification.length >0 ? succesNotification : null}
  //          {errorNotification && errorNotification.length>0 ? errorNotification : null}
  //         </div>
  //       </div>
  //     ),
  //     type: type,
  //     icon: "nc-icon nc-bell-55",
  //     autoDismiss: 7,
  //   };
  //   notificationAlert.current.notificationAlert(options);
  // }

  const onSubmit = (values) => { debugger
    console.log("values===========>", values)

    let url = "/feedback/create";
    setLoading(true);
    Axios.post(url, values)
      .then((res) => {
        // dispatchAction(fetchAuthors());
        console.log("res===>", res.data)
        // toaster.positive(res.data.message, {});
        // notify("tr")
        setSuccesNotification(res.data.message)
        setLoading(false);

      })
      .catch((err) => {
        // notify("tr")
        setErrorNotification(
          err.response.data.message || "Sorry.. something happened! Please try later"
        );
        setLoading(false);
      });

  };
 
  return (
    <>
      <div className="content">
        {/* <NotificationAlert ref={notificationAlert} /> */}
        <Row>
          <Col md="10">
            <Card>
              <CardBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={feedBackSchema}
                  onSubmit={onSubmit}
                  render={(formikProps) => {
                    const { errors, values } = formikProps;
                    // console.log("ERRORW =>", errors);
                    console.log("values =>", values);
                    return (
                      <Form>
                        <Row>
                          <Col md="4">
                            <label for="feedback">Feedback</label>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <Field
                                component={FormikInput}
                                name="feedback"
                                type="text"
                                className="form-control"
                                placeholder="Feed back..."
                              />
                              <ErrorMsg name="feedback" />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="4"></Col>
                          <Col md="6">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                          </Col>
                        </Row>
                      </Form>
                    )
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Feedback;
