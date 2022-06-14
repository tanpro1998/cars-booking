import React from "react";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);

  useEffect(() => {
    getAllBookings(dispatch)
  }, [dispatch]);
  return (
    <Layout>
      <h3 className="text-left">My Bookings</h3>
      <Row justify="center">
        <Col lg={20} sm={24}>
          {bookings.map((booking, index) => {
            return (
              <Row className="bs1 m-2" key={index}>
                <Col lg={7} sm={24}>
                  <p>
                    <b>{booking.car}</b>
                  </p>
                </Col>
                <Col lg={10} sm={24}></Col>
                <Col lg={7} sm={24}></Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Layout>
  );
};

export default UserBookings;
