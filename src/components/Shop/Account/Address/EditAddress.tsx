import { useEffect, useState } from "react";
import { Input } from "../../../../components";
import reactDOM from "react-dom";
import { address } from "../../../../types/address";
import { addressErrorType } from "../../../../types/error";
import toast from "react-hot-toast";
import { addressShema } from "../../../../validations/address";
import { addressUserApi } from "../../../../Redux";

function EditAddress({ setShowEditModal, editId }: any) {
  const initialState = {
    address: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    plaque: 0,
    postalCode: "",
  };
  const [addressValue, setAddressValue] = useState<address>(initialState);
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState<address>();

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setAddressValue({
      ...addressValue,
      [name]: type === "number" ? +value : value,
    });
  };

  const getFormIsValid = async () => {
    try {
      const isValid = await addressShema.validate(addressValue, {
        abortEarly: false,
      });
      if (isValid) {
        setFormIsValid(true);
      }
    } catch (error) {
      let errors = (error as any)?.inner?.reduce(
        (acc: any, error: any) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setErrors(errors);
    }
  };

  const [editAddress, { isSuccess, error }] =
    addressUserApi.useEditAddressMutation();

  const { data: address } = addressUserApi.useGetAddressWithIdQuery(editId);
  useEffect(() => {
    if (address) {
      setAddressValue({
        address: address?.address,
        firstName: address?.firstName,
        lastName: address?.lastName,
        nationalCode: address?.nationalCode,
        phoneNumber: address?.phoneNumber,
        plaque: address?.plaque,
        postalCode: address?.postalCode,
      });
    }
  }, [address]);

  const addressError = error as addressErrorType;

  /// cal editAddress when form is valid
  useEffect(() => {
    if (formIsValid) {
      editAddress({ id: editId, addressInfo: addressValue });
    }
  }, [formIsValid]);

  /// show toast when edit address is success
  useEffect(() => {
    if (isSuccess) {
      toast.success("create address is success");
      setShowEditModal(false);
    }
  }, [isSuccess]);

  return reactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400">
      <form
        className="max-w-[38rem] bg-white rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-center font-semibold text-xl my-3">Edit Address</h2>
        <p className="text-sm text-red">{addressError?.data?.message}</p>
        <div className="grid grid-cols-2 p-4 gap-5">
          <div>
            <Input
              labelText="firstName"
              placeholder="firstName"
              name="firstName"
              className="border"
              value={addressValue.firstName}
              onChange={setInputValue}
              Error={errors?.firstName || addressError?.data?.errors?.firstName}
            />
          </div>

          <div>
            <Input
              labelText="lastName"
              placeholder="lastName"
              name="lastName"
              className="border"
              value={addressValue.lastName}
              onChange={setInputValue}
              Error={errors?.lastName || addressError?.data?.errors?.lastName}
            />
          </div>

          <div>
            <Input
              labelText="nationalCode"
              placeholder="nationalCode"
              name="nationalCode"
              className="border"
              value={addressValue.nationalCode}
              onChange={setInputValue}
              Error={
                errors?.nationalCode || addressError?.data?.errors?.nationalCode
              }
            />
          </div>

          <div>
            <Input
              labelText="phoneNumber"
              placeholder="phoneNumber"
              name="phoneNumber"
              className="border"
              value={addressValue.phoneNumber}
              onChange={setInputValue}
              Error={
                errors?.phoneNumber || addressError?.data?.errors?.phoneNumber
              }
            />
          </div>

          <div>
            <Input
              type="number"
              labelText="plaque"
              placeholder="plaque"
              name="plaque"
              className="border"
              value={addressValue.plaque}
              onChange={setInputValue}
              Error={errors?.plaque || addressError?.data?.errors?.plaque}
            />
          </div>

          <div>
            <Input
              labelText="postalCode"
              placeholder="postalCode"
              name="postalCode"
              className="border"
              value={addressValue.postalCode}
              onChange={setInputValue}
              Error={
                errors?.postalCode || addressError?.data?.errors?.postalCode
              }
            />
          </div>

          <div className="col-span-2">
            <Input
              labelText="address"
              placeholder="address"
              name="address"
              className="border"
              value={addressValue.address}
              onChange={setInputValue}
              Error={errors?.address || addressError?.data?.errors?.address}
            />
          </div>

          <button
            className="bg-black text-white py-2 rounded-md mt-2"
            onClick={getFormIsValid}
          >
            edit
          </button>

          <button
            className="border border-borderColor py-2 rounded-md mt-2"
            onClick={() => setShowEditModal(false)}
          >
            cancel
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("portal") as any
  );
}

export default EditAddress;
