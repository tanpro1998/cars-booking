import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

AOS.init();
function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const navigate = useNavigate()

  const onFinish = (values) => {
   userRegister(values, dispatch, navigate)
  };
  return (
    <div className="login">
      {loading && <Loading />}

      <Row gulter={16} className="d-flex align-items-center">
        <Col lg={16} xs={0} style={{ position: "relative" }}>
          <img
            className="loginImg"
            src="https://images.unsplash.com/photo-1532931899774-fbd4de0008fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwdHJhdmVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt=""
            data-aos="slide-left"
            data-aos-duration="1500"
          />
          <h1 className="login-logo">FLASH CARS</h1>
        </Col>
        <Col lg={8} md={22} xs={21} className="text-left p-5 ">
          <Form
            layout="vertical"
            className="login-form p-5 ml-5"
            onFinish={onFinish}
          >
            <h1>Đăng kí</h1>
            <hr />
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Tài khoản"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="cfpassword"
              label="Xác nhận mật khẩu"
              rules={[{ required: true }]}
            >
              <Input type="password"/>
            </Form.Item>
            <button className="btn2">Đăng kí</button>
            <Link to="/login">
              <p>Đã có tài khoản, đăng nhập ngay</p>
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
