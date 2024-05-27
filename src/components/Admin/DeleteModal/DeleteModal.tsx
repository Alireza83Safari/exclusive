import ReactDOM from "react-dom";
import { DeleteModalProps } from "./DeleteModal.interface";

function DeleteModal(props: DeleteModalProps) {
  const { setShowDeleteModal, id, deleteUrl } = props;
  const deleteHandler = () => {
    deleteUrl(id);
  };

  return ReactDOM.createPortal(
    <div className="z-10 backdrop-blur-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen overflow-auto flex items-center justify-center transition duration-400">
      <div className="w-1/3 h-1/3 bg-gray rounded-xl">
        <h1 className="text-3xl text-center mt-12 font-bold">Are You Sure?</h1>
        <div className="flex justify-center items-center mt-12 gap-x-4">
          <button
            className="bg-red py-2 px-6 text-white rounded-md"
            onClick={deleteHandler}
          >
            Delete
          </button>
          <button
            className="border border-borderColor py-2 px-6 rounded-md"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal") as any
  );
}

export default DeleteModal;
