import  { useContext, useEffect, useState } from "react";
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
import { RoleContext, roleContextType } from "./Context/RoleContext";
import Permissions from "./Permissions";
import AddRole from "./AddRole";
import EditRole from "./EditRole";
import { useDeleteRoleMutation } from "../../../Redux/apis/admin/roleAdminApi";
import useHasAccess from "../../../hooks/useHasAccess";
import { Box } from "@mui/material";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBrandID, setDeleteBrandId] = useState("");
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

  const { userHasAccess: accessList } = useHasAccess("action_role_admin_list");
 /*  const { userHasAccess: accessDelete } = useHasAccess(
    "action_role_admin_delete"
  );
  const { userHasAccess: accessEdit } = useHasAccess(
    "action_role_admin_update"
  ); */

  const [deleteRole, { isSuccess }] = useDeleteRoleMutation();

  const deleteBrandHandler = (id: string) => {
    deleteRole(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete Role Is Success");
      refetchRoles();
      setShowDeleteModal(false);
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
        <div className="mt-3 md:mx-12">
          <button
            className="bg-black text-white h-9 text-sm px-3"
            onClick={() => setShowAddModal(true)}
          >
            Add New Role
          </button>
        </div>
        <TableContainer sx={{ minHeight: 600 }}>
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
                {rolesLoading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  roles?.data?.map((row: any, index: any) => (
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
                      <TableCell
                        style={{ whiteSpace: "nowrap" }}
                        align="center"
                      >
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
          ) : (
            <Box sx={{ marginTop: "100px" }}>
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access Color List
              </h1>
            </Box>
          )}
        </TableContainer>
      </Paper>
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
