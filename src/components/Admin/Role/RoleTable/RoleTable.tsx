import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteModal from "../../DeleteModal/DeleteModal";
import { useDeleteRoleMutation } from "../../../../Redux/apis/admin/roleAdminApi";
import useHasAccess from "../../../../hooks/useHasAccess";
import { Box } from "@mui/material";
import ProductTableSkeleton from "../../../Skeleton/Admin/ProductTableSkeleton";
import Permissions from "../Permissions/Permissions";
import { columns, RoleTableProps } from "./RoleTable.interface";

function RoleTable(props: RoleTableProps) {
  const { roles, isLoading, refetchRoles, setEditRoleId, setShowEditModal } =
    props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBrandID, setDeleteBrandId] = useState("");
  const [showPermissions, setShowPermissions] = useState(false);

  const [roleId, setRoleId] = useState("");

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

  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  return (
    <div className="m-3 lg:order-1 order-2 mt-4">
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          borderRadius: "12px",
        }}
      >
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
                {roles?.data?.map((row: any, index: any) => (
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
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ marginTop: "100px" }}>
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access Role List
              </h1>
            </Box>
          )}
        </TableContainer>
      </Paper>

      {showPermissions && (
        <Permissions
          setShowPermissions={setShowPermissions}
          roleId={roleId}
          roles={roles}
        />
      )}

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
