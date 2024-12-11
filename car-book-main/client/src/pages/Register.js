// import React from "react";
// import { Row, Col, Form, Input } from "antd";
// import { Link } from "react-router-dom";
// import {useDispatch , useSelector} from 'react-redux'
// import { userRegister } from "../redux/actions/userActions";
// import AOS from 'aos';
// import Spinner from '../components/Spinner';
// import 'aos/dist/aos.css'; // You can also use <link> for styles
// // ..
// AOS.init()
// function Register() {
//   const dispatch = useDispatch()
//   const {loading} = useSelector(state=>state.alertsReducer)
//     function onFinish(values) {
//            dispatch(userRegister(values))
//            console.log(values)
//     }

//   return (
//     <div className="login">
//       {loading && (<Spinner />)}
//       <Row gutter={16} className="d-flex align-items-center">
//         <Col lg={16} style={{ position: "relative" }}>
//           <img 
//            className='w-100'
//            data-aos='slide-left'
//            data-aos-duration='1500'
//           src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" />
//           <h1 className="login-logo">SHEYCARS</h1>
//         </Col>
//         <Col lg={8} className="text-left p-5">
//           <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
//             <h1>Register</h1>
//             <hr />
//             <Form.Item
//               name="username"
//               label="Username"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="cpassword"
//               label="Confirm Password"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>

//             <button className="btn1 mt-2 mb-3">Register</button>
//             <br />

//             <Link to="/login">Click Here to Login</Link>
//           </Form>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Register;
import React from "react";
import { Row, Col, Form, Input, message } from "antd";
//import { useNavigate } from "react-router-dom"; // Using useNavigate for redirection
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { userLogin } from "../redux/actions/authActions"; // Updated action import
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css";

AOS.init();

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  //const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alertsReducer);

  async function onFinish(values) {
    try {
      await dispatch(userRegister(values)); // Register the user
      await dispatch(userLogin({ username: values.username, password: values.password })); // Auto-login
      message.success("Registration and login successful!");
      message.success("Registration and login successful!");
      //navigate("/");
      history.push("/"); // Redirect to homepage
    } catch (error) {
      message.error("Something went wrong!");
    }
  }

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            alt="Background"
          />
          <h1 className="login-logo">Coach Cars</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <button className="btn1 mt-2 mb-3">Register</button>
            <br />
            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;