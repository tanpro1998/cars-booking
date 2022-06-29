import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCars, deleteCar } from "../redux/actions/carsActions";
import { Row, Col, DatePicker } from "antd";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

function Admin() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    getAllCars(dispatch)
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  const setFilter = (values) => {
    var selectedFrom = moment(values[0], "MMM DD yyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyy HH:mm");

    var temp = [];
    for (var car of cars) {
      if (car.bookedTimesSlots.length === 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimesSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }
    setTotalCars(temp);
  };

  return (
    <Layout>
      <Row justify="center" className="mt-3">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>
      <h1 className="text-center font-weight-bold mt-5">Quản Trị</h1>
      <div className="position-fixed pl-2">
        <Link to="/addcar">
          <button className="btn1">Thêm xe</button>
        </Link>
      </div>
      {loading === true && <Loading />}
      <Row justify="center" gulter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24} key={car._id}>
              <div className="car p-2 bs1">
                <img src={car.image} alt="" className="carImg" />
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="pl-2 pb-2">
                    <p className="title">{car.name}</p>
                    <p className="desc font-weight-bold">
                      Giá thuê: {car.rentPerHour}$
                    </p>
                  </div>
                  <div className="mr-3">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "blue", cursor: "pointer" }}
                      />
                    </Link>
                    <Popconfirm
                      title="Bạn chắc chắn muốn xóa xe?"
                      onConfirm={() => {
                        deleteCar({ carid: car._id }, dispatch);
                      }}
                      okText="Có"
                      cancelText="Không"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Layout>
  );
}

export default Admin;
