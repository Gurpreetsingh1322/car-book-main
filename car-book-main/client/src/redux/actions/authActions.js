import axios from "axios";
import { message } from "antd";

export const userLogin = (user) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", user);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({ type: "LOADING", payload: false });
    message.success("Login successful!");
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
    message.error("Login failed. Please check your credentials.");
  }
};