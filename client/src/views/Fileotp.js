import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Row,
    Col,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "../api";
import NotificationAlert from "react-notification-alert";
import "../containers/auth/Auth.scss";
import { use } from 'chai';



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

const Fileotp = ({ toggle,selectItem }) => {

    const initialValues = {
        otp: ""
    };
    const [success, setSuccess] = use(false)
    const [error, setError] = useState("");
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
                console.log("res===========>", res.data.success)
                //sendNotification('success', 'Successfully posted file information');
                toggle()
                // downloadFile("https://image.freepik.com/free-vector/broken-frosted-glass-realistic-icon_1284-12125.jpg",`${selectItem.name}.`)
                resetForm();
            })
            .catch(err => {
                // console.log("err====>", err?.response?.status)
                // setError(err)
                if(err?.response?.status){
                    setError("Invalid Otp")
                }
                else{
                   // sendNotification('danger', 'Sorry Something went wrong please try later..')
                }
            })

    };

    const downloadFile = (uri, name)  =>{
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    // link.remove();
}
const renderError = () => {
    return <div style={{ color: "red", textAlign: "center" }}>{error?.length >0 && error}</div>;
  };

    return (
        <>
            <ModalHeader toggle={toggle}>SEND OTP</ModalHeader>
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
                                                placeholder="Otp..."
                                            />
                                            <ErrorMsg name="otp" />
                                            {renderError()}

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