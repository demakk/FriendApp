import React, { useEffect, useState } from "react";
import '../styles/popup-styles.css';
import Backendless from "backendless";


function ModalWindow({ file, closeModal }) {
    const [user, setUser] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleShare = async (username) => {
        try {
            const whereClause = `name = '${username}'`;
            const queryBuilder = await Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
            const [userByName] = await Backendless.Data.of('Users').find(queryBuilder);
            if (userByName) {
                const sourceURL = `${file.username}/${file.fileName}`;
                const targetURL = `${username}/Shared-folder`;
                const res = await Backendless.Files.copyFile(sourceURL, targetURL);
                console.log("File shared successfully");
                setSuccessMessage("File shared successfully!");
            } else {
                console.log("User does not exist");
                setSuccessMessage("User does not exist.");
            }
        } catch (err) {
            console.error(err);
            setSuccessMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="modal-wrapper" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}></button>
                <div className="form-content">
                    <p className="popup-element">File name - {file.fileName}</p>
                    <p className="popup-element">Now enter the recipient</p>
                    <form onSubmit={(e) => { e.preventDefault(); handleShare(user); }}>
                        <input
                            type="text"
                            value={user}
                            className="popup-element"
                            onChange={(event) => setUser(event.target.value)}
                        />
                        <button type="submit" className="btn-submit popup-element">Share</button>
                    </form>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;
