import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Spinner from "../../Spinner/Spinner";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteModal from "../DeleteModal";
import { CommentContext, commentContextType } from "./Context/CommentContext";
import {
  useChangeCommentStatusMutation,
  useDeleteCommentMutation,
} from "../../../Redux/apis/commentApi";
import { changeCommentStatusType } from "../../../types/Comment.type";

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
  const [page, setPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCommentID, setDeleteCommentID] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { comments, commentsLoading, refetchComments } = useContext(
    CommentContext
  ) as commentContextType;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [changeStatusId, setChangeStausId] = useState("");

  const [changeStatus, setChangeStatus] = useState({
    note: "test",
    status: null,
  } as changeCommentStatusType);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [deleteComment, { isSuccess: deleteCommentStatus }] =
    useDeleteCommentMutation();

  const deleteCommentHandler = (id: string) => {
    deleteComment(id);
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
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader aria-label="sticky table">
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
                <Spinner />
              ) : (
                (rowsPerPage > 0
                  ? comments?.data?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : comments?.data
                )?.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ width: 10 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.productName}</TableCell>
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
                              setChangeStatus({ ...changeStatus, status: 1 });
                              setChangeStausId(row.id);
                            }}
                          >
                            accept
                          </button>
                          <button
                            className="bg-red p-1 text-xs rounded-r-md"
                            onClick={() => {
                              setChangeStatus({ ...changeStatus, status: 2 });
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
                    <TableCell align="center">{row.text}</TableCell>
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={comments?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "center" }}
        />
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
