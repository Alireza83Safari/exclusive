export interface OrderTableProps {
  orders: any;
  isLoading: boolean;
}

export interface Column {
  id: "index" | "username" | "totalPrice" | "paidAt" | "status" | "price";
  label: string;
}

export const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "username", label: "username" },
  { id: "totalPrice", label: "totalPrice" },
  { id: "paidAt", label: "paidAt" },
  { id: "status", label: "status" },
  { id: "price", label: "price" },
];
