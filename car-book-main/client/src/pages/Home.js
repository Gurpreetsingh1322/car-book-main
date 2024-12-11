// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import DefaultLayout from '../components/DefaultLayout';
// import { getAllCars } from '../redux/actions/carsActions';
// import { Col, Row, DatePicker, Input, message } from 'antd';
// import { Link } from 'react-router-dom';
// import Spinner from '../components/Spinner';
// import moment from 'moment';

// const { RangePicker } = DatePicker;

// function Home() {
//   const { cars } = useSelector((state) => state.carsReducer);
//   const { loading } = useSelector((state) => state.alertsReducer);
//   const [totalCars, setTotalcars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');  // state for search query
//   const dispatch = useDispatch();

//   // Fetch all cars with search query on initial load or search change
//   useEffect(() => {
//     dispatch(getAllCars(searchQuery));  // Pass search query to the API
//   }, [dispatch, searchQuery]);

//   // Update totalCars when cars data from store changes
//   useEffect(() => {
//     setTotalcars(cars);
//   }, [cars]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);  // Update the search query
//   };

//   // Apply date filter and search filter
//   const setFilter = (values) => {
//     const [selectedFrom, selectedTo] = values;
//     let filteredCars = cars.filter((car) =>
//       car.name.toLowerCase().includes(searchQuery.toLowerCase())  // Apply the search filter first
//     );

//     let temp = [];
//     // Go through each car and apply the date filter
//     for (let car of filteredCars) {
//       if (car.bookedTimeSlots.length === 0) {
//         temp.push(car);  // If no bookings, add the car to available list
//       } else {
//         let isAvailable = true;

//         for (let booking of car.bookedTimeSlots) {
//           // Check if selected range overlaps with any bookings
//           if (
//             selectedFrom.isBetween(booking.from, booking.to, null, '[)') ||
//             selectedTo.isBetween(booking.from, booking.to, null, '(]') ||
//             booking.from.isBetween(selectedFrom, selectedTo, null, '[)') ||
//             booking.to.isBetween(selectedFrom, selectedTo, null, '(]')
//           ) {
//             isAvailable = false;  // Car is not available during this time range
//             break;
//           }
//         }

//         if (isAvailable) {
//           temp.push(car);  // Add car to available list if no booking conflict
//         }
//       }
//     }

//     setTotalcars(temp);  // Update the displayed list of cars
//   };

//   return (
//     <DefaultLayout>
//       {/* Search Bar */}
//       <Row className="mt-3" justify="center">
//         <Col lg={20} sm={24} className="d-flex justify-content-left">
//           <Input
//             placeholder="Search for cars by name"
//             value={searchQuery}
//             onChange={handleSearchChange}  // Update the search query state
//             style={{ width: '100%', marginBottom: 16 }}
//           />
//         </Col>
//       </Row>

//       {/* Date Range Picker */}
//       <Row className="mt-3" justify="center">
//         <Col lg={20} sm={24} className="d-flex justify-content-left">
//           <RangePicker
//             showTime={{ format: 'HH:mm' }}
//             format="MMM DD yyyy HH:mm"
//             onChange={setFilter}  // Apply both search and date filter
//           />
//         </Col>
//       </Row>

//       {loading && <Spinner />}  {/* Show spinner while loading cars */}

//       {/* Display Cars */}
//       <Row justify="center" gutter={16}>
//         {totalCars.length > 0 ? (
//           totalCars.map((car) => (
//             <Col lg={5} sm={24} xs={24} key={car._id}>
//               <div className="car p-2 bs1">
//                 <img src={car.image} className="carimg" alt={car.name} />

//                 <div className="car-content d-flex align-items-center justify-content-between">
//                   <div className="text-left pl-2">
//                     <p>{car.name}</p>
//                     <p>Rent Per Hour {car.rentPerHour} /-</p>
//                   </div>

