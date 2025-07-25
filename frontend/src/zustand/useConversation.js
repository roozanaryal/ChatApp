import {create} from "zustand"

const useConversation = create((set)=>({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),
    authUser: null,
    setAuthUser: (authUser) => set({ authUser }),
}))

export default useConversation;
