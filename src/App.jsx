// import {
//   createBrowserRouter,
//   Route,
//   RouterProvider,
//   Routes,
// } from "react-router-dom";
// import "./App.css";
// import Login from "./pages/Login";
// import ChatPage from "./pages/ChatPage";
// import MainLayout from "./layout/MainLayout";
// import ChatProvider from "./context/ChatProvider";

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />,
//     },
//     {
//       path: "/user",
//       element: <MainLayout />,
//       children: [{ path: "chats", element: <ChatPage /> }],
//     },
//   ]);
//   return (
//     <>
//       <ChatProvider>
//         <RouterProvider router={router} />
//       </ChatProvider>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import MainLayout from "./layout/MainLayout";
import ChatProvider from "./context/ChatProvider";
import { useSocketStore } from "./store/socketStore";
import { useEffect } from "react";
import { socket } from "./services/socket";
import { useWebRTC } from "./hooks/useWebRTC";

function App() {
  const { connectSocket, cleanupSocket } = useSocketStore();
  const {handleAnswer, addIceCandidate} = useWebRTC()
  useEffect(() => {
    connectSocket();

    return () => {
      cleanupSocket();
    };
  }, [connectSocket, cleanupSocket]);
  useEffect(() => {
    socket.on("incomming-call", ({from, offer, name}) => {
      console.log({from, offer, name});
    })
    socket.on("call-answered", ({answer}) => {
      handleAnswer(answer);
    })
    socket.on("ice-candidate", ({candidate}) => {
      addIceCandidate(candidate);
    })

    return () => {
      socket.off("incomming-call");
      socket.off("call-answered");
      socket.off("ice-candidate");

    }
  },[handleAnswer,addIceCandidate])
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<MainLayout />}>
            <Route path="/user/chats" element={<ChatPage />} />
          </Route>
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
