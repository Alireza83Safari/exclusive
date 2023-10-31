import React, { useState, useEffect, useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";
import { appPicType } from "../../../types/AppPic.type";
import { useEditAppPicMutation, useGetAppPicMutation } from "../../../Redux/apis/admin/appPicAdminApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function EditAppPic() {
  const { openEditModal, setOpenEditModal, editAppPicId, refetchAppPic } =
    useContext(AppPicContext) as appPicContextType;

  const inintialAppPicState = {
    appPicType: 2,
    description: "",
    priority: null,
    title: "",
    url: "",
  } as appPicType;

  const [editAppPicValue, setEditAppPicValue] =
    useState<appPicType>(inintialAppPicState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditAppPicValue({ ...editAppPicValue, [name]: value });
  };

  const [editAppPic, { error, isSuccess }] = useEditAppPicMutation();

  const [getAppPic, { data: appPic, isSuccess: isSuccessGetAppPic }] =
    useGetAppPicMutation();

  const editAppPicHandler = () => {
    editAppPic({ id: editAppPicId, appPicInfo: editAppPicValue });
  };

  const editAppPicError = error?.data;

  const getDisbledBtn = useMemo(() => {
    const { description, title, url } = editAppPicValue;
    if (description.length < 1 || title.length < 1 || url.length < 3) {
      return true;
    } else {
      return false;
    }
  }, [editAppPicValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit AppPic Is Success");
      setOpenEditModal(false);
      refetchAppPic();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editAppPicId) {
      getAppPic(editAppPicId);
    }
  }, [editAppPicId]);

  useEffect(() => {
    if (isSuccessGetAppPic && appPic) {
      setEditAppPicValue({
        ...editAppPicValue,
        appPicType: appPic.appPicType,
        description: appPic.description,
        priority: appPic.priority,
        title: appPic.title,
        url: appPic.url,
      });
    }
  }, [isSuccessGetAppPic]);
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
            Edit AppPic
          </Typography>
          <Typography variant="body1" className="text-red">
            {editAppPicError?.message}
          </Typography>
          <TextField
            label="title"
            name="title"
            fullWidth
            value={editAppPicValue.title}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editAppPicError?.errors?.title}
          </Typography>
          <TextField
            label="url"
            name="url"
            fullWidth
            value={editAppPicValue.url}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editAppPicError?.errors?.url}
          </Typography>
          <TextField
            label="description"
            name="description"
            fullWidth
            value={editAppPicValue.description}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editAppPicError?.errors?.description}
          </Typography>
          <TextField
            label="priority"
            name="priority"
            fullWidth
            value={editAppPicValue.priority}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editAppPicError?.errors?.priority}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
              paddingY: "12px",
              marginY: "18px",
            }}
            onClick={editAppPicHandler}
            disabled={getDisbledBtn}
          >
            Edit AppPic
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
