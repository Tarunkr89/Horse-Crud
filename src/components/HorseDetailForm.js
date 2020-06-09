import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
// import axios from "axios";
import {
  InputStyle,
  DateInput,
  CheckboxStyle,
  RadioStyle,
  SelectStyle,
} from "../components/AuthForms";
import { format } from "date-fns";
// import { useHistory } from "react-router-dom";
import { validateHorseName, validateHorseNumber } from "../validators";
import "react-datepicker/dist/react-datepicker.css";

const createHorseValidation = yup.object().shape({
  horse_name: validateHorseName(),
  horse_number: validateHorseNumber(),
});

const HorseDetailForm = ({ initialValues, handleSubmit }) => {
  // const [isError, setIsError] = useState(false);
  // const history = useHistory();
  console.log(initialValues);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={createHorseValidation}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Row>
                <Col md={12}>
                  <InputStyle
                    type="text"
                    name="horse_name"
                    placeholder="Enter Horse Name"
                  />
                  <ErrorMessage
                    name="horse_name"
                    render={(msg) => <div className="error-message">{msg}</div>}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <InputStyle
                    type="number"
                    name="horse_number"
                    placeholder="Enter Horse Number"
                  />
                  <ErrorMessage
                    name="horse_number"
                    render={(msg) => <div className="error-message">{msg}</div>}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p className="mb-1">Age Verified</p>
                </Col>
                <Col md={6}>
                  <RadioStyle
                    className="form-check-input"
                    name="age_verified"
                    type="radio"
                    checked={values.age_verified === true}
                    onChange={() => setFieldValue("age_verified", true)}
                  />
                  <span>Yes</span>
                </Col>
                <Col md={6}>
                  <RadioStyle
                    className="form-check-input"
                    name="age_verified"
                    type="radio"
                    onChange={() => setFieldValue("age_verified", false)}
                    checked={values.age_verified === false}
                  />
                  <span>No</span>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <DateInput
                    name="dob"
                    placeholderText="DOB"
                    dateFormat="yyyy-MM-dd"
                    onChange={(e) =>
                      setFieldValue("dob", format(e, "yyyy-MM-dd"))
                    }
                    value={values.dob}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <SelectStyle
                    as="select"
                    name="color"
                    onChange={(e) => setFieldValue("color", e.target.value)}
                    value={values.color}
                  >
                    <option value="">Select Color</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="brown">Brown</option>
                    <option value="Red">Red</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Grey">Grey</option>
                  </SelectStyle>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <CheckboxStyle
                    className="form-check-input"
                    name="ushja_registered"
                    type="checkbox"
                  />
                  <span>Registered</span>
                </Col>
              </Row>

              <Button className="primary submit-btn" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default HorseDetailForm;
