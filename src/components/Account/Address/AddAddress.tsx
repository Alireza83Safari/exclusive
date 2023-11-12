import { useEffect, useState } from "react";
import Input from "../../Input";
import reactDOM from "react-dom";
import { useCreateAddressMutation } from "../../../Redux/apis/user/addressUserApi";
import { addressType } from "../../../types/Address.type";
import { addressErrorType } from "../../../types/Error.type";
import toast from "react-hot-toast";

function AddAddress({ showCreateAddress, setShowCreateAddress }: any) {
  const [addressValue, setAddressValue] = useState<addressType>({
    address: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    plaque: 0,
    postalCode: "",
  });

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setAddressValue({
      ...addressValue,
      [name]: type === "number" ? +value : value,
    });
  };

  const [createAddress, { isSuccess, error }] = useCreateAddressMutation();
  const createAddressHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    createAddress(addressValue);
  };

  const addressError = error as addressErrorType;

  useEffect(() => {
    if (isSuccess) {
      toast.success("create address is success");
      setShowCreateAddress(false);
    }
  }, [isSuccess]);

  return reactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400 ${
        showCreateAddress ? "visible" : "invisible"
      }`}
    >
      <form
        className="max-w-[38rem] bg-white rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-center font-semibold text-xl my-3">
          Create New Address
        </h2>
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
              Error={addressError?.data?.errors?.firstName}
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
              Error={addressError?.data?.errors?.lastName}
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
              Error={addressError?.data?.errors?.nationalCode}
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
              Error={addressError?.data?.errors?.phoneNumber}
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
              Error={addressError?.data?.errors?.plaque}
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
              Error={addressError?.data?.errors?.postalCode}
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
              Error={addressError?.data?.errors?.address}
            />
          </div>

          <button
            className="bg-black text-white py-2 rounded-md mt-2"
            onClick={createAddressHandler}
          >
            create
          </button>

          <button
            className="border border-borderColor py-2 rounded-md mt-2"
            onClick={() => setShowCreateAddress(false)}
          >
            cancel
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("portal") as any
  );
}

export default AddAddress;
