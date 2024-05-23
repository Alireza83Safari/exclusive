import { useContext, useEffect, useState } from "react";
import { Button, Typography, Paper, Input } from "@mui/material";
import toast from "react-hot-toast";
import {
  BrandContext,
  brandContextType,
} from "../../../context/admin/brandContext";
import { adminAxios } from "../../../services/adminInterceptor";
import { brandUserApi } from "../../../Redux";

function AddBrandFile() {
  const [image, setImage] = useState([]);
  const {
    refetchBrands,
    createBrandId,
    showAddBrandFile,
    setShowAddBrand,
    setShowAddBrandFile,
  } = useContext(BrandContext) as brandContextType;
  const [addBrandImage, { isSuccess, error }] =
    brandUserApi.useAddBrandImageMutation();

  const createBrandHandler = () => {
    const imageFormData = new FormData();
    imageFormData.append("fileUrl", image[0]);
    addBrandImage({ itemId: createBrandId, image: imageFormData });
    adminAxios.post(`/file/uploadImage/${createBrandId}/2`, imageFormData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Add Brand File Is Success");
      setShowAddBrandFile(false);
      setShowAddBrand(true);
      refetchBrands();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error("please choose jpg , png ,jpeg file");
    }
  }, [error]);

  const setImageUploaded = (event: any) => {
    const files = event.target.files;
    if (files) {
      setImage(files);
    }
  };

  return (
    <>
      {showAddBrandFile ? (
        <div className="col-span-4 px-4 lg:min-h-full bg-white lg:h-[24rem] rounded-lg mx-3">
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
              Add Brand File
            </Typography>
            <Typography variant="body1" className="text-red"></Typography>
            <form action="" method="post">
              <Input type="file" onChange={setImageUploaded} />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  width: "100%",
                  paddingY: "10px",
                  marginTop: "14px",
                }}
                onClick={createBrandHandler}
              >
                Add Brand File
              </Button>
            </form>
          </Paper>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddBrandFile;
