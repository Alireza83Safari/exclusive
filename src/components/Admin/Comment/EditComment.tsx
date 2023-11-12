/* import React, { useState, useEffect, useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { CommentContext, commentContextType } from "./Context/CommentContext";
import { commentType } from "../../../types/Comment.type";
import {
  useEditColorMutation,
  useGetColorMutation,
} from "../../../Redux/apis/admin/colorAdminApi";
import { useEditCommentMutation } from "../../../Redux/apis/user/commentUserApi";
import { commentErrorType } from "../../../types/Error.type";
import { useGetCommentsAdminQuery } from "../../../Redux/apis/admin/commentAdminApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function EditComment() {
  const { openEditModal, setOpenEditModal, editCommentId, refetchComments } =
    useContext(CommentContext) as commentContextType;

  const inintialCommentState = {
    productId: "",
    rate: 0,
    strengthPoints: [""],
    text: "",
    weakPonits: [""],
  } as commentType;

  const [editCommentValue, setEditCommentValue] =
    useState<commentType>(inintialCommentState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditCommentValue({ ...editCommentValue, [name]: value });
  };

  const [editComment, { error, isSuccess }] = useEditCommentMutation();

  const [getColor, { data: color, isSuccess: isSuccessGetColor }] =
    useGetComment();

  const editColorHandler = () => {
    editComment({ id: editCommentId, commentInfo: editCommentValue });
  };

  const editCommentError = error as commentErrorType;

  const getDisbledBtn = useMemo(() => {
    const { rate, text } = editCommentValue;
    if (rate || text.length < 10) {
      return true;
    } else {
      return false;
    }
  }, [editCommentValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit Color Is Success");
      setOpenEditModal(false);
      refetchComments();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editCommentId) {
      getColor(editCommentId);
    }
  }, [editCommentId]);

  useEffect(() => {
    if (isSuccessGetColor && color) {
      setEditCommentValue({
        ...editCommentValue,
        productId: "",
        rate: 0,
        strengthPoints: [""],
        text: "",
        weakPonits: [""],
        name: color.name,
        code: color.code,
        colorHex: color.colorHex,
      });
    }
  }, [isSuccessGetColor]);
  return (
    <div>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "10px",
              fontWeight: "bold",
            }}
            className="text-center"
          >
            Edit Comment
          </Typography>
          <Typography variant="body1" className="text-red">
            {editCommentError?.message}
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={editCommentValue.name}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editCommentError?.errors?.name}
          </Typography>
          <TextField
            label="Code"
            name="code"
            fullWidth
            value={editCommentValue.code}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editCommentError?.errors?.code}
          </Typography>
          <TextField
            label="Color Hex"
            name="colorHex"
            fullWidth
            value={editCommentValue.colorHex}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editCommentError?.errors?.colorHex}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
              paddingY: "12px",
              marginY: "18px",
            }}
            onClick={editColorHandler}
            disabled={getDisbledBtn}
          >
            Edit Comment
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
 */