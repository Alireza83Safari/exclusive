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
import { TextField } from "@mui/material";
import { OrderContext, orderContextType } from "./Context/OrderContext";

interface Column {
  id: "index" | "username" | "totalPrice" | "paidAt" | "status" | "price";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "username", label: "username" },
  { id: "totalPrice", label: "totalPrice" },
  { id: "paidAt", label: "paidAt" },
  { id: "status", label: "status" },
  { id: "price", label: "price" },
];

function OrderTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { orders, orderLoading } = useContext(OrderContext) as orderContextType;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="col-span-12 m-3 bg-white p-2">
      <div className="flex justify-between mb-8">
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
              {orderLoading ? (
                <Spinner />
              ) : (
                (rowsPerPage > 0
                  ? orders?.data?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : orders?.data
                )?.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ width: 10 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">
                      {Math.floor(row.totalPrice)}
                    </TableCell>
                    <TableCell align="center">
                      {row.paidAt?.slice(0, 10)}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: `${row.status === 0 ? `orange` : `green`}`,
                      }}
                    >
                      {row.status === 0 ? "pending" : "success"}
                    </TableCell>
                    <TableCell align="center">
                      {Math.floor(row.price)}
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
          count={orders?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </Paper>
    </div>
  );
}

export default OrderTable;
