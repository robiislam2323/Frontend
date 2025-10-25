import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); 
    navigate("/login");
  }

  return (
    <div className='sidebar'>
      <div className='imgholder'>
        <img src="images/logo.png" alt="logo" />
        <h3>Welcome {JSON.parse(localStorage.getItem("userInfo")).username}</h3>
      </div>

      <ListGroup className="menu-list">
        <ListGroup.Item>
          <Link to="/teacher">Teacher</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/student">Student</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/pdf">PDF</Link></ListGroup.Item>
        <ListGroup.Item>Result</ListGroup.Item>
        <ListGroup.Item>Leave</ListGroup.Item>
      </ListGroup>
      
      <Button className="logout-button" onClick={handleLogout}>Log Out</Button>
    </div>

  )
}

export default Sidebar;
