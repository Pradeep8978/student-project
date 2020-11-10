import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Axios from "axios";
import { fetchUserProfile } from "../../actions/auth.actions";

const FormikInput = ({ field, form, ...props }) => {
  return <input {...field} {...form} {...props} />;
};

const ErrorMsg = (props) => (
  <div className="form-validation-error">
    <ErrorMessage {...props} />
  </div>
);

const validationSchema = Yup.lazy(() => {
  return Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().min(10, "Number should be 10 digits").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain minmum 8 letters with atleast one letter, number and special character"
      ),
    confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
});

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  };
  const [error, SetError] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const dispatchAction = useDispatch();

  const onSubmit = (values) => {
    const bodyParams = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };
    const url = "/users/signup";
    setLoading(true);
    Axios.post(url, bodyParams)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/");
        setLoading(false);
        dispatchAction(fetchUserProfile());
      })
      .catch((error) => {
        SetError(error?.response.data.message);
        setLoading(false);
      });
  };

  const renderError = () => {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  };

  return (
    <Fragment>
      {error && renderError()}
      <div className="login-form-container bg-white">
        <div className="login-register-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            render={(formikProps) => {
              const { errors } = formikProps;
              console.log("ERRORW =>", errors);
              return (
                <Form>
                  <Field component={FormikInput} type="text" name="name" placeholder="Full Name" />
                  <ErrorMsg name="name" />
                  <Field component={FormikInput} type="email" name="email" placeholder="Email" />
                  <ErrorMsg name="email" />
                  <Field
                    component={FormikInput}
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                  />
                  <ErrorMsg name="phone" />
                  <Field
                    component={FormikInput}
                    type="password"
                    name="password"
                    placeholder="Password (Minimum 8 characters)"
                  />
                  <ErrorMsg name="password" />
                  <Field
                    component={FormikInput}
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                  />
                  <ErrorMsg name="confirmpassword" />
                  <div className="button-box">
                    <button type="submit">
                      {loading ? <span>Please wait...</span> : <span>Register</span>}
                    </button>
                  </div>
                </Form>
              );
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default Register;
