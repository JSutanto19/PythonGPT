import Sidebar from './Sidebar'
import '/Users/jason_sutanto/tagpt2/tagpt2/frontend/src/styles/dashboard.css'
import {Box, Stack, ThemeProvider} from "@mui/material"
import Conversation from './Conversation'

const Chat = () => {
  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dashboard--content2'>
              <Stack direction={'row'} sx={{width:'100%'}}>
                <Box sx={{width: '100%', height: '100%', borderRadius: 1, backgroundColor:'white'}} >
                    <Conversation/>
                </Box>
              </Stack>
        </div>
    </div>
  )
}

export default Chat