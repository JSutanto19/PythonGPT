import {
  Box,
  Stack,
  styled,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { BiUpload, BiSend, BiMicrophone } from "react-icons/bi";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
  "& .MuiInputAdornment-root": {
    marginRight: "0px", // Adjusts spacing to the right of the icon
    alignItems: "left", // Ensures the icon is vertically centered
    marginLeft: "8px", // Adds a bit of spacing on the left side of the icon if needed
  },
}));

const ChatFooter = ({ onSendClick }) => {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInputValue(transcript);
    setIsListening(false);
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    setIsListening(false);
  };

  const handleVoiceClick = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSendClick = () => {
    if (onSendClick && inputValue.trim()) {
      onSendClick(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <Box
      p={2}
      sx={{
        height: 100,
        width: "100%",
        backgroundColor: "#F8FAFF",
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <StyledInput
          fullWidth
          placeholder="Ask a question"
          variant="filled"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={handleVoiceClick}
                  style={{ marginLeft: "-20px", marginBottom: "10px" }}
                >
                  <BiMicrophone color={isListening ? "red" : "grey"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: "#2196f3",
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton onClick={handleSendClick}>
              <BiSend color="white" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ChatFooter;