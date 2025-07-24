import { create } from "zustand";

export const useCallStore = create((set) => ({
    incomingCall : null,
    callAccepted : false,
    setIncomingCall: (call) => set({incomingCall: call}),
    acceptCall : () => set({callAccepted:true}),
    clearCall : () => set({incomingCall : null, callAccepted:false}),
}))