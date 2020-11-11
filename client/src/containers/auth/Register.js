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
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    userId: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain minmum 8 letters with atleast one letter, number and special character"
      ),
    phone: Yup.string().min(10, "Number should be 10 digits").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    gender: Yup.string().required("Required"),

  });
});

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    userId: "",
    password: "",
    phone: "",
    email: "",
    gender: ""
  };
  const [error, SetError] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const dispatchAction = useDispatch();

  const onSubmit = (values) => {
    const bodyParams = {
      firstName: values.firstName,
      lastName: values.lastName,
      userId: values.userId,
      password: values.password,
      phone: values.phone,
      email: values.email,
      gender: values.gender
    };
    console.log("values===========>", values)
    const url = "/users/signup";
    setLoading(true);
    Axios.post(url, bodyParams)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
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
      <div className="sign-up-htm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          render={(formikProps) => {
            const { errors } = formikProps;
            console.log("ERRORW =>", errors);
            return (
              <Form>
                <div className="group">
                  <label for="firstname" className="label">
                    First Name
              </label>
                  <Field
                    component={FormikInput}
                    name="firstName"
                    type="text"
                    className="input"
                  />
                  <ErrorMsg name="firstName" />
                </div>

                <div className="group">
                  <label for="lastname" className="label">
                    Last Name
              </label>
                  <Field
                    component={FormikInput}
                    name="lastName"
                    type="text"
                    className="input"
                  />
                  <ErrorMsg name="lastName" />
                </div>
                <div className="group">
                  <label for="userid" className="label">
                    User Id
              </label>
                  <Field
                    component={FormikInput}
                    name="userId"
                    type="text"
                    className="input"
                  />
                  <ErrorMsg name="userId" />

                </div>
                <div className="group">
                  <label for="pass" className="label">
                    Password
              </label>
                  <Field
                    component={FormikInput}
                    name="password"
                    type="password"
                    className="input"
                    data-type="password"
                  />
                  <ErrorMsg name="password" />
                </div>

                <div className="group">
                  <label for="mobilenumber" className="label">
                    Mobile Number
              </label>
                  <Field
                    component={FormikInput}
                    name="phone"
                    type="text"
                    className="input"
                  />
                  <ErrorMsg name="phone" />
                </div>
                <div className="group">
                  <label for="email" className="label">
                    Email Id
              </label>
                  <Field
                    component={FormikInput}
                    name="email"
                    type="text"
                    className="input"
                  />
                  <ErrorMsg name="email" />
                </div>

                <div className="group pl-2">
                  <div className="row">
                    <div md="col-6">
                      <div>
                        <label for="gender" className="label">
                          Gender
              </label>
                      </div >
                    </div>
                    <div className="col-6">
                      <div>
                        <Field
                          name="gender"
                          value="male"
                          type="radio"
                          className="p-1"
                        />
                        <span className="pr-4"> Male</span>
                      </div>
                      <div >
                        <Field
                          name="gender"
                          value="female"
                          type="radio"
                          className="radio"
                        />
                        <span className="pr-4"> Female</span>

                      </div>
                    </div>
                  </div>
                  <ErrorMsg name="gender" />
                </div>
                <div className="group">
                  <Field type="submit" className="button" value={loading ? " Please wait..." : "Sign Up"} />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <label for="tab-1">Already Member?</label>
                </div>
              </Form>
            );
          }}
        />
      </div>
    </Fragment>
  );
};
export default Register;
