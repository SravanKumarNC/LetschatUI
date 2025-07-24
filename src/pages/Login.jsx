import React, { useEffect, useState } from "react";
import LoginForm from "../components/Authentication/LoginForm";
import SignupForm from "../components/Authentication/SignupForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState("login");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user){
      navigate("/user/chats");
    }
  },[navigate])

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="space-y-4 rounded-lg py-4">
        <div className="space-x-2">
          <button
            className={`rounded-md border-1  px-4 py-1 ${form == "login" ? "border-[#646cff]" : "border-transparent"} bg-[#1a1a1a] cursor-pointer hover:border-[#646cff]`}
            onClick={() => setForm("login")}
          >
            Login
          </button>
          <button
            className={`rounded-md border-1  px-4 py-1 ${form == "signup" ? "border-[#646cff]" : "border-transparent"} bg-[#1a1a1a] cursor-pointer hover:border-[#646cff]`}
            onClick={() => setForm("signup")}
          >
            Sign up
          </button>
        </div>
      </div>
      {form === "login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default Login;
