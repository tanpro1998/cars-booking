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
    dispatch(userLogin(values));
  };
  return (
    <div className="login">
      {loading && <Loading />}
      <Row gulter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="carImg"
            src="https://www.teahub.io/photos/full/35-350624_sports-car-background-hd.jpg"
            alt=""
            data-aos="slide-right"
            data-aos-duration="1500"
          />
          <h1 className="login-logo">FLASH CARS</h1>
        </Col>
        <Col lg={8} className="text-left p-5 ">
          <Form
            layout="vertical"
            className="login-form p-5 ml-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <button className="btn2">Login</button>
            <Link to="/register">
              <p>Register Now</p>
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
