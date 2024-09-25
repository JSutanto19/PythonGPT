import { Stack, Typography, useTheme, Divider, Box } from '@mui/material'
import React, {useState} from 'react'
import VideoPlayer from './VideoPlayer';

const MediaMsg = ({ el }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const theme = useTheme();


    const openModal = (timeInSeconds, lecture) => {
        setCurrentTime(timeInSeconds);  // Set the time to start the video from
        setShowModal(true);  // Open the modal to show the video
        console.log(typeof(timeInSeconds))
        console.log(lecture)
    };

    return (
        <Stack direction={'row'} justifyContent={el.incoming ? 'start' : 'end'}>
            <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default : theme.palette.primary.main,
                borderRadius: 1.5,
                width: 'max-content'
            }}>
                <Stack spacing={1}>
                    <Typography variant='body2' style={{ maxWidth: '50vw' }} color={el.incoming ? theme.palette.text.primary : "#ffff"}>
                        {el.message}
                    </Typography>
                    <Stack direction={'row'}>
                        <img 
                            onClick={() => openModal(el.skip, el.lec)} 
                            src={el.img[0]} // Assuming img is an array and using the first item
                            alt={el.message}
                            style={{ maxHeight: 310, borderRadius: '20px', maxWidth: 340, marginRight: '5px' }}
                        />
                    </Stack>
                    {showModal && (
                        <div style={{
                            position: 'fixed', 
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%)', 
                            zIndex: 10
                        }}>
                            {/* /Users/jason_sutanto/tagpt2/tagpt2/backend/timestamp-model/chapter1_1_lecture_materials.mp4 */}
                            <VideoPlayer src={el.lec+'.mp4'} startTime={currentTime} close={() => setShowModal(false)} />
                        </div>
                    )}
                </Stack>
            </Box>
        </Stack>
    );
}


const TextMsg = ({el}) => {
    const theme = useTheme();
  return (
    <Stack direction={'row'} justifyContent={el.incoming ? 'start':'end'}>
        <Box p={1.5} sx={{backgroundColor:el.incoming? theme.palette.background.default:theme.palette.primary.main, borderRadius:1.5, width:'max-content'}}>
            <Typography variant='body2' color={el.incoming ? theme.palette.text: "#ffff"}>{el.message}</Typography>
        </Box>
    </Stack>
  )
}


const Timeline = ({el}) => {
    const theme = useTheme();
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
        <Divider width="46%"/>
        <Typography variant='caption' sx={{color: theme.palette.text, marginLeft:'3px', marginRight:'3px'}}>{el.text}</Typography>
        <Divider width="46%"/>
    </Stack>
  )
}

export  {Timeline, TextMsg, MediaMsg}