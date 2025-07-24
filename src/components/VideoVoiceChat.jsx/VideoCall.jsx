// import { useEffect, useRef } from "react";
// import { socket } from "../../services/socket";

// const VideoCall = ({ peerId, isInitiator, onClose }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(null);

//   console.log(peerId);

//   useEffect(() => {
//     const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
//     peerConnection.current = new RTCPeerConnection(servers);

//     // GET Local media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream
//           .getTracks()
//           .forEach((track) => peerConnection.current.addTrack(track, stream));
//       });

//     // Handle remote stream
//     peerConnection.current.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     //send ICE candidates
//     peerConnection.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         socket.emit("ice-candidate", { to: peerId, candidate: e.candidate });
//       }
//     };

//     if (isInitiator) {
//       peerConnection.current.createOffer().then((offer) => {
//         peerConnection.current.setLocalDescription(offer);
//         socket.emit("call-user", {
//           targetUserId: peerId,
//           offer,
//           caller: {
//             id: socket.id,
//             name: "caller",
//           },
//         });
//       });
//     }
//     socket.on("incoming-call", ({ offer, caller }) => {
//       console.log("incoming-call", caller);
//       peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(offer)
//       );
//       console.log("incoming-call from", caller);
//       peerConnection.current.createAnswer().then((answer) => {
//         peerConnection.current.setLocalDescription(answer);
//         socket.emit("answer-call", { to: caller, signal: answer });
//       });
//     });

//     socket.on("call-accepted", (signal) => {
//       peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(signal)
//       );
//     });

//     socket.on("ice-candidate", (candidate) => {
//       peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//     });
//     return () => {
//       socket.off("incoming-call");
//       socket.off("call-accepted");
//       socket.off("ice-candidate");
//       peerConnection.current.close();
//     };
//   }, [peerId, isInitiator]);
//   return (
//     <div className="video-call-container">
//       <video ref={localVideoRef} autoPlay muted playsInline />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       <button onClick={onClose}>End Call</button>
//     </div>
//   );
// };
// export default VideoCall;

// import { useEffect, useRef } from "react";
// import { socket } from "../../services/socket";

// const VideoCall = ({ peerId, isInitiator, onClose }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(null);

//   console.log(peerId);

//   useEffect(() => {
//     const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
//     peerConnection.current = new RTCPeerConnection(servers);

//     // GET Local media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream
//           .getTracks()
//           .forEach((track) => peerConnection.current.addTrack(track, stream));
//       });

//     // Handle remote stream
//     peerConnection.current.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     //send ICE candidates
//     peerConnection.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         socket.emit("ice-candidate", { to: peerId, candidate: e.candidate });
//       }
//     };

//     if (isInitiator) {
//       peerConnection.current.createOffer().then((offer) => {
//         peerConnection.current.setLocalDescription(offer);
//         console.log("Emitting call-user with targetUserId:", peerId, "offer:", offer, "caller:", { id: socket.id, name: "caller" });
//         socket.emit("call-user", {
//           targetUserId: peerId,
//           offer,
//           caller: {
//             id: socket.id,
//             name: "caller",
//           },
//         });
//       });
//     }

//     socket.on("incoming-call", ({ offer, caller }) => {
//       console.log("Received incoming-call event:", { offer, caller });
//       peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(offer)
//       );
//       peerConnection.current.createAnswer().then((answer) => {
//         peerConnection.current.setLocalDescription(answer);
//         console.log("Emitting answer-call with to:", caller.id, "answer:", answer);
//         socket.emit("answer-call", { to: caller.id, answer });
//       });
//     });

//     socket.on("call-accepted", (answer) => {
//       console.log("Received call-accepted event:", answer);
//       peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(answer)
//       );
//     });

//     socket.on("ice-candidate", (candidate) => {
//       peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     return () => {
//       socket.off("incoming-call");
//       socket.off("call-accepted");
//       socket.off("ice-candidate");
//       peerConnection.current.close();
//     };
//   }, [peerId, isInitiator]);

//   return (
//     <div className="video-call-container">
//       <video ref={localVideoRef} autoPlay muted playsInline />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       <button onClick={onClose}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;

// import { useEffect } from "react";
// import { socket } from "../../services/socket";

// const VideoCall = ({
//   peerId,
//   isInitiator,
//   onClose,
//   peerConnectionRef,
//   localVideoRef,
//   remoteVideoRef,
//   incomingCall,
// }) => {
//   console.log(
//     "VideoCall component rendered with peerId:",
//     peerId,
//     "isInitiator:",
//     isInitiator
//   );

//   useEffect(() => {
//     const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
//     peerConnectionRef.current = new RTCPeerConnection(servers);

//     // GET Local media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream
//           .getTracks()
//           .forEach((track) =>
//             peerConnectionRef.current.addTrack(track, stream)
//           );
//       });

//     // Handle remote stream
//     peerConnectionRef.current.ontrack = (event) => {
//       console.log("ontrack event triggered", event);
//       console.log("Remote streams:", event.streams);
//       if (remoteVideoRef.current && event.streams && event.streams[0]) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//         console.log(
//           "Remote video source set:",
//           remoteVideoRef.current.srcObject
//         );
//       } else {
//         console.log("remoteVideoRef.current is null or no streams in event");
//       }
//     };

//     // Send ICE candidates
//     peerConnectionRef.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         socket.emit("ice-candidate", { to: peerId, candidate: e.candidate });
//       }
//     };

