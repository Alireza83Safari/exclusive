import {
  AddAppPic,
  AddAppPicFile,
  AppPicTable,
  EditAppPic,
  EditAppPicFile,
  TotalAppPic,
} from "../../components";
import { useState } from "react";
import { appPicUserApi } from "../../Redux";

function AppPic() {
  const {
    data: appPics,
    isLoading,
    refetch: refetchAppPic,
  } = appPicUserApi.useGetAppPicsUserQuery("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditFileModal, setOpenEditFileModal] = useState(false);
  const [editAppPicId, setEditAppPicId] = useState("");
  const [createAppPicId, setCreateAppPicId] = useState("");
  const [showAppPicFile, setShowAppPicFile] = useState(false);

  return (
    <div className="grid grid-cols-12 mt-4 ">
      <AppPicTable
        appPics={appPics}
        isLoading={isLoading}
        refetchAppPic={refetchAppPic}
        setEditAppPicId={setEditAppPicId}
        setOpenEditModal={setOpenEditModal}
      />
      <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
        <div className="lg:col-span-2 cols-span-1">
          <TotalAppPic appPics={appPics} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-2 cols-span-1 ">
          <AddAppPic
            refetchAppPic={refetchAppPic}
            setCreateAppPicId={setCreateAppPicId}
            setShowAppPicFile={setShowAppPicFile}
          />
          {showAppPicFile && (
            <AddAppPicFile
              createAppPicId={createAppPicId}
              setShowAppPicFile={setShowAppPicFile}
            />
          )}
        </div>
      </div>

      <EditAppPic
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        editAppPicId={editAppPicId}
        refetchAppPic={refetchAppPic}
        setOpenEditFileModal={setOpenEditFileModal}
      />
      <EditAppPicFile
        openEditFileModal={openEditFileModal}
        setOpenEditFileModal={setOpenEditFileModal}
        editAppPicId={editAppPicId}
        refetchAppPic={refetchAppPic}
        setShowAppPicFile={setShowAppPicFile}
      />
    </div>
  );
}

export default AppPic;
