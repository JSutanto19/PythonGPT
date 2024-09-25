import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";
import { Modal, Box, TextField, Button } from '@mui/material';
import { BiAddToQueue, BiWindowClose, BiCommentEdit } from "react-icons/bi";
import img1 from "../assets/pic1.jpeg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";
import { BiLogoAndroid } from "react-icons/bi";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const QuestionDetail = () => {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState([]);
  const [rep, setRep] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [answer, setAns] = useState(false);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [path1, setPath1] = useState("");
  const [lec, setLec] = useState("");
 
 
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(-1);  // Reset the edit index to "add" mode
    setRep('');        // Clear the text field
  };

  const question = location.state?.question;

    const openModal = (timeInSeconds) => {
      setCurrentTime(timeInSeconds);
      setShowModal(true);
    };

    const convertTime = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    openModal(totalSeconds);
  };

    const getAnswer = async () => {
      const questionData = { question: question };
      try {
          const response = await axios.post(
              "http://localhost:5004/forum",
              questionData,
              {
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );
          setAns(response.data.answer);
      } catch (error) {
          console.error("There was an error!", error);
      }
    };

    const getTimestamp = async () => {
      const questionData = { question: question };
      try {
        const response = await axios.post(
          "http://localhost:5002/forum2",
          questionData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTime1(response.data.time1);
        setTime2(response.data.time2)
        setLec(response.data.title);
        const imageUrl = `http://localhost:5002/images/${response.data.img_url}`;
        setPath1(imageUrl);

        // console.log("img_url", imageUrl);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

  const handleConfirm = () => {
    if (editIndex >= 0) {
      // Editing existing reply
      const updatedReplies = replies.map((item, index) => 
        index === editIndex ? { ...item, duration: rep } : item
      );
      setReplies(updatedReplies);
    } else {
      // Adding new reply
      const newEntry = {
        image: img1,
        name: 'John Doe',
        duration: rep,
        cost: '100',
      };
      setReplies([...replies, newEntry]);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    setReplies(currentReplies => currentReplies.filter((_, i) => i !== index));
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setRep(replies[index].duration);  // Load the existing reply's duration into the text field
    handleOpen();  // Open the modal
  };

  // Retrieve the question from the location state (example only)
  // const question = location.state?.question || "Sample Question";

  useEffect(() => {
    // Example effect to populate replies or any other async logic
    const initialReplies = [
      {
        image: img1,
        name: 'John Doe',
        duration: '5 minutes',
        cost: '100',
      },
      {
        image: img1,
        name: 'Jane Smith',
        duration: '10 minutes',
        cost: '200',
      }
    ];
    setReplies(initialReplies);
       getAnswer();
       getTimestamp();

  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content2" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
        <div className="detail--card">
      <div className="username--profile">
      <img src={img1} alt="profile pic" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>John Doe</h1>
        <h2>Instructor</h2>
      </div>
    </div>
    <div className="question--div">
      <h1>Question:</h1>
      <h1>{question}</h1>
    </div>
  </div>

  <div className="detail--card2">
           <div className="username--profile">
           <div className="card--cover">
              <BiLogoAndroid />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
               <h1>TAGPT</h1>
               <h3>automated answered by TAGPT </h3>
             </div>
           </div>
          <div className="question--div">
             <h1>Answer:</h1>
            <h1>{answer}</h1>

             <h1 style={{ marginTop: "10px" }}>Timestamps:</h1>
             <h1>
               The relevant timestamps are in {time1.substring(3)} and {time2.substring(3)} in {lec}
             </h1>
             <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
               <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <img
                  style={{
                    width: "400px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                  src={path1} // This should be the URL, not the local file path
                  alt="Descriptive text"
                />
                <div style={{display:'flex', flexDirection:'row'}}>
                    <button
                    onClick={() => convertTime(time1)}
                    style={{
                        marginRight: "10px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        width: "100px",
                        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    >
                    Jump to {time1.substring(3)}
                    </button>
                    <button onClick={() => convertTime(time2)} style={{boxShadow:'2px 2px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'white', borderRadius:'5px', width:'100px'}}>
                        Jump to {time2.substring(3)}
                    </button>
                </div>
              </div>
            </div>

            {showModal && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <VideoPlayer
                  src={lec+'.mp4'}
                  startTime={currentTime}
                  close={() => setShowModal(false)}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
           <div
            onClick={() => {
              setEditIndex(-1);  // Reset to add mode
              setRep('');        // Clear the text field
              handleOpen();      // Open the modal
            }}
            style={{
              backgroundColor: '#dde6ed',
              borderRadius: '10px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 20px',
              height: '40px'
            }}
          >
            <span style={{ flex: '1 1 auto', textAlign: 'center', fontSize: '16px' }}>Add a reply</span>
            <BiAddToQueue style={{ flex: '0 0 auto', fontSize: '20px' }} />
          </div>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <TextField
              fullWidth
              value={rep}
              onChange={(e) => setRep(e.target.value)}
              label="Type your reply here"
              variant="outlined"
              margin="normal"
            />
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-around' }}>
              <Button onClick={handleConfirm} variant="contained" color="primary">
                {editIndex === -1 ? 'Add Reply' : 'Save Changes'}
              </Button>
              <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
            </div>
          </Box>
        </Modal>

        {replies.map((item, index) => (
          <div key={index} className='list' style={{ margin: '0px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: '0px', marginLeft: '5px', marginRight: '5px' }} className='teacher--detail'>
              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <h2 style={{ marginLeft: '40px' }}>{item.name}</h2>
              <span style={{ marginLeft: '60px' }} className='duration--text'>{item.duration}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <BiWindowClose onClick={() => handleDelete(index)} style={{ marginRight: '10px', cursor: 'pointer' }} />
              <BiCommentEdit onClick={() => openEditModal(index)} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetail;