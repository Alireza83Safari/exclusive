import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import toast from "react-hot-toast";
import { appPicType } from "../../../types/AppPic.type";
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";
import { useCreateAppPicMutation } from "../../../Redux/apis/admin/appPicAdminApi";
import useHasAccess from "../../../hooks/useHasAccess";
import { appPicErrorType } from "../../../types/Error.type";

function AddAppPic() {
  const inintialAppPicState = {
    appPicType: 2,
    description: "",
    priority: null,
    title: "",
    url: "",
  } as appPicType;
  const { refetchAppPic } = useContext(AppPicContext) as appPicContextType;

  const [createAppPicValue, setCreateAppPicValue] =
    useState<appPicType>(inintialAppPicState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name, type } = event.target;
    setCreateAppPicValue({
      ...createAppPicValue,
      [name]: type === "number" ? +value : value,
    });
  };

  const { userHasAccess } = useHasAccess("action_app_pic_admin_create");

  const [createAppPic, { error: appPicError, isSuccess }] =
    useCreateAppPicMutation();

  const createAppPicHandler = () => {
    if (userHasAccess) {
      createAppPic(createAppPicValue);
    } else {
      toast.error("You Havent Access Create AppPic");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create AppPic Is Success");
      setCreateAppPicValue(inintialAppPicState);
      refetchAppPic();
    }
  }, [isSuccess]);

  const createAppPicError = appPicError as appPicErrorType;

  const getDisbledBtn = useMemo(() => {
    const { description, title, url } = createAppPicValue;
    if (description.length < 1 || title.length < 1 || url.length < 3) {
      return true;
    } else {
      return false;
    }
  }, [createAppPicValue]);

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
            marginY: "16px",
            fontWeight: "bold",
          }}
        >
          Create AppPic
        </Typography>
        <Typography variant="body1" className="text-red">
          {createAppPicError?.data?.message}
        </Typography>
        <TextField
          label="title"
          name="title"
          fullWidth
          value={createAppPicValue.title}
          sx={{ marginY: "12px" }}
          onChange={setInputValue}
        />
        <Typography variant="body1" className="text-red">
          {createAppPicError?.data?.errors?.title}
        </Typography>
        <TextField
          label="url"
          name="url"
          fullWidth
          value={createAppPicValue.url}
          sx={{ marginY: "12px" }}
          onChange={setInputValue}
        />
        <Typography variant="body1" className="text-red">
          {createAppPicError?.data?.errors?.url}
        </Typography>
        <TextField
          label="description"
          name="description"
          fullWidth
          value={createAppPicValue.description}
          sx={{ marginY: "12px" }}
          onChange={setInputValue}
        />
        <Typography variant="body1" className="text-red">
          {createAppPicError?.data?.errors?.description}
        </Typography>
        <TextField
          label="priority"
          name="priority"
          type="number"
          fullWidth
          value={createAppPicValue.priority}
          sx={{ marginY: "12px" }}
          onChange={setInputValue}
        />
        <Typography variant="body1" className="text-red">
          {createAppPicError?.data?.errors?.priority}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            width: "100%",
            paddingY: "12px",
            marginTop: "14px",
          }}
          onClick={createAppPicHandler}
          disabled={getDisbledBtn}
        >
          Add AppPic
        </Button>
      </Paper>
    </div>
  );
}

export default AddAppPic;
