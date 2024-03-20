import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../CSS/SendMessageModal.css';// Import CSS file

const SendMessageModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        recipient: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const sendMessage = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }

            const requestBody = {
                recipient: formData.recipient,
                subject: formData.subject,
                message: formData.message
            };

            await axios.post('https://autobotzi-ccec90c77ecb.herokuapp.com/mail/send', requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Message sent successfully!");
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevent click event from reaching underlying dialog
    };

    return (
        <div className={`send-message-overlay ${isOpen ? 'visible' : ''}`} onClick={handleOverlayClick}>
            <Dialog visible={isOpen} onHide={onClose} className="send-message-dialog" modal header="Send Message" closeOnEscape={false}>
                <div className="send-message-content">
                    <div className="send-message-field">
                        <label htmlFor="recipient">Recipient</label>
                        <input id="recipient" type="text" name="recipient" value={formData.recipient} onChange={handleChange} />
                    </div>
                    <div className="send-message-field">
                        <label htmlFor="subject">Subject</label>
                        <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} />
                    </div>
                    <div className="send-message-field">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} />
                    </div>
                    <div className="send-message-button">
                        <Button label="Send" onClick={sendMessage} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default SendMessageModal;
