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
import { useDeleteBrandMutation } from "../../../Redux/apis/brandApi";
import DeleteModal from "../DeleteModal";
import { RoleContext, roleContextType } from "./Context/RoleContext";
import Permissions from "./Permissions";
import { TextField } from "@mui/material";
import AddRole from "./AddRole";
import EditRole from "./EditRole";

interface Column {
  id: "index" | "code" | "name" | "createAt" | "actions" | "permissions";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "Index" },
  { id: "name", label: "Name" },
  { id: "code", label: "Code" },
  { id: "permissions", label: "permissions" },
  { id: "createAt", label: "CreateAt" },
  { id: "actions", label: "Actions" },
];

function RoleTable() {
  const [page, setPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBrandID, setDeleteBrandId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const {
    roles,
    rolesLoading,
    refetchRoles,
    setShowAddModal,
    setEditRoleId,
    setRoleId,
    setShowPermissions,
    setShowEditModal,
  } = useContext(RoleContext) as roleContextType;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [deleteBrand] = useDeleteBrandMutation();

  const deleteBrandHandler = async (id: string) => {
    deleteBrand(id);
    await deleteBrand(id).then(() => {
      toast.success("Delete Role Is Success");
      refetchRoles();
      setShowDeleteModal(false);
    });
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
        <div className="mt-5 md:mx-12 flex justify-between h-16">
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
            Add New Role
          </button>
        </div>
        <TableContainer sx={{ maxHeight: 600 }}>
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
              {rolesLoading ? (
                <Spinner />
              ) : (
                (rowsPerPage > 0
                  ? roles?.data?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : roles?.data
                )?.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">
                      <button
                        className="text-xs border border-borderColor py-1 px-2 rounded-md"
                        onClick={() => {
                          setRoleId(row.id);
                          setShowPermissions(true);
                        }}
                      >
                        Permissions
                      </button>
                    </TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }} align="center">
                      {row.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: "12px",
                      }}
                    >
                      <FaTrash
                        className="text-red mr-3"
                        onClick={() => {
                          setDeleteBrandId(row.id);
                          setShowDeleteModal(true);
                        }}
                      />
                      <FaPen
                        className="text-orange-500"
                        onClick={() => {
                          setShowEditModal(true);
                          setEditRoleId(row.id);
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
          count={roles?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </Paper>
      {/* <EditBrand /> */}
      <EditRole />
      <AddRole />
      <Permissions />
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteBrandID}
          deleteUrl={deleteBrandHandler}
        />
      )}
    </div>
  );
}

export default RoleTable;
