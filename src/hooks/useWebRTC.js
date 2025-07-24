import { useRef } from "react";
import { socket } from "../services/socket";
import { useCallStore } from "./useCallStore";


export const useWebRTC = (localUser, remoteUserId) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const {acceptCall} = useCallStore();

    const setupPeer = async() => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio:true});
        if(localVideoRef.current) localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection();
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        pc.ontrack = (event) => {
            if(remoteVideoRef.current){
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        }

        pc.onicecandidate = (e) => {
            if(e.candidate){
                socket.emit('ice-candidate', {
                    to : remoteUserId,
                    candidate : e.candidate,
                });
            }
        };
        peerConnectionRef.current = pc;
        return pc;
    }
    const callUser = async()=>{
        const pc = await setupPeer();
        const offer = await pc.createOffer();
        await pc.setLocalDiscription(offer);

        socket.emit("call-user",{
            to: remoteUserId,
            offer,
            from: localUser._id,
            name: localUser.name
        })
    }

    const answerCall = async (offer) =>{
        const pc = await setupPeer();
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit("answer-call",{
            to: remoteUserId,
            answer
        })
        acceptCall();
    }

    const handleAnswer = async(answer) => {
        await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(answer)
        )
    }

    const addIceCandidate = (candidate) => {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));

    }

    return {
        callUser,
        answerCall,
        handleAnswer,
        addIceCandidate,
        localVideoRef,
        remoteVideoRef,
    }
}