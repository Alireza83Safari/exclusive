import { useContext, useState } from "react";
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
import { AppPicContext, appPicContextType } from '../../../context/admin/appPicContext';
import EditAppPic from "./EditAppPic";
import { useDeleteAppPicMutation } from "../../../Redux/apis/admin/appPicAdminApi";
import useHasAccess from "../../../hooks/useHasAccess";
import EditAppPicFile from "./EditAppPicFile";
import { RowTableSkeleton } from "../../../skelton/admin/Table/Table";

interface Column {
  id: "index" | "createAt" | "actions" | "url" | "title" | "type";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "title", label: "Title" },
  { id: "type", label: "type" },
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

  const { userHasAccess } = useHasAccess("action_app_pic_admin_list");
  const { userHasAccess: accessDelete } = useHasAccess(
    "action_app_pic_admin_delete"
  );
  const { userHasAccess: accessEdit } = useHasAccess(
    "action_app_pic_admin_update"
  );
  const [deleteAppPic] = useDeleteAppPicMutation();

  const deleteAppPicHandler = async (id: string) => {
    if (accessDelete) {
      await deleteAppPic(id).then(() => {
        toast.success("Delete AppPic Is Success");
        refetchAppPic();
        setShowDeleteModal(false);
      });
    } else {
      toast.error("You Havent Access Delete AppPic");
    }
  };

  const editAppPicHandler = (id: string) => {
    if (accessEdit) {
      setEditAppPicId(id);
      setOpenEditModal(true);
    } else {
      toast.error("You Havent Access Edit AppPic");
    }
  };

  return (
    <div className="lg:col-span-8 col-span-12 m-3 sm:mt-3 sm:px-0 px-3 mt-64 lg:order-1 order-2">
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          borderRadius: "12px",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 750,
            minHeight: 710,
            display: !userHasAccess ? "flex" : "block",
          }}
        >
          {userHasAccess ? (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell key={column.id} align="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {appPicLoading
                  ? Array.from(
                      Array(appPics?.length ? appPics?.length : 8).keys()
                    ).map((_, index) => (
                      <TableRow key={index}>
                        {[...Array(6).keys()].map((cellIndex) => (
                          <TableCell key={cellIndex}>
                            <RowTableSkeleton />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : appPics?.map((row: any, index: any) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ width: 10 }} align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{row.title}</TableCell>

                        <TableCell align="center">
                          {row.appPicType === 0
                            ? "slider"
                            : row.appPicType === 1
                            ? "section"
                            : "bilbord"}
                        </TableCell>
                        <TableCell align="center">
                          {row.url?.slice(0, 20)}
                          {row.url?.length > 20 && "..."}
                        </TableCell>
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
                            onClick={() => editAppPicHandler(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          ) : (
            <div className=" flex justify-center items-center min-h-full w-full">
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access AppPic List
              </h1>
            </div>
          )}
        </TableContainer>
      </Paper>

      <EditAppPic />
      <EditAppPicFile />

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
