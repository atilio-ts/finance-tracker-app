import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as UserValidator from "../validators/users";

import AuthService from "../services/auth.service";
import { User } from "../types/users";

type Props = {};

type State = {
  name: string;
  password: string;
  address: string;
  phone: number;
  gender: string;
  dateOfBirth: string;
  email: string;
  profession: string;
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      name: "",
      password: "",
      address: "",
      phone: 0,
      gender: "",
      dateOfBirth: "",
      email: "",
      profession: "",
      successful: false,
      message: ""
    };
  }

  handleRegister(formValue: User) {
    const userData = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(userData).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      name: "",
      password: "",
      address: "",
      phone: 0,
      gender: "",
      dateOfBirth: "",
      email: "",
      profession: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={UserValidator.registerUserSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group" id="name">
                    <label htmlFor="name"> Name </label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group" id="email">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group" id="password">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group" id="address"> 
                    <label htmlFor="address"> Address </label>
                    <Field name="address" type="text" className="form-control" />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group" id="phone">
                    <label htmlFor="phone"> Phone </label>
                    <Field name="phone" type="number" className="form-control" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group" id="gender">
                    <label htmlFor="gender"> Gender </label>
                    <Field name="gender" type="text" className="form-control" />
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group" id="dateOfBirth">
                    <label htmlFor="dateOfBirth"> Date of Birth </label>
                    <Field name="dateOfBirth" type="text" className="form-control" />
                    <ErrorMessage
                      name="dateOfBirth"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group" id="profession">
                    <label htmlFor="profession"> Profession </label>
                    <Field name="profession" type="text" className="form-control" />
                    <ErrorMessage
                      name="profession"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
