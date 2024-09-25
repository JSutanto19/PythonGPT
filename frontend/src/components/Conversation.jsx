import {Box, Stack} from '@mui/material'
import React, { useState, useEffect, useRef} from 'react';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import Message from './Message';
import axios from 'axios';


const Conversation = () => {
  const [showMessages, setShowMessages] = useState(false);  // State to control the display of messages
  const [ques, setQues] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [answer, setAns] = useState(false);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [path1, setPath1] = useState("");
  const [lec, setLec] = useState("");
  const isFirstRender = useRef(true);

  const question = ques;

  const getAnswer = async (question) => {
    const questionData = { question: question };
    try {
        const response = await axios.post(
            "http://localhost:5004/forum",
            questionData,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data.answer;
    } catch (error) {
        console.error("There was an error!", error);
        return '';  // Return a default or error-specific value
    }
};

const getTimestamp = async (question) => {
    const questionData = { question: question };
    try {
      const response = await axios.post(
        "http://localhost:5002/forum2",
        questionData,
        { headers: { "Content-Type": "application/json" } }
      );
      return {
        time1: response.data.time1,
        time2: response.data.time2,
        title: response.data.title,
        imageUrl: `http://localhost:5002/images/${response.data.img_url}`
      };
    } catch (error) {
      console.error("There was an error!", error);
      return {};  // Return a default or error-specific value
    }
};


  //msg structure
  // {
  //   type: "msg",
  //   message: "What are variables in python?",
  //   incoming: false,
  //   outgoing: true,
  // },
  // {
  //   type: "msg",
  //   subtype: "img",
  //   message: "In Python, variables are symbolic names that reference or point to data stored in memory. They are used to hold values or information that may change during the execution of a program. A variable in Python is created by assigning a value to it using the assignment operator `=`. Python is dynamically typed, which means you do not need to declare the type of the variable when you create it. Python figures out the variable type based on the value assigned to it. Variables can store different types of data, such as numbers, strings, lists, dictionaries, functions, and more. They are case-sensitive and should start with a letter or underscore. The relevant timestamps are in 3:21 and 4:18 in Lecture 4",
  //   img: [img1],
  //   incoming: true,
  //   outgoing: false,
  // },

  const convertTime = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds
  };

  const filterMessages = (messages) => {
    return messages.filter((message) => {
        // Check for empty 'msg' type messages that are outgoing
        if (message.type === 'msg' && message.outgoing && message.message === "" && message.incoming === false) {
            return false; // Exclude from the results
        }
  
        // Check for 'img' type messages with incomplete timestamp information
        if (message.type === 'msg' && message.subtype === 'img' && message.incoming && message.img.includes('')) {
            return false; // Exclude from the results
        }

        // Check if message contains an apology phrase "I'm sorry"
        if (message.message.includes("I'm sorry")) {
            return false; // Exclude messages containing "I'm sorry"
        }
  
        // Return true if none of the above conditions match, hence include the message in the results
        return true;
    });
};


  const processMsgs = async (questionStr) => {
    const answer = await getAnswer(questionStr);
    const { time1, time2, title, imageUrl } = await getTimestamp(questionStr);
    const skip = convertTime(time1)

    // Update states for these fetched details
    setAns(answer);
    setTime1(time1);
    setTime2(time2);
    setLec(title);
    setPath1(imageUrl);

    // Create messages that are going to be added
    let addedMsg = { type: 'msg', message: questionStr, incoming: false, outgoing: true };
    let addedReply = {
      type: "msg",
      subtype: "img",
      message: `${answer}. The relevant timestamps are in ${time1.substring(3)} and ${time2.substring(3)} in ${title}`,
      img: [imageUrl],
      incoming: true,
      outgoing: false,
      lec: title,
      skip: skip,
    };

    // Use setMsgs to update the message list
    setMsgs(prevMsgs => {
        // First, add new messages to the array
        const newMsgs = [...prevMsgs, addedMsg, addedReply];
        const filter = filterMessages(newMsgs)
        
        // Then filter out unwanted messages based on specified criteria
        return filter;
    });
};


useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }
    processMsgs(ques); // Ensure the current question is passed
}, [ques]);



  const handleSendClick = async (msgStr) => {
    setQues(msgStr); // Set the question
    // await processMsgs(msgStr); // Process messages after setting question
    setShowMessages(true); // Show messages
  };

  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
        <ChatHeader />
        <Box width={'100%'} height={'550px'} sx={{ borderLeft:1, borderRight:1, borderColor:'#F8FAFF',}}>
            {showMessages && <Message msgs={msgs}/>}
        </Box>
        <ChatFooter onSendClick={handleSendClick}/>
    </Stack>
  )
}

export default Conversation