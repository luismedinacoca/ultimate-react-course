import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const Signin = () => {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = "Required";
    } else if (values.firstname.length > 15) {
      errors.firstname = "Must be 15 characters or less.";
    }

    if (!values.lastname) {
      errors.lastname = "Required";
    } else if (values.lastname.length > 15) {
      errors.lastname = "Must be 15 characters or less.";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid Email Address.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    validate,
    onSubmit: () => {
      navigate("./home");
    },
  });

  return (
    <div className="signin">
      <h1>Form Validation</h1>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="firstname"
            {...formik.getFieldProps("firstname")}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div style={{ color: "red", fontFamily: "sans-serif" }}>
              {formik.errors.firstname}
            </div>
          ) : null}

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="lastname"
            {...formik.getFieldProps("lastname")}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <div style={{ color: "red", fontFamily: "sans-serif" }}>
              {formik.errors.lastname}
            </div>
          ) : null}

          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", fontFamily: "sans-serif" }}>
              {formik.errors.email}
            </div>
          ) : null}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;

/**
 * React - Zod - Formik
 https://youtu.be/CI4u0787yEs
 https://zk07ws.csb.app/
$ npm install formik --save
$ npm i yup

 otro Link: https://www.youtube.com/watch?v=tli5n_NqQW8
 */
