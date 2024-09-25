import { Box, Stack } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { Chat_History } from '../data'
import { MediaMsg, TextMsg, Timeline } from './MsgTypes'

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
//   img2: [img2],
//   incoming: true,
//   outgoing: false,
// },
const Message = ({msgs}) => {
  return (
    <Box p={2} sx={{maxHeight:'500px', overflowY:'auto'}}>
        <Stack spacing={3}>
            {msgs.map((el)=>{
                switch(el.type){
                    case "divider":
                        return <Timeline el={el}/>
                    case 'msg':
                        switch(el.subtype){
                            case 'img':
                                return <MediaMsg el={el}/>

                            default:
                                return(<TextMsg el={el}/>)
                        }
                        break
                    default:
                        return <></>
                }
            })}
        </Stack>
    </Box>
  )
}

export default Message