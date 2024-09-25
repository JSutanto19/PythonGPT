import React, { useRef, useState } from "react";
import { BiLogoAndroid, BiSolidCloudUpload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const fileInputRef = useRef(null);
  const [student, setStudent] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
    console.log("File selected:", file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5003/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  const navigate = useNavigate();

  const handleChatbotClick = () => {
    navigate("/chat");
  };

  return (
    <div className="card--container">
      {!student ? (
        <div className="card" onClick={triggerFileInput}>
          <div className="card--cover">
            <BiSolidCloudUpload />
          </div>
          <div className="card--title">
            <h2>Upload Files</h2>
          </div>
        </div>
      ) : null}
      <div className="card" onClick={handleChatbotClick}>
        <div className="card--cover">
          <BiLogoAndroid />
        </div>
        <div className="card--title">
          <h2>Ask Our Chatbot</h2>
        </div>
      </div>
      {/* Hidden file input for handling file uploads */}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Card;