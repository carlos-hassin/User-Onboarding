import React, { useState, useEffect } from "react"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const UserForm = ({value}) => {

  return(
    <div className="user-form">
      <Form>
        <Field
          type="text" 
          name="name" 
          placeholder="Full Name"
        />
        <Field 
          type="email" 
          name="email" 
          placeholder="example@gmail.com"
        />
        <Field 
          type="password" 
          name="password" 
          placeholder="password"
        />
        <Field 
          type="checkbox" 
          name="agreementCheck"
        />
        <button>Submit!</button>
      </Form>
    </div>
  )
};
const FormikUserForm = withFormik({
  mapPropsToValues({userName, email, password, agreementCheck}){
    return{
      userName: userName || "",
      email: email || "",
      password: password || "",
      agreementCheck: agreementCheck || false
    };
  },
  validationSchema: Yup.object().shape({
    userName: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit(values, {setStatus, resetForm}){
    axios
    .post("https://reqres.in/api/users/", values)
    .then(res => {
      console.log(res.data)
      setStatus(res.data)
      resetForm();
    })
  }
})(UserForm);

export default FormikUserForm;
console.log("this is the HOC", FormikUserForm)