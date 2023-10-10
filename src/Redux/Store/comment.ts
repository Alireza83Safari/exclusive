import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";
import {
  changeCommentStatusType,
  commentStateType,
  commentType,
  getCommentType,
  getProductCommentsType,
} from "../../types/Comment.type";

export const getComment = createAsyncThunk(
  "comment/getWithId",
  async (
    { isAdmin, commentId }: { isAdmin: string; commentId: string },
    { dispatch }
  ) => {
    try {
      dispatch(commentReducer.actions.setLoading(true));
      const axiosInstance = isAdmin ? adminAxios : userAxios;
      const response = await axiosInstance.get(`/comment/${commentId}`);
      if (response.status === 200) {
        dispatch(commentReducer.actions.setComment(response.data));
        dispatch(commentReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(commentReducer.actions.setLoading(false));
    }
  }
);

export const getProductComments = createAsyncThunk(
  "comment/productComments",
  async (productId: string, { dispatch }) => {
    try {
      dispatch(commentReducer.actions.setLoading(true));

      const response = await userAxios.get(`/comment/${productId}`);
      if (response.status === 200) {
        dispatch(commentReducer.actions.setProductComments(response.data.data));
        dispatch(commentReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(commentReducer.actions.setLoading(false));
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/get",
  async (isAdmin: boolean, { dispatch }) => {
    try {
      dispatch(commentReducer.actions.setLoading(true));
      const axiosInstance = isAdmin ? adminAxios : userAxios;
      const response = await axiosInstance.get("/comment");
      if (response.status === 200) {
        dispatch(commentReducer.actions.setComments(response.data.data));
        dispatch(commentReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(commentReducer.actions.setLoading(false));
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/add",
  async (commentInfo: commentType, { dispatch }) => {
    try {
      dispatch(commentReducer.actions.setLoading(true));
      const response = await userAxios.post("/comment", commentInfo);
      if (response.status === 200) {
        toast.success("add comment is success");
        dispatch(commentReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(commentReducer.actions.setLoading(false));
    }
  }
);

export const editComment = createAsyncThunk(
  "comment/edit",
  async (
    { commentInfo, productId }: { commentInfo: commentType; productId: string },
    { dispatch }
  ) => {
    try {
      dispatch(commentReducer.actions.setLoading(true));
      const response = await userAxios.post(
        `/comment/edit/${productId}`,
        commentInfo
      );
      if (response.status === 200) {
        toast.success("edit comment is success");
        dispatch(commentReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(commentReducer.actions.setLoading(false));
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (commentId: string, { dispatch }) => {
    try {
      dispatch(commentReducer.actions.setLoading(true));
      const response = await userAxios.post(`/comment/delete/${commentId}`);
      if (response.status === 200) {
        toast.success("delete comment is success");
        dispatch(commentReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(commentReducer.actions.setLoading(false));
    }
  }
);

const commentReducer = createSlice({
  name: "comment",
  initialState: {
    commentLoading: false,
    comment: {} as getCommentType,
    comments: [] as getCommentType[],
    changeCommentStatus: {} as changeCommentStatusType,
    productComments: [] as getProductCommentsType[],
  } as commentStateType,

  reducers: {
    setLoading: (state, action) => {
      state.commentLoading = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setProductComments: (state, action) => {
      state.productComments = action.payload;
    },
    setStatus: (state, action) => {
      state.changeCommentStatus = action.payload;
    },
  },
});

export default commentReducer.reducer;
