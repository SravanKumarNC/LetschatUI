// import React, { useState } from "react";
// import { ChatState } from "../../../context/ChatProvider";
// import { getSender } from "../../../services/ChatLogics";
// import { useWindowWidth } from "../../../utils/useWindowWidth";
// import ProfileDp from "../../ProfileDp";
// import { IoArrowBack, IoCallOutline } from "react-icons/io5";
// import VideoCall from "../../VideoVoiceChat.jsx/VideoCall";

// const ChatHeader = () => {
//   const [isCalling, setIsCalling] = useState(false);
//   const { user, selectedChat, setSelectedChat } = ChatState();
//   const width = useWindowWidth();

//   const shouldShowBackButton = selectedChat && width < 600;
//   return (
//     <div className="w-full flex justify-between">
//       <div className="flex items-center space-x-4 ">
//         {shouldShowBackButton && (
//           <div className="cursor-pointer" onClick={() => setSelectedChat(null)}>
//             <IoArrowBack className="w-6 h-6" />
//           </div>
//         )}
//         <div className="">
//           <ProfileDp
//             name={
//               !selectedChat?.isGroupChat
//                 ? getSender(user, selectedChat?.users)
//                 : selectedChat?.chatName
//             }
//           />
//         </div>

//         <div className="flex flex-col w-full">
//           <div className="flex justify-between items-center">
//             <span className="font-medium">
//               {!selectedChat?.isGroupChat
//                 ? getSender(user, selectedChat?.users)
//                 : selectedChat?.chatName}
//             </span>
//           </div>
//           <span className="text-sm text-gray-400 truncate">
//             select to see contact info
//           </span>
//         </div>
//       </div>
//       {!selectedChat?.isGroupChat && (
//         <button onClick={() => setIsCalling(true)}>
//           <IoCallOutline className="w-5 h-5 text-green-400" />
//         </button>
//       )}
//       {isCalling && (
//         <VideoCall
//           peerId={selectedChat.users.find(u => u._id !== user._id)._id}
//           isInitiator={true}
//           onClose={() => setIsCalling(false)}
//         />
//       )}
      
//     </div>
//   );
// };

// export default ChatHeader;

// import React, { useState, useEffect, useRef } from "react";
// import { ChatState } from "../../../context/ChatProvider";
// import { getSender } from "../../../services/ChatLogics";
// import { useWindowWidth } from "../../../utils/useWindowWidth";
// import ProfileDp from "../../ProfileDp";
// import { IoArrowBack, IoCallOutline } from "react-icons/io5";
// import VideoCall from "../../VideoVoiceChat.jsx/VideoCall";
// import { socket } from "../../../services/socket"; // Ensure socket is imported here

// const ChatHeader = () => {
//   const [isCalling, setIsCalling] = useState(false);
//   const [incomingCall, setIncomingCall] = useState(null);
//   const { user, selectedChat, setSelectedChat } = ChatState();
//   const width = useWindowWidth();
//   const peerConnection = useRef(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   const shouldShowBackButton = selectedChat && width < 600;

//   useEffect(() => {
//     socket.on("incoming-call", ({ offer, caller }) => {
//       console.log("Received incoming-call in ChatHeader:", { offer, caller });
//       setIncomingCall({ offer, caller });
//       setIsCalling(true); // Show the video call UI
//     });

//     socket.on("call-accepted", (answer) => {
//       console.log("Received call-accepted in ChatHeader:", answer);
//       if (peerConnection.current) {
//         peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
//       }
//     });

//     socket.on("ice-candidate", (candidate) => {
//       if (peerConnection.current && candidate) {
//         peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     return () => {
//       socket.off("incoming-call");
//       socket.off("call-accepted");
//       socket.off("ice-candidate");
//       if (peerConnection.current) {
//         peerConnection.current.close();
//       }
//     };
//   }, []); // Add socket to the dependency array

//   const startCall = () => {
//     setIsCalling(true);
//     // The VideoCall component will now handle creating the offer and emitting 'call-user'
//   };

//   const handleCloseCall = () => {
//     setIsCalling(false);
//     setIncomingCall(null);
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
//     // Optionally emit an event to signal the end of the call to the other user
//   };

//   return (
//     <div className="w-full flex justify-between">
//       <div className="flex items-center space-x-4 ">
//         {shouldShowBackButton && (
//           <div className="cursor-pointer" onClick={() => setSelectedChat(null)}>
//             <IoArrowBack className="w-6 h-6" />
//           </div>
//         )}
//         <div className="">
//           <ProfileDp
//             name={
//               !selectedChat?.isGroupChat
//                 ? getSender(user, selectedChat?.users)
//                 : selectedChat?.chatName
//             }
//           />
//         </div>

