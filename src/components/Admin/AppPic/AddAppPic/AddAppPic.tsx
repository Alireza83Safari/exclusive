import { useEffect, useMemo, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import toast from "react-hot-toast";
import { appPic } from "../../../../types/appPic";
import { useCreateAppPicMutation } from "../../../../Redux/apis/admin/appPicAdminApi";
import useHasAccess from "../../../../hooks/useHasAccess";
import { appPicErrorType } from "../../../../types/error";
import { appPicOptions } from "../EditAppPic/EditAppPic";
import { AddAppPicProps } from "./AddAppPic.interface";
import { AddAppPicSkeleton } from "../../../";

function AddAppPic(props: AddAppPicProps) {
  const inintialAppPicState = {
    appPicType: null,
    description: "",
    priority: null,
    title: "",
    url: "",
  } as appPic;

  const { refetchAppPic, setCreateAppPicId, setShowAppPicFile } = props;

  const [createAppPicValue, setCreateAppPicValue] =
    useState<appPic>(inintialAppPicState);

  const setInputValue = (event: any) => {
    const { value, name, type } = event.target;
    setCreateAppPicValue({
      ...createAppPicValue,
      [name]: type === "number" || name === "appPicType" ? +value : value,
    });
  };

  const { userHasAccess } = useHasAccess("action_app_pic_admin_create");

  const [createAppPic, { error: appPicError, isSuccess, data, isLoading }] =
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
      setShowAppPicFile(true);
      setCreateAppPicId(data?.data);
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

  if (isLoading) {
    return <AddAppPicSkeleton />;
  }
  return (
    <div className="col-span-4 px-4 lg:min-h-full bg-white lg:h-[30rem] h-[16rem] rounded-lg mx-3 relative">
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
            marginY: "10px",
            fontWeight: "bold",
          }}
        >
          Create AppPic
        </Typography>
        <Typography variant="body1" className="text-red">
          {createAppPicError?.data?.message}
        </Typography>
        <Box>
          <TextField
            label="title"
            name="title"
            fullWidth
            value={createAppPicValue.title}
            sx={{ marginY: "7px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createAppPicError?.data?.errors?.title}
          </Typography>
        </Box>

        <Box>
          <TextField
            label="url"
            name="url"
            fullWidth
            value={createAppPicValue.url}
            sx={{ marginY: "7px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createAppPicError?.data?.errors?.url}
          </Typography>
        </Box>

        <Box>
          <TextField
            label="description"
            name="description"
            fullWidth
            value={createAppPicValue.description}
            sx={{ marginY: "7px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createAppPicError?.data?.errors?.description}
          </Typography>
        </Box>

        <Box>
          <TextField
            label="priority"
            name="priority"
            type="number"
            fullWidth
            value={createAppPicValue.priority}
            sx={{ marginY: "7px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createAppPicError?.data?.errors?.priority}
          </Typography>
        </Box>

        <Box>
          <Select
            label="appPicType"
            name="appPicType"
            fullWidth
            value={createAppPicValue.appPicType}
            sx={{ marginY: "7px" }}
            onChange={setInputValue}
          >
            {appPicOptions?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body1" className="text-red">
            {createAppPicError?.data?.errors?.appPicType}
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            width: "100%",
            paddingY: "12px",
            marginTop: "7px",
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