//                   <div>
//                     <button className="btn1 mr-2">
//                       <Link to={`/booking/${car._id}`}>Book Now</Link>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           ))
//         ) : (
//           <Col span={24}>
//             <p>No cars available for the selected filters</p>
//           </Col>
//         )}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsActions';
import { Col, Row, DatePicker, Input, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');  // State to store the selected sort option
  const [priceSort, setPriceSort] = useState(''); // State for price sorting
  const dispatch = useDispatch();

  // Fetch all cars with search query on initial load or search change
  useEffect(() => {
    dispatch(getAllCars(searchQuery));  // Pass search query to the API
  }, [dispatch, searchQuery]);

  // Update totalCars when cars data from store changes
  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  // Update the search query
  };

  // Apply date filter and search filter
  const setFilter = (values) => {
    const [selectedFrom, selectedTo] = values;
    let filteredCars = cars.filter((car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase())  // Apply the search filter first
    );

    let temp = [];
    // Go through each car and apply the date filter
    for (let car of filteredCars) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);  // If no bookings, add the car to available list
      } else {
        let isAvailable = true;

        for (let booking of car.bookedTimeSlots) {
          // Check if selected range overlaps with any bookings
          if (
            selectedFrom.isBetween(booking.from, booking.to, null, '[)') ||
            selectedTo.isBetween(booking.from, booking.to, null, '(]') ||
            booking.from.isBetween(selectedFrom, selectedTo, null, '[)') ||
            booking.to.isBetween(selectedFrom, selectedTo, null, '(]')
          ) {
            isAvailable = false;  // Car is not available during this time range
            break;
          }
        }

        if (isAvailable) {
          temp.push(car);  // Add car to available list if no booking conflict
        }
      }
    }

    setTotalcars(temp);  // Update the displayed list of cars
  };

  // Handle sorting by name or price
  const handleSortChange = (value) => {
    setSortOption(value);
    let sortedCars = [...totalCars];
    
    if (value === 'az') {
      sortedCars.sort((a, b) => a.name.localeCompare(b.name)); // A to Z sort by name
    } else if (value === 'za') {
      sortedCars.sort((a, b) => b.name.localeCompare(a.name)); // Z to A sort by name
    }

    setTotalcars(sortedCars);  // Update the car list with sorted data
  };

  // Handle price sorting
  const handlePriceSort = (value) => {
    setPriceSort(value);
    let sortedCars = [...totalCars];

    if (value === 'asc') {
      sortedCars.sort((a, b) => a.rentPerHour - b.rentPerHour); // Sort price in ascending order
    } else if (value === 'desc') {
      sortedCars.sort((a, b) => b.rentPerHour - a.rentPerHour); // Sort price in descending order
    }

    setTotalcars(sortedCars);  // Update the car list with sorted data
  };

  return (
    <DefaultLayout>
      {/* Search Bar */}
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <Input
            placeholder="Search for cars by name"
            value={searchQuery}
            onChange={handleSearchChange}  // Update the search query state
            style={{ width: '100%', marginBottom: 16 }}
          />
        </Col>
      </Row>

      {/* Date Range Picker */}
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}  // Apply both search and date filter
          />
        </Col>
      </Row>

      {/* Sort Options */}
      <Row className="mt-3" justify="center">
        <Col lg={10} sm={24} className="d-flex justify-content-left">
          <Select
            style={{ width: '100%', marginBottom: 16 }}
            placeholder="Sort by Name"
            onChange={handleSortChange}  // Handle sorting by name
          >
            <Option value="az">A to Z</Option>
            <Option value="za">Z to A</Option>
          </Select>
        </Col>
        <Col lg={10} sm={24} className="d-flex justify-content-left">
          <Select
            style={{ width: '100%', marginBottom: 16 }}
            placeholder="Sort by Price"
            onChange={handlePriceSort}  // Handle sorting by price
          >
            <Option value="asc">Price Low to High</Option>
            <Option value="desc">Price High to Low</Option>
          </Select>
        </Col>
      </Row>

      {loading && <Spinner />}  {/* Show spinner while loading cars */}

      {/* Display Cars */}
      <Row justify="center" gutter={16}>
        {totalCars.length > 0 ? (
          totalCars.map((car) => (
            <Col lg={5} sm={24} xs={24} key={car._id}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" alt={car.name} />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{car.name}</p>
                    <p>Rent Per Hour {car.rentPerHour} /-</p>
                  </div>

                  <div>
                    <button className="btn1 mr-2">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <p>No cars available for the selected filters</p>
          </Col>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
