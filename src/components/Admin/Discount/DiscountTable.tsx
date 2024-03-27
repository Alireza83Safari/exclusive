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
import { usePagination } from "../../../hooks/usePagination";
import { useSearch } from "../../../hooks/useSearch";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../../Pagination";
import useHasAccess from "../../../hooks/useHasAccess";
import { RowTableSkeleton } from "../../../skelton/admin/Table/Table";
import { useLocation } from "react-router-dom";
import useRow from "../../../hooks/useRow";
import {
  DiscountContext,
  discountContextType,
} from "./Context/DiscountContext";
import { getDiscountAdminType } from "../../../types/discount";
import { useDeleteDiscountMutation } from "../../../Redux/apis/admin/discountAdminApi";

interface Column {
  id:
    | "index"
    | "name"
    | "createdAt"
    | "actions"
    | "type"
    | "value"
    | "quantity";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "name", label: "name" },
  { id: "type", label: "type" },
  { id: "value", label: "value" },
  { id: "quantity", label: "quantity" },
  { id: "createdAt", label: "createdAt" },
  { id: "actions", label: "actions" },
];

function DiscountTable() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDiscountID, setDeleteDiscountID] = useState("");
  const {
    discounts,
    discountsLoading,
    refetchDiscount,
    setOpenEditModal,
    setEditDiscountId,
    total,
  } = useContext(DiscountContext) as discountContextType;

  const { userHasAccess: accessList } = useHasAccess(
    "action_discount_admin_list"
  );
  const { userHasAccess: accessEdit } = useHasAccess(
    "action_discount_admin_update"
  );
  const { userHasAccess: accessDelete } = useHasAccess(
    "action_discount_admin_delete"
  );

  const [deleteDiscount] = useDeleteDiscountMutation();

  const deleteDiscountHandler = async (id: string) => {
    if (accessDelete) {
      await deleteDiscount(id).then(() => {
        toast.success("Delete Discount Is Success");
        refetchDiscount();
        setShowDeleteModal(false);
      });
    } else {
      toast.error("You Havent Access Delete Discount");
      setShowDeleteModal(false);
    }
  };

  const editDiscountHandler = (id: string) => {
    if (accessEdit) {
      setEditDiscountId(id);
      setOpenEditModal(true);
    } else {
      toast.error("You Havent Access Edit Discount");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limitUrl = searchParams.get("limit");
  const pageSize = limitUrl ? +limitUrl : 10;
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
  const { rowNumber, limit } = useRow();

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
        <TableContainer sx={{ minHeight: discounts?.length ? 650 : 650 }}>
          {accessList ? (
            <>
              <div className="h-8 md:mx-3 mb-4">
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
                  {discountsLoading ? (
                    Array.from(
                      Array(discounts?.length ? discounts?.length : 8).keys()
                    ).map((_, index) => (
                      <TableRow key={index}>
                        {[...Array(6).keys()].map((cellIndex) => (
                          <TableCell key={cellIndex}>
                            <RowTableSkeleton />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : discounts?.length ? (
                    discounts?.map((row: getDiscountAdminType, index: any) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ width: 10 }} align="center">
                          {(rowNumber as any) >= (limit as any)
                            ? rowNumber + index + 1
                            : index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {row?.productName?.length
                            ? row.productName
                            : row.relatedUserUsername}
                        </TableCell>
                        <TableCell align="center">
                          {row.type === 0 ? "price" : "percent"}
                        </TableCell>
                        <TableCell align="center">
                          {row.value}
                          {row.type === 0 ? "$" : "%"}
                        </TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
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
                              setDeleteDiscountID(row.id);
                              setShowDeleteModal(true);
                            }}
                          />
                          <FaPen
                            className="text-orange-500 cursor-pointer"
                            onClick={() => editDiscountHandler(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <p className="text-xl text-center font-semibold">
                          We couldn't find a coldiscountor with these
                          specifications.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          ) : (
            <Box sx={{ marginTop: "100px" }}>
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access Discount List
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
      {/*  <EditColor /> */}
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteDiscountID}
          deleteUrl={deleteDiscountHandler}
        />
      )}
    </div>
  );
}

export default DiscountTable;
