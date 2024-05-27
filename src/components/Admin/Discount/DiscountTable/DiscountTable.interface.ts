export interface DiscountTableProps {
  discounts: any;
  isLoading: boolean;
  refetchDiscount: () => void;
}

export interface Column {
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

export const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "name", label: "name" },
  { id: "type", label: "type" },
  { id: "value", label: "value" },
  { id: "quantity", label: "quantity" },
  { id: "createdAt", label: "createdAt" },
  { id: "actions", label: "actions" },
];
