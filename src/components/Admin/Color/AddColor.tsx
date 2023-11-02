import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import toast from "react-hot-toast";
import { colorType } from "../../../types/Color.type";
import { ColorContext, colorContextType } from "./Context/ColorContext";
import { useCreateColorMutation } from "../../../Redux/apis/admin/colorAdminApi";

function AddColor() {
  const inintialColorState = {
    code: "",
    colorHex: "",
    name: "",
  };
  const { refetchColor } = useContext(ColorContext) as colorContextType;

  const [createColorValue, setCreateColorValue] = useState<colorType>(inintialColorState);

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setCreateColorValue({ ...createColorValue, [name]: value });
  };

  const [createColor, { error: colorError, isSuccess }] = useCreateColorMutation();

  const createColorHandler = () => {
    createColor(createColorValue);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create Color Is Success");
      setCreateColorValue(inintialColorState);
      refetchColor();
    }
  }, [isSuccess]);

  const createColorError = colorError?.data;

  const getDisbledBtn = useMemo(() => {
    const { name, code, colorHex } = createColorValue;
    if (name.length < 1 || code.length < 1 || colorHex.length < 3) {
      return true;
    } else {
      return false;
    }
  }, [createColorValue]);

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
            marginY: "16px",
            fontWeight: "bold",
          }}
        >
          Create Color
        </Typography>
        <Typography variant="body1" className="text-red">
          {createColorError?.message}
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
          {createColorError?.errors.name}
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
          {createColorError?.errors.code}
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
          {createColorError?.errors.colorHex}
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
    </div>
  );
}

export default AddColor;
