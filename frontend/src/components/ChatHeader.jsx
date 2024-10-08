import { Avatar, Box, Stack, Badge, styled, Typography, IconButton} from '@mui/material'
import React from 'react';
import {BiLogoAndroid} from 'react-icons/bi'

import { BiWindowClose, BiRefresh } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));


const ChatHeader = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/dashboard')
  }

  return (
    <Box p={2} sx={{height:100, width:'100%', backgroundColor:'#F8FAFF', boxShadow:'0px 0px 2px rgba(0,0,0,0.25)', borderTopLeftRadius:5, borderTopRightRadius:5}}>
            <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'} sx={{width:'100%', height:'100%'}}>
                <Stack direction={'row'} spacing={2}>
                    <Box>
                        <StyledBadge overlap='circular' anchorOrigin={{vertical:'bottom', horizontal:'right'}} variant='dot'>
                          <Avatar>
                            <BiLogoAndroid style={{ fontSize: '1.5rem' }} /> {/* Adjust the size as needed */}
                          </Avatar>                        
                        </StyledBadge> 
                    </Box>
                    <Stack spacing={0.2}>
                            <Typography variant='subtitle2'>TAGPT</Typography>
                            <Typography variant='caption'>Online</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <IconButton>
                        <BiRefresh/>
                    </IconButton>
                    <IconButton onClick={handleClose}>
                        <BiWindowClose/>
                    </IconButton>
                    
                </Stack>
            </Stack>
        </Box>
  );
};

export default ChatHeader;