export interface DeleteModalProps {
  setShowDeleteModal: (show: boolean) => void;
  id: string;
  deleteUrl: (id: string) => void;
}
