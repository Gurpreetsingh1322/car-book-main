// import { Col, Row, Divider, DatePicker, Checkbox, Modal, Input, Form, Button } from "antd";
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import Spinner from "../components/Spinner";
// import { getAllCars } from "../redux/actions/carsActions";
// import moment from "moment";
// import { bookCar } from "../redux/actions/bookingActions";
// import StripeCheckout from "react-stripe-checkout";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const { RangePicker } = DatePicker;

// function BookingCar({ match }) {
//   const { cars } = useSelector((state) => state.carsReducer);
//   const { loading } = useSelector((state) => state.alertsReducer);
//   const [car, setCar] = useState({});
//   const dispatch = useDispatch();
//   const [from, setFrom] = useState();
//   const [to, setTo] = useState();
//   const [totalHours, setTotalHours] = useState(0);
//   const [driver, setDriver] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [drivingLicense, setDrivingLicense] = useState(""); // State for driving license

//   useEffect(() => {
//     if (cars.length === 0) {
//       dispatch(getAllCars());
//     } else {
//       setCar(cars.find((o) => o._id === match.params.carid));
//     }
//   }, [cars]);

//   useEffect(() => {
//     setTotalAmount(totalHours * car.rentPerHour);
//     if (driver) {
//       setTotalAmount(totalAmount + 30 * totalHours); // Add driver fee
//     }
//   }, [driver, totalHours]);

//   function selectTimeSlots(values) {
//     setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
//     setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
//     setTotalHours(values[1].diff(values[0], "hours"));
//   }

//   // Submit handler when booking is confirmed
//   function onToken(token) {
//     const reqObj = {
//       token,
//       user: JSON.parse(localStorage.getItem("user"))._id,
//       car: car._id,
//       totalHours,
//       totalAmount,
//       driverRequired: driver,
//       bookedTimeSlots: { from, to },
//       drivingLicense: driver ? drivingLicense : "", // Include driving license if driver is required
//     };

//     dispatch(bookCar(reqObj));
//   }

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <Row
//         justify="center"
//         className="d-flex align-items-center"
//         style={{ minHeight: "90vh" }}
//       >
//         <Col lg={10} sm={24} xs={24} className="p-3">
//           <img
//             src={car.image}
//             className="carimg2 bs1 w-100"
//             data-aos="flip-left"
//             data-aos-duration="1500"
//           />
//         </Col>

//         <Col lg={10} sm={24} xs={24} className="text-right">
//           <Divider type="horizontal" dashed>
//             Car Info
//           </Divider>
//           <div style={{ textAlign: "right" }}>
//             <p>{car.name}</p>
//             <p>{car.rentPerHour} Rent Per hour /-</p>
//             <p>Fuel Type : {car.fuelType}</p>
//             <p>Max Persons : {car.capacity}</p>
//           </div>

//           <Divider type="horizontal" dashed>
//             Select Time Slots
//           </Divider>
//           <RangePicker
//             showTime={{ format: "HH:mm" }}
//             format="MMM DD yyyy HH:mm"
//             onChange={selectTimeSlots}
//           />
//           <br />
//           <button
//             className="btn1 mt-2"
//             onClick={() => {
//               setShowModal(true);
//             }}
//           >
//             See Booked Slots
//           </button>
//           {from && to && (
//             <div>
//               <p>
//                 Total Hours : <b>{totalHours}</b>
//               </p>
//               <p>
//                 Rent Per Hour : <b>{car.rentPerHour}</b>
//               </p>
//               <Checkbox
//                 onChange={(e) => {
//                   setDriver(e.target.checked);
//                 }}
//               >
//                 Self Drive 
//               </Checkbox>

//               <h3>Total Amount : {totalAmount}</h3>

