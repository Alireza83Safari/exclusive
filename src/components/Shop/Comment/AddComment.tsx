import React, { useCallback, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateCommentMutation } from "../../../Redux/apis/user/commentUserApi";
import { comment } from "../../../types/comment";

type addCommentPropsType = {
  getCommentsProudct: (productId: string) => void;
};

function AddComment({ getCommentsProudct }: addCommentPropsType) {
  const { productId } = useParams();
  const [strengths, setStrengths] = useState<string[]>([]);
  const [strengthValue, setStrengthValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [rate, setRate] = useState<number | null>();
  const [weakPoints, setWeakPoints] = useState<string[]>([]);
  const [weakPointsValue, setWeakPointsValue] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(true);

  const addNewStrength = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (strengthValue.length) {
        e.preventDefault();
        setStrengths([...strengths, strengthValue]);
        setStrengthValue("");
      }
    },
    [strengths, strengthValue]
  );

  const addNewWeakPoints = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (weakPointsValue.length) {
        e.preventDefault();
        setWeakPoints([...weakPoints, weakPointsValue]);
        setWeakPointsValue("");
      }
    },
    [weakPoints, weakPointsValue]
  );

  const deleteWeakPoint = (index: number) => {
    const updatedWeakPoints = weakPoints.filter((_, i) => i !== index);
    setWeakPoints(updatedWeakPoints);
  };

  const deleteStrength = (index: number) => {
    const updatedStrengths = strengths.filter((_, i) => i !== index);
    setStrengths(updatedStrengths);
  };
  const [createComment, { isSuccess }] = useCreateCommentMutation();

  const addCommentHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const commentObj = {
      productId: productId,
      rate: rate,
      strengthPoints: strengths,
      text: commentValue,
      weakPoints: weakPoints,
    } as comment;
    createComment(commentObj);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("add comment is success");
      getCommentsProudct(String(productId));
      setRate(null);
      setCommentValue("");
      setStrengths([]);
      setWeakPoints([]);
      setIsCommentEmpty(true);
    }
  }, [isSuccess]);

  const commentRating = [1, 2, 3, 4, 5];
  useEffect(() => {
    setIsCommentEmpty(!commentValue || !rate);
  }, [commentValue, rate, strengths, weakPoints]);

  return (
    <div className="col-span-10 bg-gray w-full py-10">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:w-10/12 w-11/12 m-auto"
      >
        <textarea
          name="comment"
          value={commentValue}
          id="comment"
          cols={30}
          rows={3}
          className="border border-borderColor rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-sm"
          placeholder="Write your comment..."
          onChange={(e) => setCommentValue(e.target.value)}
        ></textarea>
        <fieldset className="mb-2">
          <legend className="text-sm text-gray-600">Choose Your Rate:</legend>
          <div className="flex items-center text-sm">
            {commentRating?.map((rating, index) => (
              <label key={index} className="mr-2">
                <input
                  type="radio"
                  name="rating"
                  className="focus:ring-blue-500 mx-1"
                  checked={rating === rate}
                  onChange={() => setRate(rating)}
                />

                {rating}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex">
          <div className="w-1/2">
            <div className="mt-4">
              <label className="block text-sm text-gray-600">Strengths:</label>
              <div className="flex items-center bg-white p-2 rounded-lg border border-borderColor bg-white-100 mr-2">
                <button className="md:text-2xl text-lg text-primary mr-2 ">
                  <FaPlus onClick={addNewStrength} className="text-green" />
                </button>

                <input
                  type="text"
                  value={strengthValue}
                  placeholder="Strengths"
                  className="md:py-1 text-sm outline-none w-full"
                  onChange={(e) => setStrengthValue(e.target.value)}
                />
              </div>
            </div>

            <ul className="p-1">
              {strengths?.map((strength, index) => (
                <li className="flex justify-between px-2 text-sm" key={index}>
                  <div>
                    <FaPlus className="text-green mr-2" />
                    {strength}
                  </div>
                  <button onClick={() => deleteStrength(index)}>
                    <FaTrash className="mr-2 text-red md:text-base text-sm" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2 mt-4">
            <div>
              <label className="block text-sm text-gray-600">WeakPoints:</label>
              <div className="flex items-center bg-white p-2 rounded-lg border border-borderColor bg-white-100 ml-2">
                <button className="text-2xl text-primary mr-2">
                  <FaMinus onClick={addNewWeakPoints} className="text-red" />
                </button>

                <input
                  type="text"
                  placeholder="WeakPoints"
                  className="md:py-1 text-sm outline-none w-full"
                  value={weakPointsValue}
                  onChange={(e) => setWeakPointsValue(e.target.value)}
                />
              </div>
            </div>

            <ul className="p-1">
              {weakPoints?.map((weakpoint, index) => (
                <li className="flex justify-between px-2 text-sm" key={index}>
                  <div>
                    <FaMinus className="text-red mr-2" />
                    {weakpoint}
                  </div>
                  <button
                    onClick={() => deleteWeakPoint(index)}
                    className="mr-2 text-red md:text-base text-sm"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className={` bg-black text-white font-semibold md:py-2 py-1 md:px-4 px-2 md:text-base text-sm mt-4 rounded-md focus:outline-none text-white-100 ${
            isCommentEmpty
              ? "bg-gray text-black cursor-not-allowed border border-borderColor"
              : "bg-black"
          }`}
          onClick={addCommentHandler}
          disabled={isCommentEmpty}
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}
export default React.memo(AddComment);
