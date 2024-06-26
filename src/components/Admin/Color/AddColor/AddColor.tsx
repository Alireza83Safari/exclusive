import React, { useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import toast from "react-hot-toast";
import { color } from "../../../../types/color";
import { useCreateColorMutation } from "../../../../Redux/apis/admin/colorAdminApi";
import useHasAccess from "../../../../hooks/useHasAccess";
import { colorErrorType } from "../../../../types/error";
import { AddColorProps } from "./AddColor.interface";
import Spinner from "../../../Share/Spinner/Spinner";

function AddColor(props: AddColorProps) {
  const { refetchColor } = props;
  const inintialColorState = {
    code: "",
    colorHex: "",
    name: "",
  };

  const [createColorValue, setCreateColorValue] =
    useState<color>(inintialColorState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setCreateColorValue({ ...createColorValue, [name]: value });
  };

  const [createColor, { error: colorError, isSuccess, isLoading }] =
    useCreateColorMutation();

  const { userHasAccess } = useHasAccess("action_color_admin_create");

  const createColorHandler = () => {
    if (userHasAccess) {
      createColor(createColorValue);
    } else {
      toast.error("You Havent Access Create Color");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create Color Is Success");
      setCreateColorValue(inintialColorState);
      refetchColor();
    }
  }, [isSuccess]);

  const createColorError = colorError as colorErrorType;

  const getDisbledBtn = useMemo(() => {
    const { name, code, colorHex } = createColorValue;
    if (name.length < 1 || code.length < 1 || colorHex.length < 3) {
      return true;
    } else {
      return false;
    }
  }, [createColorValue]);

  return (
    <div className="col-span-4 px-3">
      {isLoading ? (
        <Spinner />
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
            }}
          >
            Create Color
          </Typography>
          <Typography variant="body1" className="text-red">
            {createColorError?.data?.message}
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={createColorValue.name}
            sx={{ marginY: "16px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createColorError?.data?.errors?.name}
          </Typography>
          <TextField
            label="Code"
            name="code"
            fullWidth
            value={createColorValue.code}
            sx={{ marginY: "16px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createColorError?.data?.errors?.code}
          </Typography>
          <TextField
            type="color"
            label="Color Hex"
            name="colorHex"
            fullWidth
            value={createColorValue.colorHex}
            sx={{ marginY: "16px" }}
            onChange={setInputValue}
            style={{
              backgroundColor: createColorValue.colorHex,
              borderRadius: "4px",
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
          />

          <Typography variant="body1" className="text-red">
            {createColorError?.data?.errors?.colorHex}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
              paddingY: "12px",
              marginTop: "14px",
            }}
            onClick={createColorHandler}
            disabled={getDisbledBtn}
          >
            Add Color
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default AddColor;
