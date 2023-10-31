import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinner from "../../Spinner/Spinner";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteModal from "../DeleteModal";
import { UserContext, UserContextType } from "./Context/UserContext";
import EditUser from "./EditUser";
import { Box, Button, TextField } from "@mui/material";
import AddUser from "./AddUser";
import { useDeleteUserMutation } from "../../../Redux/apis/admin/userAdminApi";
import { usePagination } from "../../../hooks/usePagination";
import { useSearch } from "../../../hooks/useSearch";
import Pagination from "../../Pagination";
import SearchIcon from "@mui/icons-material/Search";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteColorID, setDeleteColorID] = useState("");
  const {
    users,
    userLoading,
    refetchUser,
    setEditUserId,
    setShowEditModal,
    total,
    setShowAddModal,
  } = useContext(UserContext) as UserContextType;

  const [deleteUser] = useDeleteUserMutation();

  const deleteColorHandler = async (id: string) => {
    await deleteUser(id).then(() => {
      toast.success("Delete User Is Success");
      refetchUser();
      setShowDeleteModal(false);
    });
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    setSearchQuery("");
  };

  return (
    <div className="col-span-12 m-3 bg-white p-2">
      <div className="h-8 md:mx-3 mb-4 flex justify-between">
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
        <Button
          onClick={() => setShowAddModal(true)}
          sx={{ backgroundColor: "black", color: "white" }}
        >
          Add New User
        </Button>
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
        <TableContainer sx={{ minHeight: 550 }}>
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
              ) : users?.length ? (
                users?.map((row: any, index: any) => (
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
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <p className="text-xl text-center font-semibold">
                      We couldn't find a user with these specifications.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePageHandler}
          />
        )}
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
