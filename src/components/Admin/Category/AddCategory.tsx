import React, { useEffect, useMemo, useState, useContext } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { categoryType } from "../../../types/Category.type";
import toast from "react-hot-toast";
import {
  CategoryContext,
  categoryContextType,
} from "./Context/CayegoryContext";
import { useCreateCategoryMutation } from "../../../Redux/apis/admin/categoryAdminApi";

function AddCategory() {
  const inintialCategoryState = {
    code: "",
    name: "",
  };
  const [createCategoryValue, setCreateCategoryValue] = useState<categoryType>(
    inintialCategoryState
  );
  const { refetchCategory } = useContext(
    CategoryContext
  ) as categoryContextType;

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setCreateCategoryValue({ ...createCategoryValue, [name]: value });
  };

  const [createCategory, { error: categoryError, isSuccess }] =
    useCreateCategoryMutation();

  const createCategoryHandler = () => {
    createCategory(createCategoryValue);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("create category is success");
      setCreateCategoryValue(inintialCategoryState);
      refetchCategory();
    }
  }, [isSuccess]);

  const createCategoryError = categoryError?.data;

  const getDisbledBtn = useMemo(() => {
    const { name, code } = createCategoryValue;
    if (name.length < 1 || code.length < 1) {
      return true;
    } else {
      return false;
    }
  }, [createCategoryValue]);

  return (
    <div className="col-span-4 px-4">
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
            marginY: "13px",
            fontWeight: "bold",
          }}
        >
          Create Category
        </Typography>
        <Typography variant="body1" className="text-red">
          {createCategoryError?.message}
        </Typography>
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={createCategoryValue.name}
          sx={{ marginY: "20px" }}
          onChange={setInputValue}
        />
        <Typography variant="body1" className="text-red">
          {createCategoryError?.errors?.name}
        </Typography>
        <TextField
          label="Code"
          name="code"
          fullWidth
          value={createCategoryValue.code}
          sx={{ marginY: "20px" }}
          onChange={setInputValue}
        />
        <Typography variant="body1" className="text-red">
          {createCategoryError?.errors?.code}
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            width: "100%",
            paddingY: "12px",
            marginY: "18px",
          }}
          onClick={createCategoryHandler}
          disabled={getDisbledBtn}
        >
          Add Category
        </Button>
      </Paper>
    </div>
  );
}

export default AddCategory;
