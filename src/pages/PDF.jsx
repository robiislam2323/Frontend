import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";

const PDF = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [department, setdepartment] = useState("");
  const [writer, setWriter] = useState("");
  const [serial, setSerial] = useState("");
  const [file, setFile] = useState(null);
  const [booklist, setBookslist] = useState([]);

  const handleClose = () => {
    setShow(false);
    console.log(file);

    axios
      .post(
        "http://localhost:8000/uploadbook",
        {
          name: name,
          department: department,
          writer: writer,
          serial: serial,
          avatar: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        axios.get("http://localhost:8000/allbook").then((data) => {
          setBookslist(data.data);
        });
      })
      .catch((err) => console.error(err));
  };


  const handleShow = () =>{
    setName("") 
    setdepartment("") 
    setWriter("") 
    setSerial("") 
    setFile("") 
    setShow(true);
  } 
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/allbook")
      .then((data) => {
        setBookslist(data.data);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="main">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Button variant="success" onClick={handleShow}>
          Add a Book
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDepartment">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter department name"
                  value={department}
                  onChange={(e) => setdepartment(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicWriter">
                <Form.Label>Writer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter writer name"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSerial">
                <Form.Label>Serial</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter serial number"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Upload</Form.Label>
                <Form.Control onChange={handleChange} type="file" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Upload book
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Department</th>
              <th>Writer</th>
              <th>Serial No</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {booklist.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.writer}</td>
                <td>{item.serial}</td>
                <td>
                  <Button
                    variant="success"as={Link}
                    to={`http://localhost:8000/${item.url}`}target="_blank"rel="#" >Read
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </div>
  );


};


export default PDF;
