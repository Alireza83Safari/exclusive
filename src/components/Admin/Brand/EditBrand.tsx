import React, { useState, useEffect, useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { BrandContext, brandContextType } from "./Context/BrandContext";
import { brand } from "../../../types/brand";
import {
  useEditBrandMutation,
  useGetBrandMutation,
} from "../../../Redux/apis/admin/brandAdminApi";
import { brandErrorType } from "../../../types/error";
import Spinner from "../../Spinner/Spinner";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function EditBrand() {
  const { openEditModal, setOpenEditModal, editBrandId, refetchBrands } =
    useContext(BrandContext) as brandContextType;

  const inintialBrandState = {
    code: "",
    name: "",
  };

  const [editBrandValue, setEditBrandValue] =
    useState<brand>(inintialBrandState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditBrandValue({ ...editBrandValue, [name]: value });
  };

  const [editBrand, { error, isSuccess }] = useEditBrandMutation();

  const [getBrand, { data: brand, isSuccess: isSuccessGetBrand, isLoading }] =
    useGetBrandMutation();

  const editBrandHandler = () => {
    editBrand({ id: editBrandId, brandInfo: editBrandValue });
  };

  const editBrandError = error as brandErrorType;

  const getDisbledBtn = useMemo(() => {
    const { name, code } = editBrandValue;
    if (name.length < 1 || code.length < 1) {
      return true;
    } else {
      return false;
    }
  }, [editBrandValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit Brand Is Success");
      setOpenEditModal(false);
      refetchBrands();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editBrandId) {
      getBrand(editBrandId);
    }
  }, [editBrandId]);

  useEffect(() => {
    if (isSuccessGetBrand && brand) {
      setEditBrandValue({
        ...editBrandValue,
        name: brand.name,
        code: brand.code,
      });
    }
  }, [isSuccessGetBrand]);
  return (
    <div>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          {isLoading ? (
            <div className="min-h-[16rem] flex items-center">
              <Spinner />
            </div>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
                className="text-center"
              >
                Edit Brand
              </Typography>
              <Typography variant="body1" className="text-red">
                {editBrandError?.data?.message}
              </Typography>
              <TextField
                label="Name"
                name="name"
                fullWidth
                value={editBrandValue.name}
                sx={{ marginY: "20px" }}
                onChange={setInputValue}
              />
              <Typography variant="body1" className="text-red">
                {editBrandError?.data?.errors?.name}
              </Typography>
              <TextField
                label="Code"
                name="code"
                fullWidth
                value={editBrandValue.code}
                sx={{ marginY: "20px" }}
                onChange={setInputValue}
              />
              <Typography variant="body1" className="text-red">
                {editBrandError?.data?.errors?.code}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  width: "100%",
                  paddingY: "12px",
                  marginY: "18px",
                }}
                onClick={editBrandHandler}
                disabled={getDisbledBtn}
              >
                Edit Brand
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
