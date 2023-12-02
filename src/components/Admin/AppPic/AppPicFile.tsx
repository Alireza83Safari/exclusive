import { useContext, useEffect, useState } from "react";
import { Typography, Paper, Input, IconButton, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useUploadImageMutation } from "../../../Redux/apis/user/fileUserApi";
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";
import toast from "react-hot-toast";
import Spinner from "../../Spinner/Spinner";

function AddAppPicFile() {
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const { showAppPicFile, createAppPicId, setShowAppPicFile } = useContext(
    AppPicContext
  ) as appPicContextType;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (selectedFile) {
      uploadImage({ itemId: createAppPicId, fileType: 3, images: formData });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("add image successfully");
      setShowAppPicFile(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error("please choose jpg , png ,jpeg file");
    }
  }, [error]);

  return (
    <>
      <div
        className={`col-span-4 px-4 lg:min-h-full bg-white lg:h-[30rem] h-[16rem] rounded-lg mx-3 relative ${
          showAppPicFile ? `block` : `hidden`
        }`}
      >
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
              Add AppPic File
            </Typography>
            <Typography variant="body1" className="text-red"></Typography>
            <Input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: ".jpg, .jpeg, .png" }} // Specify accepted file types
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
      </div>
    </>
  );
}

export default AddAppPicFile;
