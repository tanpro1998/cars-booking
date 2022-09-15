import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

AOS.init();

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const onFinish = (values) => {
    userLogin(values, dispatch);
  };
  return (
    <div className="login">
      {loading && <Loading />}
      <Row gulter={16} className="d-flex align-items-center">
        <Col lg={16} xs={0} style={{ position: "relative" }}>
          <img
            className="loginImg"
            src="https://www.mraristotle.com/wp-content/uploads/2020/12/Travelling-By-Car-On-Holiday.jpeg"
            alt=""
            data-aos="slide-right"
            data-aos-duration="1500"
          />
          <h1 className="login-logo">FLASH CARS</h1>
        </Col>
        <Col lg={8} md={22} xs={21} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5 ml-5"
            onFinish={onFinish}
          >
            <h1>Đăng nhập</h1>
            <hr />
            <Form.Item
              name="username"
              label="Tài khoản"
              rules={[{ required: true, message: "Tài khoản bắt buộc!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Mật khẩu bắt buộc!" }]}
            >
              <Input type="password" />
            </Form.Item>
            <button className="btn2">Đăng nhập</button>
            <Link to="/register">
              <p style={{ color: "white", marginTop: "10px" }}>Đăng kí ngay</p>
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
