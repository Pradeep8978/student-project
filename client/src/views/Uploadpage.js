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
import React,{useState} from "react";
// react plugin used to create google maps
// reactstrap components
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Axios from "../api/index"
import "../containers/auth/Auth.scss"


const FormikInput = ({ field, form, ...props }) => {
  return <input {...field} {...form} {...props} />;
};

const ErrorMsg = (props) => (
  <div className="form-validation-error">
    <ErrorMessage {...props} />
  </div>
);

const uploadPageSchema = Yup.object().shape({
  filename: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  file: Yup.string().required("Required"),
  location: Yup.string().required("Required")
});


const Uploadpage = () => {

  const initialValues = {
    filename: "",
    category: "",
    file: "",
    location: ""
  };

  const [uploadLoading, setUploadLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [error,setError] = useState(null)

  // const handleUploader = (files) => {
  //   setUploadLoading(true);
  //   const url = "/images/upload";
  //   var bodyFormData = new FormData();
  //   bodyFormData.append("image", files[0]);
  //   Axios.post(url, bodyFormData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //     .then((res) => {
  //       setUploadLoading(false);
  //       setFile(res.data);
  //     })
  //     .catch((err) => {
  //       setUploadLoading(false);
  //      setError(
  //         err.response.data.message ||
  //         "Sorry.. Image not uploaded! Please Check your internet connection",
  //         {}
  //       );
  //     });
  // };


  const onSubmit = (values) => {
    console.log("values===========>", values)
   
  };

  // const renderError = () => {
  //   return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  // };

  return (
    <>
      <div className="content">
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
                                name="filename"
                                type="text"
                                className="form-control"
                                placeholder="File Name..."
                              />
                              <ErrorMsg name="filename" />
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
                                component={FormikInput}
                                name="category"
                                className="form-control"
                                placeholder="Category"
                              />
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
                              <Field
                                component={FormikInput}
                                name="file"
                                type="file"
                                className="form-control"
                                placeholder="Upload File"
                                // onChange={handleUploader}
                              />
                              <ErrorMsg name="file" />
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

export default Uploadpage;
