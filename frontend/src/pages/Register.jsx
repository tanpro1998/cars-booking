import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

AOS.init();
function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    dispatch(userRegister(values));
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
            data-aos="slide-left"
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
            <h1>Register</h1>
            <hr />
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
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
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <button className="btn2">Register</button>
            <Link to="/login">
              <p>Already account, click hear to login</p>
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
