import React from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllCars } from "../redux/actions/carsActions";
import Loading from "../components/Loading";
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";

function BookingCar() {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const { RangePicker } = DatePicker;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cars.length === 0) {
      getAllCars(dispatch);
    } else {
      setCar(cars.find((item) => item._id === carid));
    }
  }, [dispatch, cars, carid]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + totalHours * 30);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driver, car.rentPerHour, totalHours]);

  const timeChange = (values) => {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  };

  const onToken = (token) => {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimesSlots: {
        from,
        to,
      },
    };
    bookCar(reqObj, dispatch, navigate);
  };

  return (
    <Layout>
      {loading && <Loading />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt="" className="carImg2" />
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" dashed>
            <h1>Thông Tin Xe</h1>
          </Divider>
          <div style={{ textAlign: "right", fontWeight: "bold" }}>
            <p>{car.name}</p>
            <p>Giá thuê xe theo giờ: {car.rentPerHour}$/h</p>
            <p>Loại nhiên liệu: {car.fuelType} </p>
            <p>Số ghế ngồi: {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Lựa chọn thời gian
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={timeChange}
            className="ml-5"
          />
          <br />
          <button
            className="btn1 mt-2 ml-5"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Xem lịch đã thuê xe này
          </button>
          {from && to && (
            <div className="text-right">
              <p>
                Tổng thời gian: <b>{totalHours} hours</b>
              </p>
              <p>
                Giá thuê xe theo giờ: <b>{car.rentPerHour}$</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Yêu cầu tài có tài xế
              </Checkbox>
              <h3>Tổng cộng: {totalAmount ? totalAmount : 0} $</h3>
              <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51JbgRzDrivpegEIzT1BfYsVfvpHhAreHjUGrTfxP2YE2HSpBnaxHFNJyCXvNlhYt9d3cb1Lb3wkLDN426ojSQi9v00l9qgE4oX"
                shippingAddress
                amount={totalAmount * 100}
                currency="usd"
              >
                <button className="btn1 text-center">Đặt ngay</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Lịch đã thuê xe này"
          >
            {car && (
              <div className="p-2">
                {car.bookedTimesSlots.map((slot, index) => {
                  return (
                    <button className="btn1 mt-2" key={index}>
                      {slot.from} - {slot.to}
                    </button>
                  );
                })}
                <div className="text-right">
                  <button
                    className="btn1 mt-2"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </Row>
    </Layout>
  );
}

export default BookingCar;
