import React from 'react';

function LogoutModal({ onClose, onConfirm ,text}) {
    return (
        <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center the modal vertically and horizontally
            zIndex: 9999
        }}>
            <div style={{
                width: "80%",
                maxWidth: "300px", // Limit the width on large screens
                border: "1px solid #ccc",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                textAlign: "center",
                boxSizing: "border-box"
            }}>
                <h5 style={{ marginBottom: "20px" }}>{text}</h5>
                <div>
                    <button 
                        onClick={onConfirm} 
                        className="btn btn-cancel"
                        style={{
                            padding: "10px 20px",
                            marginRight: "10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Yes
                    </button>
                    <button 
                        onClick={onClose} 
                        className="btn btn-primary"
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;
