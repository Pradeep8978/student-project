import React from "react";
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

const LoginPage = () => {

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
        history.push("/");
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
          <div className="sign-in-htm">
            <div className="group">
              <label for="user" className="label">
                Email
              </label>
              <input id="user" type="text" className="input" />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <input id="check" type="checkbox" className="check" checked />
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
          </div>
          <div className="sign-up-htm">
            <div className="group">
              <label for="user" className="label">
                Email
              </label>
              <input id="user" type="text" className="input" />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Repeat Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Email Address
              </label>
              <input id="pass" type="text" className="input" />
            </div>
            <div className="group">
              <input type="submit" className="button" value="Sign Up" />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <label for="tab-1">Already Member?</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
