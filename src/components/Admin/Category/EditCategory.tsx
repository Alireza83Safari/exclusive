import React, { useState, useEffect, useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  CategoryContext,
  categoryContextType,
} from "./Context/CayegoryContext";
import { TextField } from "@mui/material";
import { categoryType } from "../../../types/Category.type";
import {
  useEditCategoryMutation,
  useGetCategoryMutation,
} from "../../../Redux/apis/categoryApi";
import toast from "react-hot-toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function EditCategory() {
  const { openEditModal, setOpenEditModal, editCategoryId, refetchCategory } =
    useContext(CategoryContext) as categoryContextType;

  const inintialCategoryState = {
    code: "",
    name: "",
  };

  const [editCategoryValue, setEditCategoryValue] = useState<categoryType>(
    inintialCategoryState
  );

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditCategoryValue({ ...editCategoryValue, [name]: value });
  };

  const [editCategory, { error, isSuccess }] = useEditCategoryMutation();
  
  const [getCategory, { data: category, isSuccess: isSuccessGetCategory }] =
    useGetCategoryMutation();
    
  const editCategoryHandler = () => {
    editCategory({ id: editCategoryId, categoryInfo: editCategoryValue });
  };

  const editCategoryError = error?.data;

  const getDisbledBtn = useMemo(() => {
    const { name, code } = editCategoryValue;
    if (name.length < 1 || code.length < 1) {
      return true;
    } else {
      return false;
    }
  }, [editCategoryValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit Category Is Success");
      setOpenEditModal(false);
      refetchCategory();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editCategoryId) {
      getCategory(editCategoryId);
    }
  }, [editCategoryId]);

  useEffect(() => {
    if (isSuccessGetCategory && category) {
      setEditCategoryValue({
        ...editCategoryValue,
        name: category.name,
        code: category.code,
      });
    }
  }, [isSuccessGetCategory]);
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
            Edit Category
          </Typography>
          <Typography variant="body1" className="text-red">
            {editCategoryError?.message}
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={editCategoryValue.name}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editCategoryError?.errors?.name}
          </Typography>
          <TextField
            label="Code"
            name="code"
            fullWidth
            value={editCategoryValue.code}
            sx={{ marginY: "20px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {editCategoryError?.errors?.code}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
              paddingY: "12px",
              marginY: "18px",
            }}
            onClick={editCategoryHandler}
            disabled={getDisbledBtn}
          >
            Edit Category
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
