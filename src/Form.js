import React from 'react';
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
        < Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type="name" name="name" placeholder="Name" />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <label>
                <Field type="checkbox" name="Terms of Service" checked={values.tos} />
                Terms of Service
            </label>
            <div>
                <button disabled={isSubmitting}>Submit</button>
            </div>
        </Form>
    );
}



const FormikLoginForm = withFormik({
    mapPropsToValues({ email, password, tos, meal }) {
        return {
            email: email || "",
            password: password || "",
            tos: tos || false,

        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(16, "Password must be 16 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken" });
        } else {
            axios
                .post("https://yourdatabaseurlgoeshere.com", values)
                .then(res => {
                    console.log(res); // Data was created successfully and logs to console
                    resetForm();
                    setSubmitting(false);
                })
                .catch(err => {
                    console.log(err); // There was an error creating the data and logs to console
                    setSubmitting(false);
                });
        }
    }
})(LoginForm);

export default FormikLoginForm;
