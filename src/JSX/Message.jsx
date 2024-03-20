import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import "../CSS/Message.css";
import PhotoProfile from "../Imagini/PhotoProfile.png";

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const userSet = new Set(messages.map(message => getMessageUserName(message.user)));
        setUniqueUsers(Array.from(userSet));
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }

            const response = await axios.get('https://autobotzi-ccec90c77ecb.herokuapp.com/notifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Messages received:", response.data); // Log the received messages

            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const getMessageUserName = (email) => {
        const atIndex = email.indexOf("@");
        if (atIndex !== -1) {
            return email.substring(0, atIndex);
        }
        return email;
    };

    const handleUserClick = (user) => {
        if (selectedUser === user) {
            setSelectedUser(null); // If the same user is clicked again, toggle to show all messages
        } else {
            setSelectedUser(user);
        }
    };

    const getMessageCountForUser = (user) => {
        return messages.filter(message => getMessageUserName(message.user) === user).length;
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = uniqueUsers.filter(user =>
        getMessageUserName(user).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="AdminContainer">
            <Navbar />
            <div className="MessageContainer">
                <div className="MessageBox">
                    {selectedUser ? (
                        messages
                            .filter(message => getMessageUserName(message.user) === selectedUser)
                            .map((message, index) => (
                                <div key={index} className="message-container">
                                    <p className="message">{message.message}</p>
                                    <p className="createdAt">{new Date(message.created_at).toLocaleString()}</p>
                                </div>
                            ))
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className="message-container">
                                <p className="message">{message.message}</p>
                                <p className="sender" onClick={() => handleUserClick(getMessageUserName(message.user))}>From: {getMessageUserName(message.user)}</p>
                                <p className="createdAt">{new Date(message.created_at).toLocaleString()}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="bottomMessage">
                    <button className="btn1"></button>
                    <input type="text" className="inputMessage"/>
                    <button  className="btn2"></button>
                    <button  className="btn3"></button>
                </div>
            </div>
            <div className="ContactListContainer">
                <div className="contactList">
                    <div className="searchContact">
                        <input type="text" className="inputSearchContact" placeholder="Search by name" value={searchQuery} onChange={handleSearchChange} />
                    </div>
                    {/* Display unique sender users with their names, profile images, and message count */}
                    {filteredUsers.map((user, index) => (
                        <div className="EmployeeRow" key={index}>
                            <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                            <div className="EmployeeInfo" onClick={() => handleUserClick(user)}>
                                <p className="EmployeeLstName">{user}</p>
                                <div className="MessageCount">{getMessageCountForUser(user)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Message;
