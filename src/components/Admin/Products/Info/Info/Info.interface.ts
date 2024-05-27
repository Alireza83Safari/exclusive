export interface InfoPorps {
  showProductInfoModal: boolean;
  setShowInfo: (value: boolean) => void;
  setShowEditItem: (value: boolean) => void;
  setShowEditFile: (value: boolean) => void;
  showInfo: boolean;
  showEditItem: boolean;
  showEditFile: boolean;
  setShowProductInfoModal: (value: boolean) => void;
  editProductId: string;
  refetchProducts: () => void;
}
