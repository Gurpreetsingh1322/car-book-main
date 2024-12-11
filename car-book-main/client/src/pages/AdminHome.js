// // import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import { deleteCar, getAllCars } from "../redux/actions/carsActions";
// import { Col, Row, DatePicker, Input, Popconfirm } from "antd";
// import { Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import moment from "moment";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// const { RangePicker } = DatePicker;
// const { Search } = Input;

// function AdminHome() {
//   const { cars } = useSelector((state) => state.carsReducer);
//   const { loading } = useSelector((state) => state.alertsReducer);
//   const [totalCars, setTotalCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCars());
//   }, []);

//   useEffect(() => {
//     setTotalCars(cars);
//     setFilteredCars(cars); // Initialize with all cars
//   }, [cars]);

//   // Function to handle search input
//   const handleSearch = (value) => {
//     setSearchQuery(value);

//     if (value) {
//       const filtered = totalCars.filter((car) =>
//         car.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredCars(filtered);
//     } else {
//       setFilteredCars(totalCars); // If search is empty, show all cars
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Row justify="center" gutter={16} className="mt-2">
//         <Col lg={20} sm={24}>
//           <div className="d-flex justify-content-between align-items-center">
//             <h3 className="mt-1 mr-2">Admin Panel</h3>
//             <button className="btn1">
//               <a href="/addcar">ADD CAR</a>
//             </button>
//           </div>
//         </Col>
//       </Row>

//       {/* Search Bar */}
//       <Row justify="center" className="mb-4">
//         <Col lg={20} sm={24}>
//           <Search
//             placeholder="Search Cars by Name"
//             enterButton="Search"
//             size="large"
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//           />
//         </Col>
//       </Row>

//       {loading && <Spinner />}

//       {/* Displaying filtered cars */}
//       <Row justify="center" gutter={16}>
//         {filteredCars.map((car) => {
//           return (
//             <Col lg={5} sm={24} xs={24} key={car._id}>
//               <div className="car p-2 bs1">
//                 <img src={car.image} className="carimg" alt={car.name} />

//                 <div className="car-content d-flex align-items-center justify-content-between">
//                   <div className="text-left pl-2">
//                     <p>{car.name}</p>
//                     <p> Rent Per Hour {car.rentPerHour} /-</p>
//                   </div>

//                   <div className="mr-4">
//                     <Link to={`/editcar/${car._id}`}>
//                       <EditOutlined
//                         className="mr-3"
//                         style={{ color: "green", cursor: "pointer" }}
//                       />
//                     </Link>

//                     <Popconfirm
//                       title="Are you sure to delete this car?"
//                       onConfirm={() => {
//                         dispatch(deleteCar({ carid: car._id }));
//                       }}
//                       okText="Yes"
//                       cancelText="No"
//                     >
//                       <DeleteOutlined
//                         style={{ color: "red", cursor: "pointer" }}
//                       />
//                     </Popconfirm>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           );
//         })}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default AdminHome;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row, DatePicker, Input, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Search } = Input;

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
    setFilteredCars(cars); // Initialize with all cars
  }, [cars]);

  // Function to handle search input
  const handleSearch = (value) => {
    setSearchQuery(value);

    if (value) {
      const filtered = totalCars.filter((car) =>
        car.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(totalCars); // If search is empty, show all cars
    }
  };

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar">ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row justify="center" className="mb-4">
        <Col lg={20} sm={24}>
          <Search
            placeholder="Search Cars by Name"
            enterButton="Search"
            size="large"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
      </Row>

      {loading && <Spinner />}

      {/* Displaying filtered cars */}
      <Row justify="center" gutter={16}>
        {filteredCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24} key={car._id}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" alt={car.name} />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{car.name}</p>
                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
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
    </DefaultLayout>
  );
}

export default AdminHome;
