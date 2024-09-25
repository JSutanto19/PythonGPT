import Sidebar from './Sidebar'
// import '/Users/jason_sutanto/tagpt2/tagpt2/frontend/src/styles/dashboard.css'
import '../styles/dashboard.css'
import QuestionList from './QuestionList'
import img1 from '../assets/pic1.jpeg';
import img2 from '../assets/pic-2.jpeg'
import img3 from '../assets/pic-3.jpeg'
import { Button, Modal, Box, TextField  } from '@mui/material';
import { BiAddToQueue } from "react-icons/bi";
import React, { useState, useEffect } from 'react';

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

const Discussion = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [question, setQuestion] = useState('');

  const [teachersData, setTeachersData] = useState([
      {
        image: img1,
        name: 'John Doe',
        duration: 'What are variables in Python?',
        cost: '100',
      },
      {
        image: img3,
        name: 'Jane Doe',
        duration: 'How do I use a for loop in Python to iterate over a list?',
        cost: '100',
      },
      {
        image: img2,
        name: 'Jim Doe',
        duration: 'How many late days do we have for the course homeworks?',
        cost: '100',
      },
      {
        image: img2,
        name: 'Jim Doe',
        duration: 'How many assignments are their in the course?',
        cost: '100',
      },
      {
        image: img3,
        name: 'Jane Doe',
        duration: 'is there a late penalty for assignments?',
        cost: '100',
      },
  ]);


  useEffect(() => {
  }, [teachersData]);

  const handleConfirm = () => {
    const newEntry = {
      image: img1, // Make sure img1 is accessible here
      name: 'John Doe',
      duration: question,
      cost: '100',
    };
    setTeachersData(currentData => [...currentData, newEntry]);
    handleClose();
    setQuestion(''); // Clear the input after adding
  };

  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dashboard--content2'>
            <QuestionList mode={'class'} teachersData={teachersData} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <div onClick={handleOpen} style={{ backgroundColor: '#dde6ed', borderRadius: '10px', width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height:'40px'}}>
            <span style={{ flex: '1 1 auto', textAlign: 'center', fontSize:'16px'}}>Add a question</span>
            <BiAddToQueue style={{ flex: '0 0 auto', fontSize: '20px' }} />
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id="question"
              label="Type your question here"
              variant="outlined"
              margin="normal"
            />
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-around' }}>
              <Button variant="contained" color="primary" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
        </div>
    </div>
  )
}

export default Discussion