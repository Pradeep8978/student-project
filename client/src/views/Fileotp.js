import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Row,
    Col,
    ModalHeader,
    ModalBody,
    Alert,
    Button
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "../api";
import NotificationAlert from "react-notification-alert";
import "../containers/auth/Auth.scss";



const FormikInput = ({ field, form, ...props }) => {
    return <input {...field} {...form} {...props} />;
};

const ErrorMsg = (props) => (
    <div className="form-validation-error">
        <ErrorMessage {...props} />
    </div>
);

const generateOtpValidation = Yup.object().shape({
    otp: Yup.string().required("Required"),
});

const Fileotp = ({ toggle, selectItem, verifyEmail }) => {

    const initialValues = {
        otp: ""
    };
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("");
    const [failureCount, setFailureCount] = useState(null)
    let profile = useSelector((state) => state.auth.profile);
    console.log("selectitem====>", selectItem)

    const onSubmit = (values, { resetForm }) => { debugger
        const url = `/users/check/otp`;
        const bodyParams = {
            email: profile?.email,
            otp: values.otp
        };
        Axios.post(url, bodyParams)
            .then(res => {
                setSuccess(res.data.success)
                //sendNotification('success', 'Successfully posted file information');
                const fileName = `${selectItem.name}.${selectItem.fileUrl.split(".").pop()}`
                downloadFile(`${selectItem.fileUrl}`, fileName)
                toggle()
                resetForm();
            })
            .catch(err => {
                console.log("err====>", err?.response)
                // setError(err)
                if (err?.response?.status) {
                    setError("Invalid Otp")
                }
                if (err?.response?.data?.failures) {
                    setFailureCount(err?.response?.data?.failures)
                }
                else {
                    // sendNotification('danger', 'Sorry Something went wrong please try later..')
                }
            })
    };

    const downloadFile = (uri, name) => {
        var link = document.createElement("a");
        // If you don't know the name or want to use
        // the webserver default set name = ''
        // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        link.setAttribute('download', name);
        // link.download =name;
        link.href = `http://${uri}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    const renderError = () => {
        return <div>{error?.length > 0 && error}</div>;
    };

    return (
        <>
            <ModalHeader toggle={toggle}>SEND OTP</ModalHeader>
            <div className="p-1">
                {error.length > 0 && <Alert color="danger">
                    {renderError()}
                </Alert>
                }
            </div>
            {failureCount === 3 ?
                <div style={{padding:"0px 20px", fontSize:"14px"}}>If the otp fails 3 times your file download is blocked temporarily
                   please contact administrator</div>
                :
                null
            }

            <ModalBody>
                <Formik
                    initialValues={initialValues}
                    validationSchema={generateOtpValidation}
                    onSubmit={onSubmit}
                    render={(formikProps) => {
                        const { errors, values } = formikProps;
                        // console.log("ERRORW =>", errors);
                        console.log("values =>", values);
                        return (
                            <Form>
                                <Row>
                                    <Col md="6">
                                        <label for="otp">Please enter your valid OTP</label>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <Field
                                                component={FormikInput}
                                                name="otp"
                                                type="text"
                                                className="form-control"
                                                placeholder="OTP..."
                                            />
                                            <ErrorMsg name="otp" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                    </Col>
                                    <Col md="3">
                                        <input
                                            type="submit"
                                            className="btn btn-primary"
                                            value="Submit"
                                        />
                                    </Col>
                                    <Col md="3">
                                        {failureCount > 2 ? null :
                                            <div className="resend-otp" onClick={verifyEmail}>
                                                <a> Resend OTP</a>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <p className="note-otp">Note: consecutive 3 times otp failure will leads to block your file download</p>
                                </Row>
                            </Form>
                        );
                    }}
                />
            </ModalBody>
        </>
    )
}
export default Fileotp;