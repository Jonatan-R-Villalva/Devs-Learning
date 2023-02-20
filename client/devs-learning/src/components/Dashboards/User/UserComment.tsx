import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material/";
import DoneIcon from "@mui/icons-material/Done";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";

interface CourseCommentProps {
  courseId: string;
  userId: any;
}

const CourseComment: React.FC<CourseCommentProps> = ({ courseId, userId }) => {
  //getCommentIfExists.

  const [comment, setComment] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí podrías enviar el comentario a tu backend o hacer lo que necesites
    setComment("");
    setShowInput(false);
  };

  return (
    <div>
      {!showInput && (
        <IconButton color="primary" onClick={handleButtonClick}>
          <ChatRoundedIcon />
        </IconButton>
      )}

      {showInput && (
        <form onSubmit={handleSubmit}>
          <Box display="flex">
            <TextField
              label={"write your comment"}
              variant="outlined"
              value={comment}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <IconButton type="submit" color="primary">
              <DoneIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleButtonClick}>
              <CloseIcon />
            </IconButton>
          </Box>
        </form>
      )}
    </div>
  );
};

export default CourseComment;