//         <div className="flex flex-col w-full">
//           <div className="flex justify-between items-center">
//             <span className="font-medium">
//               {!selectedChat?.isGroupChat
//                 ? getSender(user, selectedChat?.users)
//                 : selectedChat?.chatName}
//             </span>
//           </div>
//           <span className="text-sm text-gray-400 truncate">
//             select to see contact info
//           </span>
//         </div>
//       </div>
//       {!selectedChat?.isGroupChat && !isCalling && (
//         <button onClick={startCall}>
//           <IoCallOutline className="w-5 h-5 text-green-400" />
//         </button>
//       )}

//       {isCalling && selectedChat && (
//         <VideoCall
//           peerId={incomingCall?.caller?.id || selectedChat.users.find(u => u._id !== user._id)._id}
//           isInitiator={!incomingCall} // If incomingCall is null, it's an outgoing call
//           onClose={handleCloseCall}
//           incomingCall={incomingCall}
//           peerConnectionRef={peerConnection}
//           localVideoRef={localVideoRef}
//           remoteVideoRef={remoteVideoRef}
//         />
//       )}
//     </div>
//   );
// };

// export default ChatHeader;


// ChatHeader.jsx
// import React, { useState, useEffect, useRef } from "react";
import { ChatState } from "../../../context/ChatProvider";
import { getSender } from "../../../services/ChatLogics";
import { useWindowWidth } from "../../../utils/useWindowWidth";
import ProfileDp from "../../ProfileDp";
import { IoArrowBack, IoCallOutline } from "react-icons/io5";
import VideoCall from "../../VideoVoiceChat.jsx/VideoCall";
// import { socket } from "../../../services/socket"; // Ensure socket is imported here

const ChatHeader = () => {
  // const [isCalling, setIsCalling] = useState(false);
  // const [incomingCall, setIncomingCall] = useState(null);
  const { user, selectedChat, setSelectedChat } = ChatState();
  const width = useWindowWidth();
  // const peerConnection = useRef(null);
  // const localVideoRef = useRef(null);
  // const remoteVideoRef = useRef(null);

  const shouldShowBackButton = selectedChat && width < 600;

  // useEffect(() => {
  //   socket.on("incoming-call", ({ offer, caller }) => {
  //     console.log("Received incoming-call in ChatHeader:", { offer, caller });
  //     setIncomingCall({ offer, caller });
  //     setIsCalling(true); // Show the video call UI
  //   });

  //   socket.on("call-accepted", (answer) => {
  //     console.log("Received call-accepted in ChatHeader:", answer);
  //     if (peerConnection.current) {
  //       peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
  //     }
  //   });

  //   socket.on("ice-candidate", (candidate) => {
  //     if (peerConnection.current && candidate) {
  //       console.log("Received ice-candidate in ChatHeader:", candidate);
  //       peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
  //     }
  //   });

  //   return () => {
  //     socket.off("incoming-call");
  //     socket.off("call-accepted");
  //     socket.off("ice-candidate");
  //     if (peerConnection.current) {
  //       if (peerConnection.current.signalingState !== 'closed') {
  //         peerConnection.current.close();
  //       }
  //       peerConnection.current = null;
  //     }
  //   };
  // }, [socket]);

  // const startCall = () => {
  //   setIsCalling(true);
  //   // The VideoCall component will now handle creating the offer and emitting 'call-user'
  // };

  // const handleCloseCall = () => {
  //   setIsCalling(false);
  //   setIncomingCall(null);
  //   if (peerConnection.current) {
  //     if (peerConnection.current.signalingState !== 'closed') {
  //       peerConnection.current.close();
  //     }
  //     peerConnection.current = null;
  //   }
  //   // Optionally emit an event to signal the end of the call to the other user
  // };

  return (
    <div className="w-full flex justify-between">
      <div className="flex items-center space-x-4 ">
        {shouldShowBackButton && (
          <div className="cursor-pointer" onClick={() => setSelectedChat(null)}>
            <IoArrowBack className="w-6 h-6" />
          </div>
        )}
        <div className="">
          <ProfileDp
            name={
              !selectedChat?.isGroupChat
                ? getSender(user, selectedChat?.users)
                : selectedChat?.chatName
            }
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {!selectedChat?.isGroupChat
                ? getSender(user, selectedChat?.users)
                : selectedChat?.chatName}
            </span>
          </div>
          <span className="text-sm text-gray-400 truncate">
            select to see contact info
          </span>
        </div>
      </div>
      {/* {!selectedChat?.isGroupChat && !isCalling && (
        <button onClick={startCall}>
          <IoCallOutline className="w-5 h-5 text-green-400" />
        </button>
      )} */}

      {/* {isCalling && selectedChat && (
        <VideoCall
          peerId={incomingCall?.caller?.id || selectedChat.users.find(u => u._id !== user._id)._id}
          isInitiator={!incomingCall} // If incomingCall is null, it's an outgoing call
          onClose={handleCloseCall}
          incomingCall={incomingCall}
          peerConnectionRef={peerConnection}
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
        />
      )} */}
    </div>
  );
};

export default ChatHeader;