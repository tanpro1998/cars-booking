import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { userLogout } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
function Layout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Trang chủ</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">Trang quản trị</a>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          userLogout(dispatch);
        }}
      >
        <li>Đăng xuất</li>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gulter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/">
                <h1 className="logo">Flash Cars.</h1>
                <p className="sub-logo">
                  <span className="back">&lt;&lt;&lt;</span>Thú vị trên mọi hành 
                  trình! <span className="go">&gt;&gt;&gt;</span>
                </p>
              </Link>
              {user ? (
                <Dropdown overlay={menu} placement="bottomCenter" className="dropdown">
                  {user && isAdmin ? (
                    <Button>{user?.name?.toUpperCase()} (admin)</Button>
                  ) : (
                    <Button>{user?.name?.toUpperCase()}</Button>
                  )}
                </Dropdown>
              ) : (
                <Link to="/login" style={{ fontSize: "20px", color: "white" }}>
                  Đăng nhập
                </Link>
              )}
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
