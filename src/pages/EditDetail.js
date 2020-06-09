import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HorseDetailForm from "../components/HorseDetailForm";

const EditDetail = () => {
  const [isError, setIsError] = useState(false);
  const [horseList, setHorseList] = useState([]);
  const [horseDetail, setHorseDetail] = useState({});
  const [show, setShow] = useState();
  const [showEdit, setShowEdit] = useState();
  const [showHorseDetail, setShowHorseDetail] = useState(false);
  const [selectedHorseDetail, setSelectedHorseDetail] = useState({});

  const history = useHistory();
  const handleClose = () => setShow();
  const handleShow = (id) => setShow(id);

  const handleShowEditClose = () => setShowEdit(false);
  const handleShowHorseDetailClose = () => setShowHorseDetail(false);

  const getData = async () => {
    try {
      const { data } = await axios.get("http://dev.api.staller.show/v1/horses");
      setHorseList(data.data);
    } catch (e) {
      setIsError(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (values, list) => {
    console.log(values);
    const _values = { ...values };
    if (_values.horse_number) {
      _values.horse_number = values.horse_number.toString();
    }
    try {
      await axios.put(
        `http://dev.api.staller.show/v1/horses/${showEdit}`,
        _values
      );
      setShowEdit();
    } catch (e) {
      setIsError(true);
    }
  };

  const removeHorse = async () => {
    console.log(show);
    try {
      await axios.delete(`http://dev.api.staller.show/v1/horses/${show}`);
      setHorseList((horseList) =>
        horseList.filter((value) => value.id !== show)
      );
      setShow();
    } catch (e) {
      setIsError(true);
    }
  };

  const handleEditList = (list) => {
    setSelectedHorseDetail(list);
    setShowEdit(list.id);
  };

  const handleShowHorseDetail = async (id) => {
    try {
      const { data } = await axios.get(
        `http://dev.api.staller.show/v1/horses/${id}`
      );
      console.log(data.data);
      // setHorseDetail((horseDetail) =>
      //   horseDetail.find((value) => value.id === id)
      // );
      setHorseDetail(data.data);
      // console.log();
      setShowHorseDetail(true);
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={12} className="d-flex justify-content-between mt-5">
            <h2>Horse List</h2>
            <div>
              <Button
                variant="primary"
                onClick={() => history.push("/create-horse")}
              >
                Add New
              </Button>
            </div>
          </Col>
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Color</th>
                  <th>DOB</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {horseList.map((list) => (
                  <tr key={list.id}>
                    <td className="text-capitalize">{list.horse_name}</td>
                    <td>{list.horse_number ? list.horse_number : "-"}</td>
                    <td className="text-capitalize">
                      {list.color ? list.color : "-"}
                    </td>
                    <td>{list.dob ? list.dob : "-"}</td>
                    <td>
                      <span className="mr-2">
                        <Button
                          variant="primary"
                          onClick={() => handleEditList(list)}
                        >
                          Edit
                        </Button>
                      </span>
                      <span className="mr-2">
                        <Button
                          variant="danger"
                          onClick={() => handleShow(list.id)}
                        >
                          Delete
                        </Button>
                      </span>
                      <span>
                        <Button
                          variant="primary"
                          onClick={() => handleShowHorseDetail(list.id)}
                        >
                          Detail
                        </Button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal show={show !== undefined} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Horse ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={removeHorse}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEdit !== undefined} onHide={handleShowEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Horse Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={{ span: 12 }} xs={{ span: 12 }}>
                  <HorseDetailForm
                    handleSubmit={onSubmit}
                    initialValues={{
                      horse_name: selectedHorseDetail.horse_name,
                      horse_number: selectedHorseDetail.horse_number,
                      age_verified: Boolean(selectedHorseDetail.age_verified),
                      dob: selectedHorseDetail.dob,
                      color: selectedHorseDetail.color,
                      ushja_registered: Boolean(
                        selectedHorseDetail.ushja_registered
                      ),
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>

        <Modal show={showHorseDetail} onHide={handleShowHorseDetailClose}>
          <Modal.Header closeButton>
            <Modal.Title>Horse Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li>ID: {horseDetail.id}</li>

              <li>Name: {horseDetail.horse_name}</li>
              <li>Number: {horseDetail.horse_number}</li>
              <li>Color: {horseDetail.color}</li>
              <li>DOB: {horseDetail.dob}</li>
              <li>Age Verified: {`${Boolean(horseDetail.age_verified)}`}</li>
              <li>Registered: {`${Boolean(horseDetail.ushja_registered)}`}</li>
            </ul>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default EditDetail;
