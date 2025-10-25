import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const Student = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [studentname, setstudentname] = useState("");
  const [departmentname, setdepartmentname] = useState("");
  const [studentid, setstudentid] = useState("");
  const [loading, setloading] = useState(false); 
  const [studentList, setstudentList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [studentObjectId, setStudentObjectId] = useState("");

  const handleClose = () => {
    setloading(true);
    axios.post("http://localhost:8000/creatstudent", {
      studentname: studentname,
      departmentname: departmentname,
      studentid: studentid,
    })
      .then(() => {
        setloading(false);
        setShow(false);
        setUpdate(false);
        axios.get("http://localhost:8000/allstudent")
          .then((data) => setstudentList(data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const handleCloseForUpdate = () => {
    console.log(studentObjectId)
    setloading(true);
    axios.patch(`http://localhost:8000/student/${studentObjectId}`, {
      studentname: studentname,
      departmentname: departmentname,
      studentid: studentid,
    })
      .then(() => {
        setloading(false);
        setShow(false);
        setUpdate(false);
        axios.get("http://localhost:8000/allstudent")
          .then((data) => setstudentList(data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const handleShow = () => {
    setdepartmentname("") 
    setstudentid("") 
    setstudentname("") 
    setShow(true);
    setUpdate(false)
  }

  const handleShowModal = (id) => {
    setUpdate(true)
    axios.get(`http://localhost:8000/student/${id}`).then((data)=>{
      console.log(data.data[0])
      setdepartmentname(data.data[0].departmentname) 
      setstudentid(data.data[0].studentid) 
      setstudentname(data.data[0].studentname) 
      setStudentObjectId(data.data[0]._id)


    })
    setShow(true);
  }



  useEffect(() => {
    let data = localStorage.getItem("userInfo");
    if (!data) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios.get("http://localhost:8000/allstudent")
      .then((data) => {
        setstudentList(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

   let handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:8000/delete", { id }); 
      
      const { data } = await axios.get("http://localhost:8000/allstudent");
      setstudentList(data); 
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div className='main'>
      <div className='left'>
        <Sidebar />
      </div>
      <div className='right'>
        <Button variant="primary" onClick={handleShow}>Add a Student </Button>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicname">
                <Form.Label>Student Name</Form.Label>
                <Form.Control onChange={(e) => setstudentname(e.target.value)}
                  type="name"
                  placeholder="Enter Your Name"
                  value={studentname}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasictext">
                <Form.Label>Department Name</Form.Label>
                <Form.Control onChange={(e) => setdepartmentname(e.target.value)}
                  type="text"
                  placeholder="Enter Your Department Name "
                  value={departmentname}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Student ID</Form.Label>
                <Form.Control onChange={(e) => setstudentid(e.target.value)}
                  type="Number"
                  placeholder="Enter Your Student ID"
                  value={studentid}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {update
            ?
            <Button disabled={loading} variant="primary" onClick={handleCloseForUpdate}>
              {loading ? 
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              : (
                "Update Student"
              )}
            </Button>
            :
            <Button disabled={loading} variant="primary" onClick={handleClose}>
              {loading ? 
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
               : (
                "Create Student"
              )}
            </Button>

            }
            

          </Modal.Footer>
        </Modal>

        {/* Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Student ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.studentname}</td>
                <td>{item.departmentname}</td>
                <td>{item.studentid}</td>
                <td>
                  <Button variant= "primary" onClick={()=>handleShowModal(item._id)} >Update</Button>
                  <Button variant='danger' onClick={()=>handleDelete (item._id)} >Delete</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
    </div>

  );

};

export default Student;
