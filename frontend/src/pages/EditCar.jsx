import { Col, Row, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, editCar } from "../redux/actions/carsActions";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";

const EditCar = () => {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cars.length === 0) {
      getAllCars(dispatch);
    } else {
      setCar(cars.find((item) => item._id === carid));
      setTotalCars(cars);
    }
  }, [cars, dispatch, carid]);

  const onFinish = (values) => {
    values._id = car._id;
    editCar(values, dispatch, navigate);
  };

  return (
    <Layout>
      {loading && <Loading />}
      <Row justify="center">
        <Col lg={12} sm={24}>
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-5 mt-5 h-100"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3 className="text-center font-weight-bold">
                Chỉnh sửa thông tin xe
              </h3>
              <hr />
              <Form.Item
                name="name"
                label="Tên xe"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Ảnh" rules={[{ required: true }]}>
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
                <button className="btn1 mt-5">Xác nhận</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default EditCar;
