import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import HorseDetailForm from "../components/HorseDetailForm";

const HorseDetail = () => {
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const onSubmit = async (values) => {
    const _values = { ...values };
    if (_values.horse_number) {
      _values.horse_number = values.horse_number.toString();
    }
    try {
      await axios.post("http://dev.api.staller.show/v1/horses", _values);
      history.push("/horse-detail");
    } catch (e) {
      setIsError(true);
    }
  };
  return (
    <>
      <Container fluid className="bg-color">
        <Row>
          <Col
            md={{ span: 6, offset: 3 }}
            xs={{ span: 12 }}
            className="form-bg-color min-width"
          >
            <h2>Enter Horse Detail</h2>
            <HorseDetailForm
              handleSubmit={onSubmit}
              initialValues={{
                horse_name: "",
                horse_number: "",
                age_verified: true,
                dob: "",
                color: "",
                ushja_registered: true,
              }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HorseDetail;
