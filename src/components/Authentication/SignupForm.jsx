import React, { useRef, useState } from "react";
import { signup } from "../../services/apiServices";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  // const pic = useRef(null);

  const {setUser} = ChatState();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userEmail = email.current.value;
    const userPassword = password.current.value;
    const userName = name.current.value;

    const data = await signup(userName,userEmail,userPassword);
    localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      navigate("/user/chats");
  }
  return (
    <div className="w-72">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <input
            ref={name}
            type="text"
            className="w-[100%] p-2 rounded-xl border-2 text-black text-md bg-gray-200"
            placeholder="Your Name"
            required
            name=""
            id="name"
          />
        </div>
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
            className={`w-[100%] p-2 rounded-xl border-2 text-black text-md bg-gray-200`}
            placeholder="Your Password"
            required
            name=""
            id="password"
          />
        </div>
        <div className="mb-2 space-x-2 flex items-center">
          <input type="checkbox" onClick={handleShowPassword} />
          <label>show Password</label>
        </div>   
        <button
          type="submit"
          className="w-[100%] p-2 border-none rounded-xl text-sm bg-blue-600
           text-white font-semibold cursor-pointer hover:opacity-75"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
