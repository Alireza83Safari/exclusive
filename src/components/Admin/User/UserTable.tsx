import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Spinner from "../../Spinner/Spinner";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDeleteColorMutation } from "../../../Redux/apis/colorApi";
import DeleteModal from "../DeleteModal";
import { UserContext, UserContextType } from "./Context/UserContext";
import EditUser from "./EditUser";
import { useDeleteUserMutation } from "../../../Redux/apis/userApi";
import { Button, TextField } from "@mui/material";
import AddUser from "./AddUser";

interface Column {
  id:
    | "index"
    | "username"
    | "roleName"
    | "createAt"
    | "actions"
    | "email"
    | "mobile";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "username", label: "username" },
  { id: "roleName", label: "role Name" },
  { id: "email", label: "email" },
  { id: "mobile", label: "mobile" },
  { id: "createAt", label: "createAt" },
  { id: "actions", label: "actions" },
];

function UserTable() {
  const [page, setPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteColorID, setDeleteColorID] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    users,
    userLoading,
    refetchUser,
    setEditUserId,
    setShowEditModal,
    setShowAddModal,
  } = useContext(UserContext) as UserContextType;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [deleteUser] = useDeleteUserMutation();

  const deleteColorHandler = async (id: string) => {
    await deleteUser(id).then(() => {
      toast.success("Delete User Is Success");
      refetchUser();
      setShowDeleteModal(false);
    });
  };

  return (
    <div className="col-span-12 m-3 bg-white p-2">
      <div className="flex justify-between my-1">
        <TextField
          placeholder="Search"
          variant="outlined"
          sx={{
            height: "10px",
            padding: "1px",
            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
              paddingY: "7px",
            },
          }}
        />

        <button
          className="bg-black text-white h-9 text-sm px-3"
          onClick={() => setShowAddModal(true)}
        >
          Add New User
        </button>
      </div>
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
              {userLoading ? (
                <Spinner />
              ) : (
                (rowsPerPage > 0
                  ? users?.data?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users?.data
                )?.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ width: 10 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.roleName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.mobile}</TableCell>
                    <TableCell
                      align="center"
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.createdAt.slice(0, 10)}
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
                          setDeleteColorID(row.id);
                          setShowDeleteModal(true);
                        }}
                      />
                      <FaPen
                        className="text-orange-500 cursor-pointer"
                        onClick={() => {
                          setEditUserId(row.id);
                          setShowEditModal(true);
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
          count={users?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </Paper>
      <EditUser />
      <AddUser />
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteColorID}
          deleteUrl={deleteColorHandler}
        />
      )}
    </div>
  );
}

export default UserTable;
