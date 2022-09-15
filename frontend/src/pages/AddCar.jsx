import { Col, Row, Form, Input } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../redux/actions/carsActions";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const navigate = useNavigate()
  const onFinish = (values) => {
    values.bookedTimesSlots = [];
    addCar(values, dispatch, navigate);
  };
  return (
    <Layout>
      {loading && <Loading />}
      <Row justify="center">
        <Col lg={12} sm={24}>
          <Form
            className="bs1 p-5 mt-5 h-100"
            layout="vertical"
            onFinish={onFinish}
          >
            <h3 className="text-center font-weight-bold">Thêm xe mới</h3>
            <hr />
            <Form.Item
              name="name"
              label="Tên xe"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Ảnh"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rentPerHour"
              label="Giá thuê ($)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="capacity"
              label="Số ghế ngồi"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="fuelType"
              label="Loại nhiên liệu"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <div className="text-center">
              <button className="btn1 mt-5">Thêm xe</button>
            </div>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddCar;
