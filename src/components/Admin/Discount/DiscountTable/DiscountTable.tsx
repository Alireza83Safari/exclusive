import React, { useState } from "react";
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
import { useSearch } from "../../../../hooks/useSearch";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BrandTableSkeleton, Pagination } from "../../../../components";
import useHasAccess from "../../../../hooks/useHasAccess";
import useRow from "../../../../hooks/useRow";
import { getDiscountAdminType } from "../../../../types/discount";
import { useDeleteDiscountMutation } from "../../../../Redux/apis/admin/discountAdminApi";
import { columns, DiscountTableProps } from "./DiscountTable.interface";

function DiscountTable(props: DiscountTableProps) {
  const { discounts, isLoading, refetchDiscount } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDiscountID, setDeleteDiscountID] = useState("");

  const { userHasAccess: accessList } = useHasAccess(
    "action_discount_admin_list"
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

  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 10;
  const totalPages = Math.ceil(discounts?.total / pageSize);

  const { searchHandler } = useSearch();
  const setInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const submitSearch = () => {
    searchHandler(searchQuery);
  };
  const { rowNumber, limit } = useRow();
  if (isLoading) {
    return <BrandTableSkeleton />;
  }

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
                  {discounts?.data.map(
                    (row: getDiscountAdminType, index: any) => (
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
                            // onClick={() => editDiscountHandler(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    )
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

          {!discounts?.data?.length && (
            <TableRow>
              <TableCell colSpan={7}>
                <p className="text-xl text-center font-semibold">
                  We couldn't find a coldiscountor with these specifications.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableContainer>

        <Pagination totalPages={totalPages} pageSize={pageSize} />
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
