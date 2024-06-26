import React, { useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import toast from "react-hot-toast";
import { brand } from "../../../../types/brand";
import { useCreateBrandMutation } from "../../../../Redux/apis/admin/brandAdminApi";
import useHasAccess from "../../../../hooks/useHasAccess";
import { brandErrorType } from "../../../../types/error";
import { AddBrandProps } from "./AddBrand.interface";

function AddBrand(props: AddBrandProps) {
  const {
    refetchBrands,
    setShowAddBrand,
    setCreatedBrandId,
    setShowAddBrandFile,
  } = props;

  const inintialBrandState = {
    code: "",
    name: "",
  };

  const [createBrandValue, setcCeateBrandValue] =
    useState<brand>(inintialBrandState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setcCeateBrandValue({ ...createBrandValue, [name]: value });
  };

  const [createBrand, { error: brandError, isSuccess, data }] =
    useCreateBrandMutation();

  const { userHasAccess } = useHasAccess("action_brand_admin_create");

  const createBrandHandler = () => {
    if (userHasAccess) {
      createBrand(createBrandValue);
    } else {
      toast.error("You Havent Access Create Brand");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create Brand Is Success");
      setcCeateBrandValue(inintialBrandState);
      refetchBrands();
      setCreatedBrandId(data?.data);
      setShowAddBrand(false);
      setShowAddBrandFile(true);
    }
  }, [isSuccess]);

  const createbrandError = brandError as brandErrorType;

  const getDisbledBtn = useMemo(() => {
    const { name, code } = createBrandValue;
    if (name?.length < 1 || code?.length < 1) {
      return true;
    } else {
      return false;
    }
  }, [createBrandValue]);

  if (false) {
    //  return <AddBrandSkeleton />;
  }

  return (
    <>
      <div className="col-span-4 px-3 mt-3">
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
              marginY: "24px",
              fontWeight: "bold",
            }}
          >
            Create Brand
          </Typography>
          <Typography variant="body1" className="text-red">
            {createbrandError?.data?.message}
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={createBrandValue.name}
            sx={{ marginY: "28px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createbrandError?.data?.errors?.name}
          </Typography>
          <TextField
            label="Code"
            name="code"
            fullWidth
            value={createBrandValue.code}
            sx={{ marginY: "28px" }}
            onChange={setInputValue}
          />
          <Typography variant="body1" className="text-red">
            {createbrandError?.data?.errors?.code}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
              paddingY: "12px",
              marginTop: "20px",
            }}
            onClick={createBrandHandler}
            disabled={getDisbledBtn}
          >
            Add Brand
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default AddBrand;
