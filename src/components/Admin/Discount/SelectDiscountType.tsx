import { useContext, useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import {
  DiscountContext,
  discountContextType,
} from "./Context/DiscountContext";
import useHasAccess from "../../../hooks/useHasAccess";

export default function SelectDiscountType({}) {
  const [btnValue, setBtnValue] = useState("");
  const { userHasAccess } = useHasAccess("action_discount_admin_create");
  const { setDiscountType, discountType } = useContext(
    DiscountContext
  ) as discountContextType;

  const getButtonValueHandler = () => {
    if (userHasAccess) {
      setDiscountType(String(btnValue));
    } else {
      toast.error("You Havent Access");
    }
  };

  const selectButtonList = ["user", "product", "global"];

  return (
    <div
      className={
        discountType?.length
          ? "hidden"
          : "block bg-white md:py-5 py-2 rounded-xl mx-3 2xl:h-[33.9rem] lg:mb-0 mb-5"
      }
    >
      <span className="my-3 font-bold flex justify-center  2xl:text-2xl sm:text-xl text-[16px]">
        Add Discount
      </span>

      <div className="grid grid-cols-1 gap-10 sm:mt-8 mt-4 px-4">
        {selectButtonList.map((btn) => (
          <Button
            variant="outlined"
            size="medium"
            sx={{
              background: btnValue == btn ? "black" : "",
              color: btnValue == btn ? "white" : "",
              paddingY: "12px",
            }}
            onClick={() => setBtnValue(btn)}
          >
            {btn}
          </Button>
        ))}
      </div>

      <div className="flex justify-center lg:mt-12 mt-7">
        <button
          type="submit"
          className="bg-black text-white w-full 2xl:py-4 px-4 py-2 rounded-md disabled:bg-gray sm:text-base text-sm"
          onClick={getButtonValueHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
}
