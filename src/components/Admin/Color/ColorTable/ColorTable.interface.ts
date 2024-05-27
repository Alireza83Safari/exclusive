export interface ColorTableProps {
  colors: any;
  colorsLoading: boolean;
  refetchColors: () => void;
  setEditColorId: (value: string) => void;
  setOpenEditModal: (value: boolean) => void;
}
