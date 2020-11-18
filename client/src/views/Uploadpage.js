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
import React, { useState } from "react";
// react plugin used to create google maps
// reactstrap components
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardBody, Row, Col } from "reactstrap";
import Axios from "../api";
import "../containers/auth/Auth.scss";
import NotificationAlert from "react-notification-alert";


const CATEGORY_TYPES = ["", "Property Details", "IT Asset", "Business Details", "Personal Details"];

const FormikInput = ({ field, form, ...props }) => {
  return <input {...field} {...form} {...props} />;
};

const ErrorMsg = (props) => (
  <div className="form-validation-error">
    <ErrorMessage {...props} />
  </div>
);

const uploadPageSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  // file: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
});

const Uploadpage = () => {
  const initialValues = {
    name: "",
    category: "",
    file: "",
    location: "",
  };

  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileUrl, setFile] = useState('');
  const [error, setError] = useState(null);
  const notificationAlert = React.createRef();

  const handleUploader = (e) => {debugger
    setUploadLoading(true);
    const url = "/files/upload";
    var bodyFormData = new FormData();
    bodyFormData.append("file", e.target.files[0]);
    Axios.post(url, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setUploadLoading(false);
        setFile(res.data.fileUrl);
      })
      .catch((err) => {
        setUploadLoading(false);
        setError(
          err.response.data.message ||
            "Sorry.. Image not uploaded! Please Check your internet connection",
          {}
        );
      });
  };

  const sendNotification = (type, message) => {
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

  const onSubmit = (values, {resetForm}) => {
    const bodyParams = {
      ...values,
      fileUrl: fileUrl
    }

    Axios.post('/files/create', bodyParams)
    .then(res => {
      sendNotification('success', 'Successfully posted file information');
      resetForm();
    })
    .catch(err => {
      sendNotification('danger', 'Sorry Something went wrong please try later..')
    })

    debugger;
  };

  // const renderError = () => {
  //   return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  // };

  return (
    <>
      <div className="content">
          <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col md="10">
            <Card>
              <CardBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={uploadPageSchema}
                  onSubmit={onSubmit}
                  render={(formikProps) => {
                    const { errors, values } = formikProps;
                    // console.log("ERRORW =>", errors);
                    console.log("values =>", values);
                    return (
                      <Form>
                        <Row>
                          <Col md="6">
                            <label for="filaname">File Name</label>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <Field
                                component={FormikInput}
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="File Name..."
                              />
                              <ErrorMsg name="name" />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <label for="category">Category</label>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <Field
                                // component={FormikInput}
                                as="select"
                                name="category"
                                className="form-control"
                                placeholder="Category"
                              >
                                {CATEGORY_TYPES.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMsg name="category" />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="6">
                            <label for="uploadfile">Upload File</label>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <input
                               // component={FormikInput}
                                name="file"
                                type="file"
                                className="form-control"
                                placeholder="Upload File"
                                onChange={handleUploader}
                              />
                              <ErrorMsg name="file" />
                             
                              {/* {file} */}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="6">
                            <label for="location">Location</label>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <Field
                                component={FormikInput}
                                name="location"
                                type="text"
                                className="form-control"
                                placeholder="Location"
                              />
                              <ErrorMsg name="location" />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6"></Col>
                          <Col md="6">
                            <input
                              type="submit"
                              className="btn btn-primary"
                              value="Submit"
                            />
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Uploadpage;
