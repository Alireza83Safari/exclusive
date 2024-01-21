import React, { useContext, useEffect, useState } from "react";
import Input from "../../../Input";
import Spinner from "../../../Spinner/Spinner";
import SelectList from "../../../SelectList";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import { FaTrash } from "react-icons/fa";
import { productItemType } from "../../../../types/ProductItem.type";
import toast from "react-hot-toast";
import {
  useCreateProductItemMutation,
  useDeleteProductItemMutation,
  useEditProductItemMutation,
  useGetProductItemAdminMutation,
} from "../../../../Redux/apis/admin/productItemAdminApi";
import { useGetColorsSelectListQuery } from "../../../../Redux/apis/user/colorUserApi";
import { productItemErrorType } from "../../../../types/Error.type";

function ProductItemInfo() {
  const { editProductId, showEditItem } = useContext(
    ProductsContext
  ) as ProductsContextType;

  const [editItemID, setEditItemID] = useState<null | string>(null);
  const initialProductItemInfo = {
    colorId: "",
    isMainItem: true,
    price: null,
    productId: editItemID !== null ? editItemID : editProductId,
    quantity: null,
    status: 0,
    colorName: "",
    statusName: "",
  } as productItemType;

  const [EditItemValue, setEditItemValue] = useState(initialProductItemInfo);

  const [
    getProductItemAdmin,
    { data: productItem, isLoading: productItemLoading },
  ] = useGetProductItemAdminMutation();

  useEffect(() => {
    if (editProductId) {
      getProductItemAdmin(editProductId);
    }
  }, [editProductId]);

  const [editProductItem, { error: errorEditItem }] =
    useEditProductItemMutation();

  const [
    createProductItem,
    { isLoading: isLoadingCreateItem, error: createItemError },
  ] = useCreateProductItemMutation();

  const [
    deleteProductItem,
    { isLoading: isLoadingDeleteItem, isSuccess: isSuccessDelete },
  ] = useDeleteProductItemMutation();

  const { data: colors } = useGetColorsSelectListQuery("");

  const setInputValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setEditItemValue({
      ...EditItemValue,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const editItemData = async (id: string) => {
    let data = productItem.find((item: any) => item.id == id);

    setEditItemValue({
      ...EditItemValue,
      colorId: data?.colorId,
      price: data?.price,
      quantity: data?.quantity,
      status: data?.status,
      colorName: data?.color,
    });
  };

  const deleteItemHandler = (ID: string) => {
    deleteProductItem(ID);
  };
  useEffect(() => {
    if (isSuccessDelete) {
      getProductItemAdmin(editProductId);
      toast.success("delete productItem is success");
    }
  }, [isSuccessDelete]);

  const editProductItemHandler = async () => {
    if (editItemID !== null) {
      await editProductItem({
        id: String(editItemID),
        itemInfo: EditItemValue,
      })
        .unwrap()
        .then(() => {
          getProductItemAdmin(editProductId);
          toast.success("Edit product item is successful");
        });
    } else {
      await createProductItem(EditItemValue as any)
        .unwrap()
        .then(() => {
          getProductItemAdmin(editProductId);
          toast.success("Add product item is successful");
        });
    }
  };

  const addItemError = createItemError as productItemErrorType;
  const editItemError = errorEditItem as productItemErrorType;

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`p-6 relative w-[80vw] h-[35rem] max-h-[94%] overflow-auto ${
          showEditItem ? `visible` : `hidden`
        } `}
      >
        <div
          className={`grid grid-cols-4  overflow-auto gap-x-10 ${
            productItemLoading && "opacity-10"
          }`}
        >
          <div className="md:col-span-2 col-span-4 order-2">
            <p className="text-red text-center text-xs">
              {addItemError?.data?.message || editItemError?.data?.message}
            </p>
            <div className="grid grid-cols-2 gap-y-6">
              <div className="col-span-2">
                <label
                  htmlFor="colorId"
                  className="block text-gray-800 font-medium"
                >
                  color
                </label>

                <SelectList
                  options={colors?.data?.map((color: any) => ({
                    value: color.key,
                    label: color.value,
                  }))}
                  onChange={(selectedOptions) => {
                    setEditItemValue({
                      ...EditItemValue,
                      colorId: selectedOptions?.value,
                      colorName: selectedOptions?.label,
                    });
                  }}
                  value={{
                    value: EditItemValue?.colorId,
                    label: EditItemValue?.colorName,
                  }}
                />

                <p className="text-xs text-red">
                  {addItemError?.data?.errors?.colorId ||
                    editItemError?.data?.errors?.colorId}
                </p>
              </div>

              <div className="col-span-2">
                <Input
                  type="number"
                  labelText="quantity"
                  placeholder="Product quantity"
                  name="quantity"
                  className="border"
                  value={EditItemValue?.quantity}
                  onChange={setInputValues}
                  Error={
                    addItemError?.data?.errors?.quantity ||
                    editItemError?.data?.errors?.quantity
                  }
                  //callback={() => setAddProductItemError("")}
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="status"
                  className="block text-gray-800 font-medium"
                >
                  status
                </label>
                <SelectList
                  options={["Publish", "in Active"]?.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  onChange={(selectedOptions) => {
                    setEditItemValue({
                      ...EditItemValue,
                      status: selectedOptions?.value === "Publish" ? 0 : 1,
                    });
                  }}
                  defaultValue={{
                    value: EditItemValue?.status,
                    label: EditItemValue?.status == 0 ? "Publish" : "in Active",
                  }}
                />
                <p className="text-sm text-red-700">
                  {addItemError?.data?.errors?.status ||
                    editItemError?.data?.errors?.status}
                </p>
              </div>

              <div className="col-span-2">
                <Input
                  type="number"
                  labelText="price"
                  className="border"
                  placeholder="Product price"
                  name="price"
                  value={EditItemValue?.price}
                  onChange={setInputValues}
                  Error={
                    addItemError?.data?.errors?.price ||
                    editItemError?.data?.errors?.price
                  }
                  // callback={() => setAddProductItemError("")}
                />
              </div>

              <div className="col-span-2 mt-6">
                <button
                  className={`bg-black py-2 w-full rounded-lg text-white ${
                    productItemLoading && "py-4"
                  }`}
                  onClick={editProductItemHandler}
                >
                  {productItemLoading ? (
                    <Spinner />
                  ) : editItemID?.length ? (
                    "Edit Item"
                  ) : (
                    "Add Item"
                  )}
                </button>
              </div>
            </div>
          </div>

          {productItemLoading || isLoadingCreateItem || isLoadingDeleteItem ? (
            <Spinner />
          ) : (
            <div className="md:col-span-2 col-span-4 md:order-2">
              {productItem?.length ? (
                productItem?.map((item: any) => (
                  <div className="relative overflow-auto">
                    <div className="z-10">
                      <button
                        className="absolute right-2 top-2 z-20 "
                        onClick={() => deleteItemHandler(item.id)}
                      >
                        <FaTrash className="text-red" />
                      </button>
                    </div>
                    <div
                      className="grid grid-cols-2 sm:gap-y-4 gap-y-3 md:text-base text-sm border border-borderColor rounded-lg mb-6 px-10 py-4 relative hover:bg-gray-50 duration-300"
                      onClick={() => {
                        setEditItemID(item.id);
                        editItemData(item.id);
                      }}
                    >
                      <div className="font-semibold">productTitle :</div>
                      <div>{item?.productTitle}</div>
                      <div className="font-semibold">Product Color:</div>
                      <div>{item?.color}</div>
                      <div className="font-semibold">Price:</div>
                      <div>${item?.price}</div>
                      <div className="font-semibold">quantity:</div>
                      <div>{item?.quantity}</div>
                      <div className="font-semibold">productCode:</div>
                      <div>{item?.productCode}</div>
                      <div className="font-semibold">status:</div>
                      <div>{item?.status}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="border rounded-lg my-6 px-10 py-20 font-bold text-lg">
                  havent any product item for this
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default ProductItemInfo;
