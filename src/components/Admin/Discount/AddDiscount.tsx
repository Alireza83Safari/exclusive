import { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import toast from "react-hot-toast";
import useHasAccess from "../../../hooks/useHasAccess";
import {
  DiscountContext,
  discountContextType,
} from "../../../context/admin/discountContext";
import { discountAdminApi } from "../../../Redux/apis/admin/discountAdminApi";
import { CreateColorSkeleton } from "../../../skelton/admin/Color";
import { productUserApi } from "../../../Redux/apis/user/productUserApi";
import { userProductType } from "../../../types/product";
import { userAdminApi } from "../../../Redux/apis/admin/userAdminApi";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function AddDiscount() {
  const { refetchDiscount, discountType } = useContext(
    DiscountContext
  ) as discountContextType;
  const initialDiscountState = {
    code: null,
    expiresIn: null,
    productItemId: null,
    quantity: null,
    relatedUserId: null,
    type: null,
    value: null,
  } as any;

  const [createDiscountValue, setCreateDiscountValue] =
    useState(initialDiscountState);

  const { data: products } = productUserApi.useGetProductsUserQuery("");
  const { data: users } = userAdminApi.useGetUserListQuery("");

  const setInputValue = (event: any) => {
    const { value, name, type } = event.target;
    setCreateDiscountValue({
      ...createDiscountValue,
      [name]: type === "number" ? +value : value,
    });
  };

  const [createDiscount, { error: discountError, isSuccess, isLoading }] =
    discountAdminApi.useCreateDiscountMutation();

  const { userHasAccess } = useHasAccess("action_discount_admin_create");

  const createDiscountHandler = () => {
    if (userHasAccess) {
      createDiscount(createDiscountValue);
    } else {
      toast.error("You Haven't Access Create Discount");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create Discount Is Success");
      setCreateDiscountValue(initialDiscountState);
      refetchDiscount();
    }
  }, [isSuccess]);

  const creatediscountError = discountError as any;

  return (
    <div
      className={`col-span-4 px-3 ${discountType.length ? "block" : "hidden"} `}
    >
      {isLoading ? (
        <CreateColorSkeleton />
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
            Create Discount
          </Typography>

          <Typography variant="body1" className="text-red">
            {creatediscountError?.data?.message}
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              {discountType === "product" ? (
                <FormControl fullWidth>
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={createDiscountValue.productItemId}
                    label="product"
                    name="productItemId"
                    onChange={setInputValue}
                  >
                    {products?.data.map((product: userProductType) => (
                      <MenuItem key={product.itemId} value={product.itemId}>
                        {product?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body1" className="text-red">
                    {creatediscountError?.data?.errors?.name}
                  </Typography>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>User</InputLabel>
                  <Select
                    value={createDiscountValue.relatedUserId}
                    label="user"
                    name="relatedUserId"
                    onChange={setInputValue}
                  >
                    {users?.data.map((user: any) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user?.username}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body1" className="text-red">
                    {creatediscountError?.data?.errors?.name}
                  </Typography>
                </FormControl>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginTop: "14px" }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={createDiscountValue.type}
                  label="type"
                  name="type"
                  onChange={setInputValue}
                  className="min-w-full"
                >
                  <MenuItem value={0}>Price</MenuItem>
                  <MenuItem value={1}>Percent</MenuItem>
                </Select>
                <Typography variant="body1" className="text-red">
                  {creatediscountError?.data?.errors?.type}
                </Typography>
              </FormControl>
            </Grid>

            {discountType !== "product" && (
              <Grid item xs={12}>
                <Box>
                  <TextField
                    label="Code"
                    name="code"
                    fullWidth
                    value={createDiscountValue.code}
                    sx={{ marginY: "16px" }}
                    onChange={setInputValue}
                  />
                  <Typography variant="body1" className="text-red">
                    {creatediscountError?.data?.errors?.code}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ minWidth: "100%", marginY: "16px" }}
                  label="Expires In"
                  defaultValue={dayjs("2024-01-31T03:30:00Z")}
                  value={createDiscountValue.expiresIn}
                  onChange={(newDate) => {
                    setCreateDiscountValue({
                      ...createDiscountValue,
                      expiresIn: newDate ? dayjs(newDate) : null,
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  fullWidth
                  value={createDiscountValue.quantity}
                  sx={{ marginY: "16px" }}
                  onChange={setInputValue}
                />
                <Typography variant="body1" className="text-red">
                  {creatediscountError?.data?.errors?.quantity}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <TextField
                  label="Value"
                  name="value"
                  fullWidth
                  type="number"
                  value={createDiscountValue.value}
                  sx={{ marginY: "16px" }}
                  onChange={setInputValue}
                />
                <Typography variant="body1" className="text-red">
                  {creatediscountError?.data?.errors?.value}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
              paddingY: "12px",
              marginTop: "14px",
            }}
            onClick={createDiscountHandler}
          >
            Add Discount
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default AddDiscount;
