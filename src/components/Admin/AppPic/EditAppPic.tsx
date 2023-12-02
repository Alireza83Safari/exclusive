import  { useState, useEffect, useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MenuItem, Select, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";
import { appPicType as appPicTypes } from "../../../types/AppPic.type";
import {
  useEditAppPicMutation,
  useGetAppPicMutation,
} from "../../../Redux/apis/admin/appPicAdminApi";
import { appPicErrorType } from "../../../types/Error.type";
import Spinner from "../../Spinner/Spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: 400,
  bgcolor: "background.paper",
  p: 3,
};

export const appPicTypeOptions = [
  { value: 0, label: "slider" },
  { value: 1, label: "section" },
  { value: 2, label: "bilbord" },
];

export default function EditAppPic() {
  const {
    openEditModal,
    setOpenEditModal,
    editAppPicId,
    refetchAppPic,
    setOpenEditFileModal,
  } = useContext(AppPicContext) as appPicContextType;

  const inintialAppPicState = {
    appPicType: 2,
    description: "",
    priority: null,
    title: "",
    url: "",
  } as appPicTypes;

  const [editAppPicValue, setEditAppPicValue] =
    useState<appPicTypes>(inintialAppPicState);

  const setInputValue = (event: any) => {
    const { value, name } = event.target;
    setEditAppPicValue({
      ...editAppPicValue,
      [name]: name === "appPicType" ? +value : value,
    });
  };

  const [editAppPic, { error, isSuccess,isLoading:editLoading }] = useEditAppPicMutation();

  const [
    getAppPic,
    { data: appPic, isSuccess: isSuccessGetAppPic, isLoading },
  ] = useGetAppPicMutation();

  const editAppPicHandler = () => {
    editAppPic({ id: editAppPicId, appPicInfo: editAppPicValue });
  };

  const editAppPicError = error as appPicErrorType;

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
      setOpenEditFileModal(true);
      setOpenEditModal(false);
      toast.success("Edit AppPic Is Success");
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
      const { appPicType, description, priority, title, url } = appPic;

      setEditAppPicValue({
        ...editAppPicValue,
        appPicType,
        description,
        priority,
        title,
        url,
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
          {isLoading ||editLoading? (
            <div className="h-full">
              <Spinner />
            </div>
          ) : (
            <>
              <Box>
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
                  {editAppPicError?.data?.message}
                </Typography>
              </Box>

              <Box>
                <TextField
                  label="title"
                  name="title"
                  fullWidth
                  value={editAppPicValue.title}
                  sx={{ marginY: "10px" }}
                  onChange={setInputValue}
                />
                <Typography variant="body1" className="text-red">
                  {editAppPicError?.data?.errors?.title}
                </Typography>
              </Box>

              <Box>
                <TextField
                  label="url"
                  name="url"
                  fullWidth
                  value={editAppPicValue.url}
                  sx={{ marginY: "10px" }}
                  onChange={setInputValue}
                />
                <Typography variant="body1" className="text-red">
                  {editAppPicError?.data?.errors?.url}
                </Typography>
              </Box>

              <Box>
                <TextField
                  label="description"
                  name="description"
                  fullWidth
                  value={editAppPicValue.description}
                  sx={{ marginY: "10px" }}
                  onChange={setInputValue}
                />
                <Typography variant="body1" className="text-red">
                  {editAppPicError?.data?.errors?.description}
                </Typography>
              </Box>

              <Box>
                <TextField
                  label="priority"
                  name="priority"
                  fullWidth
                  value={editAppPicValue.priority}
                  sx={{ marginY: "10px" }}
                  onChange={setInputValue}
                />
                <Typography variant="body1" className="text-red">
                  {editAppPicError?.data?.errors?.priority}
                </Typography>
              </Box>

              <Box>
                <Select
                  label="appPicType"
                  name="appPicType"
                  fullWidth
                  value={editAppPicValue.appPicType}
                  sx={{ marginY: "10px" }}
                  onChange={setInputValue}
                >
                  {appPicTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="body1" className="text-red">
                  {editAppPicError?.data?.errors?.appPicType}
                </Typography>
              </Box>
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
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
