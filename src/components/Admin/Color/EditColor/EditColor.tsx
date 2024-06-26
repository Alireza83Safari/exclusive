import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { color } from "../../../../types/color";
import {
  useEditColorMutation,
  useGetColorMutation,
} from "../../../../Redux/apis/admin/colorAdminApi";
import { colorErrorType } from "../../../../types/error";
import { EditColorProps } from "./EditColor.interface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function EditColor(props: EditColorProps) {
  const { openEditModal, setOpenEditModal, editColorId, refetchColor } = props;

  const inintialColorState = {
    code: "",
    name: "",
    colorHex: "",
  };

  const [editColorValue, setEditColorValue] =
    useState<color>(inintialColorState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditColorValue({ ...editColorValue, [name]: value });
  };

  const [editColor, { error, isSuccess }] = useEditColorMutation();

  const [getColor, { data: color, isSuccess: isSuccessGetColor }] =
    useGetColorMutation();

  const editColorHandler = () => {
    editColor({ id: editColorId, colorInfo: editColorValue });
  };

  const editColorError = error as colorErrorType;

  const getDisbledBtn = useMemo(() => {
    const { name, code } = editColorValue;
    if (name.length < 1 || code.length < 1) {
      return true;
    } else {
      return false;
    }
  }, [editColorValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit Color Is Success");
      setOpenEditModal(false);
      refetchColor();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editColorId) {
      getColor(editColorId);
    }
  }, [editColorId]);

  useEffect(() => {
    if (isSuccessGetColor && color) {
      setEditColorValue({
        ...editColorValue,
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
            Edit Color
          </Typography>
          <Typography variant="body1" className="text-red">
            {editColorError?.data?.message}
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={editColorValue.name}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editColorError?.data?.errors?.name}
          </Typography>
          <TextField
            label="Code"
            name="code"
            fullWidth
            value={editColorValue.code}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editColorError?.data?.errors?.code}
          </Typography>
          <TextField
            label="Color Hex"
            name="colorHex"
            fullWidth
            value={editColorValue.colorHex}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editColorError?.data?.errors?.colorHex}
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
            Edit Color
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