//               {/* Form with validation */}
//               <Form
//                 onFinish={(values) => {
//                   // Handle form submission when all validations pass
//                   const reqObj = {
//                     token: values.token,
//                     user: JSON.parse(localStorage.getItem("user"))._id,
//                     car: car._id,
//                     totalHours,
//                     totalAmount,
//                     driverRequired: driver,
//                     bookedTimeSlots: { from, to },
//                     drivingLicense: driver ? values.drivingLicense : "",
//                   };
//                   dispatch(bookCar(reqObj));
//                 }}
//                 initialValues={{ drivingLicense: "" }}
//               >
//                 {driver && (
//                   <Form.Item
//                     name="drivingLicense"
//                     label="Driving License"
//                     rules={[
//                       { required: true, message: "Please enter your driving license number!" },
//                     ]}
//                   >
//                     <Input
//                       placeholder="Enter Driving License Number"
//                       value={drivingLicense}
//                       onChange={(e) => setDrivingLicense(e.target.value)}
//                       style={{ width: 200 }} // Making the input smaller
//                     />
//                   </Form.Item>
//                 )}

//                 <StripeCheckout
//                   shippingAddress
//                   token={onToken}
//                   currency="inr"
//                   amount={totalAmount * 100}
//                   stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
//                 >
//                   <Button className="btn1" htmlType="submit">
//                     Book Now
//                   </Button>
//                 </StripeCheckout>
//               </Form>
//             </div>
//           )}
//         </Col>

//         {car.name && (
//           <Modal
//             visible={showModal}
//             closable={false}
//             footer={false}
//             title="Booked time slots"
//           >
//             <div className="p-2">
//               {car.bookedTimeSlots.map((slot) => {
//                 return (
//                   <button className="btn1 mt-2" key={slot.from}>
//                     {slot.from} - {slot.to}
//                   </button>
//                 );
//               })}

//               <div className="text-right mt-5">
//                 <button
//                   className="btn1"
//                   onClick={() => {
//                     setShowModal(false);
//                   }}
//                 >
//                   CLOSE
//                 </button>
//               </div>
//             </div>
//           </Modal>
//         )}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default BookingCar;
import { Col, Row, Divider, DatePicker, Checkbox, Modal, Input, Form, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';
import 'aos/dist/aos.css';

const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [drivingLicense, setDrivingLicense] = useState(""); // State for driving license

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours); // Add driver fee
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  // Submit handler when booking is confirmed
  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: { from, to },
      drivingLicense: driver ? drivingLicense : "", // Include driving license if driver is required
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={car.image}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  setDriver(e.target.checked);
                }}
              >
                Self Drive 
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              {/* Form with validation */}
              <Form
                onFinish={(values) => {
                  // Handle form submission when all validations pass
                  const reqObj = {
                    token: values.token,
                    user: JSON.parse(localStorage.getItem("user"))._id,
                    car: car._id,
                    totalHours,
                    totalAmount,
                    driverRequired: driver,
                    bookedTimeSlots: { from, to },
                    drivingLicense: driver ? values.drivingLicense : "",
                  };
                  dispatch(bookCar(reqObj));
                }}
                initialValues={{ drivingLicense: "" }}
              >
                {driver && (
                  <Form.Item
                    name="drivingLicense"
                    label="Driving License"
                    rules={[
                      { required: true, message: "Please enter your driving license number!" },
                      { max: 16, message: "Driving license cannot be longer than 16 characters!" },
                    ]}
                  >
                    <Input
                      placeholder="Enter Driving License Number"
                      value={drivingLicense}
                      onChange={(e) => setDrivingLicense(e.target.value)}
                      style={{ width: 200 }} // Making the input smaller
                      maxLength={16} // Limiting input to 16 characters
                    />
                  </Form.Item>
                )}

                <StripeCheckout
                  shippingAddress
                  token={onToken}
                  currency="inr"
                  amount={totalAmount * 100}
                  stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
                >
                  <Button className="btn1" htmlType="submit">
                    Book Now
                  </Button>
                </StripeCheckout>
              </Form>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2" key={slot.from}>
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
