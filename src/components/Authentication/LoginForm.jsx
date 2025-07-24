import React, { useRef, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiServices";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const { setUser } = ChatState();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = email.current.value;
    const userPassword = password.current.value;
    try {
      setLoading(true);
      setError("");
      const data  = await login(userEmail, userPassword);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      navigate("/user/chats");
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-72">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <input
            ref={email}
            type="email"
            className="w-[100%] p-2 rounded-xl border-2 text-black text-md bg-gray-200"
            placeholder="Your email address"
            required
            name=""
            id="email"
          />
        </div>
        <div className="input-group mb-2">
          <input
            ref={password}
            type={showPassword ? "password" : "text"}
            className="w-[100%] p-2 rounded-xl border-2 text-black text-md bg-gray-200"
            placeholder="Enter password"
            required
            name=""
            id="password"
          />
        </div>
        <div className="mb-2 space-x-2 flex items-center">
          <input type="checkbox" onClick={handleShowPassword} />
          <label>show Password</label>
        </div>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-[100%] p-2 my-1 border-none rounded-xl text-sm bg-blue-600 text-white font-semibold cursor-pointer hover:opacity-75"
        >
          {loading ? "Signing in..." : "SIGN IN"}
        </button>
        <button
          type="submit"
          className="w-[100%] p-2 my-1 border-none rounded-xl text-sm bg-orange-500 text-white font-semibold cursor-pointer hover:opacity-75"
        >
          SIGN IN AS GEUST USER
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
