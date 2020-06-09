import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Error, InputStyle } from "../components/AuthForms";
import { sha512 } from "js-sha512";
import { validateEmail } from "../validators";
import { useAuth } from "../context/auth";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthToken } = useAuth();
  const history = useHistory();

  const loginvalidation = yup.object().shape({
    email: validateEmail(),
  });

  const onSubmit = async (values) => {
    const password = sha512(values.password);
    try {
      const { data } = await axios.post(
        "http://dev.api.staller.show/v1/users/login",
        {
          email: values.email,
          password,
        }
      );
      setLoggedIn(true);
      setAuthToken(data.data.access_token);
      history.push("/create-horse");
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      <Container fluid className="bg-color">
        <Row>
          <Col
            lg={{ span: 4, offset: 4 }}
            md={{ span: 6, offset: 3 }}
            className="form-bg-color"
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginvalidation}
              onSubmit={onSubmit}
            >
              {(values, handleChange) => {
                return (
                  <Form>
                    <Row>
                      <Col md={12}>
                        <InputStyle
                          type="email"
                          name="email"
                          placeholder="Enter Email-Id"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <InputStyle
                          type="password"
                          name="password"
                          placeholder="Enter Password"
                        />
                      </Col>
                    </Row>
                    <Button className="primary submit-btn" type="submit">
                      Sign In
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            {isError && (
              <Error>The username or password provided were incorrect!</Error>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
