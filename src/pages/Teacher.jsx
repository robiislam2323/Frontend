import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const Teacher = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [teachername, setteachername] = useState("");
  const [departmentname, setdepartmentname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [loading, setloading] = useState(false);
  const [teacherList, setteacherList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [teacherObjectId, setTeacherObjectId] = useState("");

  const handleClose = () => {

    setloading(true);
    axios.post("http://localhost:8000/creatteacher", {
      teachername: teachername,
      departmentname: departmentname,
      phonenumber: phonenumber,

    })

      .then(() => {
        setloading(false);
        setShow(false);
        setUpdate(false);
        axios.get("http://localhost:8000/allteacher")
          .then((data) => setteacherList(data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };


  const handleCloseForUpdate = () => {
    console.log(teacherObjectId);
    setloading(true);
    axios.patch(`http://localhost:8000/teacher/${teacherObjectId}`, {
      teachername: teachername,
      departmentname: departmentname,
      phonenumber: phonenumber,
    })
      .then(() => {
        setloading(false);
        setShow(false);
        setUpdate(false);
        axios.get("http://localhost:8000/allteacher")
          .then((data) => setteacherList(data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };


  const handleShow = () => {
    setdepartmentname("");
    setphonenumber("");
    setteachername("");
    setShow(true);
    setUpdate(false);
  };

  const handleShowModal = (id) => {
    setUpdate(true);
    axios.get(`http://localhost:8000/teacher/${id}`).then((data) => {
      console.log(data.data[0]);
      setdepartmentname(data.data[0].departmentname);
      setphonenumber(data.data[0].phonenumber);
      setteachername(data.data[0].teachername);
      setTeacherObjectId(data.data[0]._id);
    });
    setShow(true);
  };

  useEffect(() => {
    let data = localStorage.getItem("userInfo");
    if (!data) {
      navigate("/login");
    }
  }, [navigate]);


  useEffect(() => {
    axios.get("http://localhost:8000/allteacher")
      .then((data) => setteacherList(data.data))
      .catch((err) => console.log(err));
  }, []);



  let handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:8000/deleteTeacher", { id });
      const { data } = await axios.get("http://localhost:8000/allteacher");
      setteacherList(data);
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
        <Button variant="primary" onClick={handleShow}>Add a Teacher </Button>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Teacher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicname">
                <Form.Label>Teacher Name</Form.Label>
                <Form.Control onChange={(e) => setteachername(e.target.value)}
                  type="text"
                  placeholder="Enter Teacher Name"
                  value={teachername}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasictext">
                <Form.Label>Department Name</Form.Label>
                <Form.Control onChange={(e) => setdepartmentname(e.target.value)}
                  type="text"
                  placeholder="Enter Department Name"
                  value={departmentname}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control onChange={(e) => setphonenumber(e.target.value)}
                  type="text"
                  placeholder="Enter Phone Number"
                  value={phonenumber}
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            {update ? 
              <Button disabled={loading} variant="primary" onClick={handleCloseForUpdate}>
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Update Teacher"
                )}
              </Button>
           
            :
             <Button disabled={loading} variant="primary" onClick={handleClose}>
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Create Teacher"
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
              <th>Teacher Name</th>
              <th>Department</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teacherList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.teachername}</td>
                <td>{item.departmentname}</td>
                <td>{item.phonenumber}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowModal(item._id)}>Update</Button>
                  <Button variant="danger" onClick={() => handleDelete(item._id)}> Delete </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
   
    </div>
  );

};

export default Teacher;
