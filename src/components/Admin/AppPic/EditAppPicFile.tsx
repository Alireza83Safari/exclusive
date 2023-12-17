import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";
import { IconButton, Input, Modal, Paper } from "@mui/material";
import Spinner from "../../Spinner/Spinner";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useUploadImageMutation } from "../../../Redux/apis/user/fileUserApi";
import toast from "react-hot-toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  p: 3,
};

export const appPicTypeOptions = [
  { value: 0, label: "slider" },
  { value: 1, label: "section" },
  { value: 2, label: "bilbord" },
];

export default function EditAppPicFile() {
  const {
    openEditFileModal,
    setOpenEditFileModal,
    editAppPicId,
    refetchAppPic,
  } = useContext(AppPicContext) as appPicContextType;

  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  const [formData, setFormData] = useState<FormData>(new FormData());
  const { setShowAppPicFile } = useContext(AppPicContext) as appPicContextType;

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      setFormData(() => {
        const updatedFormData = new FormData();
        for (let i = 0; i < files.length; i++) {
          updatedFormData.append("fileUrl", files[i]);
        }
        return updatedFormData;
      });
      setSelectedFile(files);
    }
  };

  const [uploadImage, { isSuccess, isLoading, error }] =
    useUploadImageMutation();

  const uploadAppPicImage = () => {
    console.log("sdddd");

    if (selectedFile) {
      uploadImage({ itemId: editAppPicId, fileType: 3, images: formData });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowAppPicFile(false);
      refetchAppPic();
      toast.success("add image successfully");
    }
    if (error) {
      toast.error("please choose jpg , png ,jpeg file");
    }
  }, [isSuccess, error]);

  return (
    <Modal
      open={openEditFileModal}
      onClose={() => setOpenEditFileModal(false)}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        {isLoading ? (
          <div className="h-full">
            <Spinner />
          </div>
        ) : (
          <Paper
            style={{
              margin: "0 auto",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
              borderRadius: "12px",
            }}
            className="text-center p-4"
          >
            <Typography
              variant="h5"
              sx={{
                marginY: "16px",
                fontWeight: "bold",
                marginBottom: "30px",
              }}
            >
              Edit AppPic File
            </Typography>
            <Typography variant="body1" className="text-red"></Typography>
            <Input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: ".jpg, .jpeg, .png" }}
              style={{ display: "none" }}
            />
            <label htmlFor="file-input">
              <IconButton
                component="span"
                color="primary"
                aria-label="upload picture"
                title="Upload File"
              >
                <AttachFileIcon />
              </IconButton>
            </label>
          </Paper>
        )}

        <Button
          sx={{
            backgroundColor: "black",
            minWidth: "90%",
            color: "white",
            position: "absolute",
            bottom: "24px",
          }}
          onClick={uploadAppPicImage}
        >
          Add File
        </Button>
      </Box>
    </Modal>
  );
}
