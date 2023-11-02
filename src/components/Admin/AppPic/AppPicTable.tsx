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
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";
import EditAppPic from "./EditAppPic";
import { useDeleteAppPicMutation } from "../../../Redux/apis/admin/appPicAdminApi";

interface Column {
  id: "index" | "fileName" | "createAt" | "actions" | "url" | "title";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "title", label: "Title" },
  { id: "fileName", label: "fileName" },
  { id: "url", label: "Url" },
  { id: "createAt", label: "createAt" },
  { id: "actions", label: "actions" },
];

function AppPicTable() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAppPicID, setDeleteAppPicID] = useState("");
  const {
    appPics,
    appPicLoading,
    refetchAppPic,
    setEditAppPicId,
    setOpenEditModal,
  } = useContext(AppPicContext) as appPicContextType;

  const [deleteAppPic] = useDeleteAppPicMutation();

  const deleteAppPicHandler = async (id: string) => {
    await deleteAppPic(id).then(() => {
      toast.success("Delete AppPic Is Success");
      refetchAppPic();
      setShowDeleteModal(false);
    });
  };

  return (
    <div className="lg:col-span-8 col-span-12 m-3 lg:order-1 order-2">
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          borderRadius: "12px",
        }}
      >
        <TableContainer sx={{ maxHeight: 750, minHeight: 710 }}>
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
              {appPicLoading ? (
                <Spinner />
              ) : (
                appPics?.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ width: 10 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">
                      {row.fileName.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">#{row.url}</TableCell>
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
                          setDeleteAppPicID(row.id);
                          setShowDeleteModal(true);
                        }}
                      />
                      <FaPen
                        className="text-orange-500 cursor-pointer"
                        onClick={() => {
                          setEditAppPicId(row.id);
                          setOpenEditModal(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <EditAppPic />
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteAppPicID}
          deleteUrl={deleteAppPicHandler}
        />
      )}
    </div>
  );
}

export default AppPicTable;
