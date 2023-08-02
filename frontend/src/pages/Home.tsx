import Sidebar from "../components/Sidebar"
import ChatArea from "../components/ChatArea"
import React from "react"

export const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: "row" }}>
            <Sidebar />
            <ChatArea />
        </div>
    )
}