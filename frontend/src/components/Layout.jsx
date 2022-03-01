import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

function Layout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.isAdmin;
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/bookings">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li>Logout</li>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gulter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <Link to="/">
                <h1 className="logo">Flash Cars.</h1>
              </Link>
              <Dropdown overlay={menu} placement="bottomCenter">
                {isAdmin ? (
                  <Button>{user.name.toUpperCase()} (admin)</Button>
                ) : (
                  <Button>{user.name.toUpperCase()}</Button>
                )}
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer-content mt-5">
        <p className="text-center font-weight-bold">Design by Flash.</p>
        <hr />
      </div>
    </div>
  );
}

export default Layout;
