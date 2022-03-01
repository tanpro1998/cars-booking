import { Col, Row, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, editCar } from "../redux/actions/carsActions";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const EditCar = () => {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((item) => item._id === carid));
      setTotalCars(cars);
    }
  }, [cars]);

  const onFinish = (values) => {
    values._id = car._id;
    dispatch(editCar(values));
  };

  return (
    <Layout>
      {loading && <Loading />}
      <Row justify="center">
        <Col lg={12} sm={24}>
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2 mt-5"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3 className="text-center font-weight-bold">Edit Car</h3>
              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image Url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <div className="text-center">
                <button className="btn1">SUBMIT</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default EditCar;
