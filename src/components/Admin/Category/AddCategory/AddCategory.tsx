import React, { useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { category } from "../../../../types/category";
import toast from "react-hot-toast";
import { useCreateCategoryMutation } from "../../../../Redux/apis/admin/categoryAdminApi";
import useHasAccess from "../../../../hooks/useHasAccess";
import { categoryErrorType } from "../../../../types/error";
import { AddCategoryProps } from "./AddCategory.interface";

function AddCategory(props: AddCategoryProps) {
  const { refetchCategory } = props;
  const inintialCategoryState = {
    code: "",
    name: "",
  };
  const [createCategoryValue, setCreateCategoryValue] = useState<category>(
    inintialCategoryState
  );

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setCreateCategoryValue({ ...createCategoryValue, [name]: value });
  };

  const [createCategory, { error: categoryError, isSuccess }] =
    useCreateCategoryMutation();

  const { userHasAccess: accessCreate } = useHasAccess(
    "action_category_admin_create"
  );

  const createCategoryHandler = () => {
    if (accessCreate) {
      createCategory(createCategoryValue);
    } else {
      toast.error("You Havent Access Create Category");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("create category is success");
      setCreateCategoryValue(inintialCategoryState);
      refetchCategory();
    }
  }, [isSuccess]);

  const createCategoryError = categoryError as categoryErrorType;

  const getDisbledBtn = useMemo(() => {
    const { name, code } = createCategoryValue;
    if (name.length < 1 || code.length < 1) {
      return true;
    } else {
      return false;
    }
  }, [createCategoryValue]);

  return (
    <div className="col-span-4 px-3">
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
          {createCategoryError?.status === 500 &&
            "get server error please try again later"}
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
          {createCategoryError?.data?.errors?.name}
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
          {createCategoryError?.data?.errors?.code}
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
