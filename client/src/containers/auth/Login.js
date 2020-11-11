import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser, fetchUserProfile, clearLoadingState } from "../../actions/auth.actions";
import Register from "./Register"
import "./Auth.scss";

const FormikInput = ({ field, form, ...props }) => {
  return <input {...field} {...form} {...props} />;
};

const ErrorMsg = (props) => (
  <div className="form-validation-error">
    <ErrorMessage {...props} />
  </div>
);

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginPage = ({ location }) => {

  const { pathname } = location;
  let isLoading = useSelector((state) => state.auth.loading);
  let error = useSelector((state) => state.auth.error);
  let profile = useSelector((state) => state.auth.profile);
  console.log("profile============>", profile);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearLoadingState());
  }, [dispatch]);

  const onSubmit = (values) => {
    if (typeof window !== "undefined") {
      const bodyParams = { email: values.email, password: values.password };
      dispatch(loginUser(bodyParams)).then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
        dispatch(fetchUserProfile());
      });
    }
  };

  const renderError = () => {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
        <label for="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label for="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          {error && renderError()}
          {/*  */}
          <div className="sign-in-htm">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              render={(formikProps) => {
                const { errors } = formikProps;
                console.log("ERRORW =>", errors);
                return (
                  <Form>
                    <div className="group">
                      <label for="user" className="label">
                        Email
              </label>
                      <Field
                        component={FormikInput}
                        name="email"
                        type="text"
                        className="input"
                      />
                      <ErrorMsg name="email" />
                    </div>
                    <div className="group">
                      <label for="pass" className="label">
                        Password
              </label>
                      <Field
                        component={FormikInput}
                        id="pass"
                        name="password"
                        className="input"
                        data-type="password"
                      />
                      <ErrorMsg name="password" />
                    </div>
                    <div className="group">
                      <Field
                        component={FormikInput}
                        id="check"
                        type="checkbox"
                        className="check"
                        checked />
                      <label for="check">
                        <span className="icon"></span> Keep me Signed in
              </label>

                    </div>
                    <div className="group">
                      <input type="submit" className="button" value="Sign In" />
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                      <a href="#forgot">Forgot Password?</a>
                    </div>
                  </Form>)
              }}
            />

          </div>
          {/*  */}
          <>
            <Register />
          </>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
