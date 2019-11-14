import React, { useState, useEffect } from 'react';
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function LoginForm({ values, errors, touched, isSubmitting, status }) {
    const [users, setUsers] = useState([
        {
            name: 'William',
            email: 'W@gmail.com',
            password: '12345'
        },
        {
            name: 'Bill',
            email: 'MrY@gmail.com',
            password: '12345'
        },
        {
            name: 'William',
            email: 'MrTom@gmail.com',
            password: '12345'
        },
        {
            name: 'William',
            email: 'A@gmail.com',
            password: '12345'
        }
    ])
    useEffect(() => {
        if (status) { setUsers([...users, status]); }
    }, [status])


    return (

        <div>
            <Form className='from'>
                <div >
                    {touched.name && errors.name && <p>{errors.name}</p>}
                    <Field className='enter' type="name" name="name" placeholder="Name" />
                </div>
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field className='enter' type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field className='enter' type="password" name="password" placeholder="Password" />
                </div>
                <label>
                    {touched.TermsofService && errors.TermsofService && <p>{errors.TermsofService}</p>}
                    <Field type="checkbox" name="TermsofService" checked={values.TermsofService} />
                    Terms of Service
                </label>
                <div>
                    <button className='button' type="submit" disabled={isSubmitting}>Submit</button>
                </div>
                {console.log(users)}
            </Form>

            <div >

                {
                    users.map((e, index) =>
                        <div className='cards' key={index}>

                            <h3>name: {e.name}</h3>
                            <h3>email: {e.email}</h3>
                            <h3>password:{e.password}</h3>
                        </div>
                    )
                }

            </div>


        </div>



    );
}



const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, TermsofService }) {
        return {
            email: email || "",
            name: name || "",
            password: password || "",
            TermsofService: TermsofService || false,

        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(16, "Password must be 16 characters or longer")
            .required("Password is required"),

        TermsofService: Yup
            .bool()
            .oneOf([true], 'Field must be checked')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {



        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken" });
        } else {
            axios
                .post(" https://reqres.in/api/users", values)
                .then(res => {
                    console.log(res); // Data was created successfully and logs to console
                    setStatus(res.data);
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
