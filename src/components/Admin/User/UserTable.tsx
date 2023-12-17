import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
import useHasAccess from "../../../hooks/useHasAccess";
import useRow from "../../../hooks/useRow";
import { useLocation } from "react-router-dom";
import { RowTableSkeleton } from "../../../skelton/admin/Table/Table";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limitUrl = searchParams.get("limit");
  const pageSize = limitUrl ? +limitUrl : 12;
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
  const { userHasAccess: accessList } = useHasAccess("action_user_admin_list");
  const { userHasAccess: accessCreate } = useHasAccess(
    "action_user_admin_create"
  );
  const { userHasAccess: accessEdit } = useHasAccess(
    "action_user_admin_update"
  );
  const { userHasAccess: accessDelete } = useHasAccess(
    "action_user_admin_delete"
  );

  const [deleteUser] = useDeleteUserMutation();

  const deleteColorHandler = async (id: string) => {
    if (accessDelete) {
      await deleteUser(id).then(() => {
        toast.success("Delete User Is Success");
        refetchUser();
        setShowDeleteModal(false);
      });
    } else {
      toast.error("You Havent Access Delete User");
      setShowDeleteModal(false);
    }
  };

  const editUserHandler = (id: string) => {
    if (accessEdit) {
      setEditUserId(id);
      setShowEditModal(true);
    } else {
      toast.error("You Havent Access Edit User");
    }
  };

  const createUserHandler = () => {
    if (accessCreate) {
      setShowAddModal(true);
    } else {
      toast.error("You Havent Access Create User");
    }
  };

  const { rowNumber, limit } = useRow();

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
          onClick={() => createUserHandler()}
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
          {accessList ? (
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
                  Array.from(
                    Array(users?.length ? users?.length : 8).keys()
                  ).map((_, index) => (
                    <TableRow key={index}>
                      {[...Array(7).keys()].map((cellIndex) => (
                        <TableCell key={cellIndex}>
                          <RowTableSkeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : users?.length ? (
                  users?.map((row: any, index: number) => (
                    <TableRow key={row.id}>
                      <TableCell style={{ width: 10 }} align="center">
                        {(rowNumber as any) >= (limit as any)
                          ? rowNumber + index + 1
                          : index + 1}
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
                          onClick={() => editUserHandler(row.id)}
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
          ) : (
            <Box sx={{ marginTop: "100px" }}>
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access User List
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