//     if (isInitiator && peerConnectionRef.current) {
//       peerConnectionRef.current
//         .createOffer()
//         .then((offer) => peerConnectionRef.current.setLocalDescription(offer))
//         .then(() => {
//           console.log(
//             "Emitting call-user with targetUserId:",
//             peerId,
//             "offer:",
//             peerConnectionRef.current.localDescription
//           );
//           socket.emit("call-user", {
//             targetUserId: peerId,
//             offer: peerConnectionRef.current.localDescription,
//             caller: { id: socket.id, name: "caller" },
//           });
//         })
//         .catch((error) => console.error("Error creating offer:", error));
//     } else if (peerConnectionRef.current && !isInitiator && incomingCall) {
//       peerConnectionRef.current
//         .setRemoteDescription(new RTCSessionDescription(incomingCall.offer))
//         .then(() => peerConnectionRef.current.createAnswer())
//         .then((answer) => peerConnectionRef.current.setLocalDescription(answer))
//         .then(() => {
//           console.log(
//             "Emitting answer-call to:",
//             incomingCall.caller.id,
//             "answer:",
//             peerConnectionRef.current.localDescription
//           );
//           socket.emit("answer-call", {
//             to: incomingCall.caller.id,
//             answer: peerConnectionRef.current.localDescription,
//           });
//         })
//         .catch((error) =>
//           console.error("Error handling incoming call:", error)
//         );
//     }

//     peerConnectionRef.current.onicegatheringstatechange = () => {
//       console.log(
//         `ICE gathering state: ${peerConnectionRef.current.icegatheringstate}`
//       );
//     };

//     peerConnectionRef.current.oniceconnectionstatechange = () => {
//       console.log(
//         `ICE connection state: ${peerConnectionRef.current.iceconnectionstate}`
//       );
//     };

//     return () => {
//       // Cleanup is now mostly handled in ChatHeader
//     };
//   }, [
//     peerId,
//     isInitiator,
//     peerConnectionRef,
//     localVideoRef,
//     remoteVideoRef,
//     incomingCall,
//   ]); // Keep refs in dependencies

//   return (
//     <div className="video-call-container">
//       <video ref={localVideoRef} autoPlay muted playsInline />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       <button onClick={onClose} className="text-white bg-amber-400">
//         End Call
//       </button>
//     </div>
//   );
// };

// export default VideoCall;


// VideoCall.jsx
import { useEffect } from "react";
import { socket } from "../../services/socket";

const VideoCall = ({
  peerId,
  isInitiator,
  onClose,
  peerConnectionRef,
  localVideoRef,
  remoteVideoRef,
  incomingCall,
}) => {
  console.log(
    "VideoCall component rendered with peerId:",
    peerId,
    "isInitiator:",
    isInitiator,
    "incomingCall:",
    incomingCall
  );

  useEffect(() => {
    const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    peerConnectionRef.current = new RTCPeerConnection(servers);

    // GET Local media
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream
          .getTracks()
          .forEach((track) =>
            peerConnectionRef.current.addTrack(track, stream)
          );
      })
      .catch((error) => console.error("Error getting user media:", error));

    // Handle remote stream
    peerConnectionRef.current.ontrack = (event) => {
      console.log("ontrack event triggered", event);
      console.log("Remote streams:", event.streams);
      if (remoteVideoRef.current && event.streams && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
        console.log(
          "Remote video source set:",
          remoteVideoRef.current.srcObject
        );
      } else {
        console.log("remoteVideoRef.current is null or no streams in event");
      }
    };

    // Send ICE candidates
    peerConnectionRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("Emitting ice-candidate", e.candidate);
        socket.emit("ice-candidate", { to: peerId, candidate: e.candidate });
      }
    };

    if (isInitiator && peerConnectionRef.current) {
      peerConnectionRef.current
        .createOffer()
        .then((offer) => peerConnectionRef.current.setLocalDescription(offer))
        .then(() => {
          console.log(
            "Emitting call-user with targetUserId:",
            peerId,
            "offer:",
            peerConnectionRef.current.localDescription
          );
          socket.emit("call-user", {
            targetUserId: peerId,
            offer: peerConnectionRef.current.localDescription,
            caller: { id: socket.id, name: "caller" },
          });
        })
        .catch((error) => console.error("Error creating offer:", error));
    } else if (peerConnectionRef.current && !isInitiator && incomingCall) {
      peerConnectionRef.current
        .setRemoteDescription(new RTCSessionDescription(incomingCall.offer))
        .then(() => peerConnectionRef.current.createAnswer())
        .then((answer) => peerConnectionRef.current.setLocalDescription(answer))
        .then(() => {
          console.log(
            "Emitting answer-call to:",
            incomingCall.caller.id,
            "answer:",
            peerConnectionRef.current.localDescription
          );
          socket.emit("answer-call", {
            to: incomingCall.caller.id,
            answer: peerConnectionRef.current.localDescription,
          });
        })
        .catch((error) =>
          console.error("Error handling incoming call:", error)
        );
    }

    peerConnectionRef.current.onicegatheringstatechange = () => {
      console.log(
        `ICE gathering state: ${peerConnectionRef.current.icegatheringstate}`
      );
    };

    peerConnectionRef.current.oniceconnectionstatechange = () => {
      console.log(
        `ICE connection state: ${peerConnectionRef.current.iceconnectionstate}`
      );
    };

    return () => {
      // Cleanup is mostly handled in ChatHeader
    };
  }, [
    peerId,
    isInitiator,
    peerConnectionRef,
    localVideoRef,
    remoteVideoRef,
    incomingCall,
  ]);

  return (
    <div className="video-call-container">
      <video ref={localVideoRef} autoPlay muted playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={onClose} className="text-white bg-amber-400">
        End Call
      </button>
    </div>
  );
};

export default VideoCall;