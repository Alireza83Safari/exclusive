import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinner from "../../Spinner/Spinner";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteModal from "../DeleteModal";
import { CommentContext, commentContextType } from "./Context/CommentContext";
import { changeCommentStatusType } from "../../../types/Comment.type";
import { useDeleteCommentMutation } from "../../../Redux/apis/user/commentUserApi";
import { useChangeCommentStatusMutation } from "../../../Redux/apis/admin/commentAdminApi";
import Pagination from "../../Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { useSearch } from "../../../hooks/useSearch";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import useHasAccess from "../../../hooks/useHasAccess";

interface Column {
  id:
    | "index"
    | "productName"
    | "commentStatus"
    | "createAt"
    | "actions"
    | "rate"
    | "text"
    | "username";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "productName", label: "product" },
  { id: "commentStatus", label: "Status" },
  { id: "username", label: "username" },
  { id: "rate", label: "rate" },
  { id: "createAt", label: "createAt" },
  { id: "text", label: "text" },
  { id: "actions", label: "actions" },
];

function CommentTable() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCommentID, setDeleteCommentID] = useState("");
  const { comments, commentsLoading, refetchComments, total } = useContext(
    CommentContext
  ) as commentContextType;

  const [changeStatusId, setChangeStausId] = useState("");

  const [changeStatus, setChangeStatus] = useState({
    note: "test",
    status: null,
  } as changeCommentStatusType);

  const { userHasAccess: accessList } = useHasAccess(
    "action_comment_admin_list"
  );
  const { userHasAccess: accessDelete } = useHasAccess(
    "action_comment_change_status"
  );
  const [deleteComment, { isSuccess: deleteCommentStatus }] =
    useDeleteCommentMutation();

  const deleteCommentHandler = async (id: string) => {
    if (accessDelete) {
      deleteComment(id);
    } else {
      toast.error("You Havent Access Delete Comment");
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (deleteCommentStatus) {
      toast.success("Delete Comment Is Success");
      refetchComments();
      setShowDeleteModal(false);
    }
  }, [deleteCommentStatus]);

  const [changeCommentStatus, { isSuccess }] = useChangeCommentStatusMutation();

  useEffect(() => {
    if (changeStatusId) {
      changeCommentStatus({ id: changeStatusId, commentInfo: changeStatus });
    }
  }, [changeStatusId]);
  useEffect(() => {
    if (isSuccess) {
      refetchComments();
    }
  }, [isSuccess]);
  //////
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 8;
  const {} = usePagination(currentPage, pageSize);
  const totalPages = Math.ceil(total / pageSize);
  const changePageHandler = (id: number) => {
    setCurrentPage(id);
  };

  const { searchHandler } = useSearch();
  const setInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };
  const submitSearch = () => {
    setCurrentPage(1);
    searchHandler(searchQuery);
  };
  return (
    <div className="col-span-12 m-3 lg:order-1 order-2">
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          borderRadius: "12px",
        }}
      >
        <div className="h-8  md:mx-8 mb-4">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              onClick={submitSearch}
            />
            <TextField
              id="input-with-sx"
              label="search"
              variant="standard"
              onChange={setInputValue}
              value={searchQuery}
              onKeyPress={(e) => e.key === "Enter" && submitSearch()}
            />
          </Box>
        </div>
        <TableContainer sx={{ minHeight: 500 }}>
          {accessList ? (
            <Table stickyHeader aria-label="sticky table">
              {commentsLoading ? (
                <Spinner />
              ) : comments?.length ? (
                <>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} align="center">
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commentsLoading ? (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <Spinner />
                        </TableCell>
                      </TableRow>
                    ) : (
                      comments?.map((row: any, index: any) => (
                        <TableRow key={row.id}>
                          <TableCell style={{ width: 10 }} align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">
                            {row.productName}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: `${
                                row.commentStatus === 1
                                  ? `green`
                                  : row.commentStatus === 2
                                  ? `red`
                                  : ``
                              }`,
                            }}
                          >
                            {row.commentStatus === 1
                              ? "success"
                              : row.commentStatus === 2
                              ? "reject"
                              : ""}
                            {row.commentStatus === 0 && (
                              <div className="rounded-xl">
                                <button
                                  className="bg-green p-1 text-xs rounded-l-md"
                                  onClick={() => {
                                    setChangeStatus({
                                      ...changeStatus,
                                      status: 1,
                                    });
                                    setChangeStausId(row.id);
                                  }}
                                >
                                  accept
                                </button>
                                <button
                                  className="bg-red p-1 text-xs rounded-r-md"
                                  onClick={() => {
                                    setChangeStatus({
                                      ...changeStatus,
                                      status: 2,
                                    });
                                    setChangeStausId(row.id);
                                  }}
                                >
                                  reject
                                </button>
                              </div>
                            )}
                          </TableCell>
                          <TableCell align="center">{row.username}</TableCell>
                          <TableCell align="center">{row.rate}/5</TableCell>
                          <TableCell align="center">
                            {row.createdAt.slice(0, 10)}
                          </TableCell>
                          <TableCell align="center">
                            {row.text.slice(0, 20)}
                          </TableCell>
                          <TableCell
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            className="sm:mt-2 mt-2"
                          >
                            <FaTrash
                              className="text-red mr-3 cursor-pointer"
                              onClick={() => {
                                setDeleteCommentID(row.id);
                                setShowDeleteModal(true);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <p className="text-xl text-center font-semibold">
                      We couldn't find a comment with these specifications.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </Table>
          ) : (
            <Box sx={{ marginTop: "100px" }}>
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access Comments List
              </h1>
            </Box>
          )}
        </TableContainer>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePageHandler}
          />
        )}
      </Paper>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteCommentID}
          deleteUrl={deleteCommentHandler}
        />
      )}
    </div>
  );
}

export default CommentTable;
