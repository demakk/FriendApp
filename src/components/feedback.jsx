import React, { useState } from 'react';
import Backendless from 'backendless';

function Feedback() {
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackText, setFeedbackText] = useState('');

    const handleRadioChange = (event) => {
        setFeedbackType(event.target.value);
    };

    const handleTextChange = (event) => {
        setFeedbackText(event.target.value);
    };

    const handleSubmit = async () => {
        if (!feedbackType) {
            alert('Please select a feedback type');
            return;
        }

        if (!feedbackText.trim()) {
            alert('Please enter feedback details');
            return;
        }

        try {
            // Prepare message bodies (plain and html)
            const bodyParts = new Backendless.Bodyparts();
            bodyParts.textmessage = feedbackText;
            bodyParts.htmlmessage = `<p>${feedbackText}</p>`; // Adjust HTML formatting as needed

            // Send email using Backendless Messaging API
            await Backendless.Messaging.sendEmail(
                `Feedback: ${feedbackType}`, // Email subject
                bodyParts, // Message body parts
                ['dmytro.demchenko3@nure.ua'] // Recipient email address
            );

            console.log('Email sent successfully');
            alert('Feedback submitted successfully!');
            
            // Clear form after submission
            setFeedbackType('');
            setFeedbackText('');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to submit feedback. Please try again later.');
        }
    };

    return (
        <div className="form-container">
            <h2>Feedback Form</h2>
            <div className="feedback-radio">
                <label style={{ marginRight: '20px' }}>
                    <input
                        type="radio"
                        value="Error Notice"
                        checked={feedbackType === 'Error Notice'}
                        onChange={handleRadioChange}
                    />
                    Error Notice
                </label>
                <label>
                    <input
                        type="radio"
                        value="Suggestion"
                        checked={feedbackType === 'Suggestion'}
                        onChange={handleRadioChange}
                    />
                    Suggestion
                </label>
            </div>
            <div className='textarea-container'>
            <textarea className="textarea"
                placeholder="Enter your feedback details..."
                value={feedbackText}
                onChange={handleTextChange}
                rows={4}
                style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            </div>

            <button className="btn-submit" onClick={handleSubmit}>Submit Feedback</button>
        </div>
    );
}

export default Feedback;
