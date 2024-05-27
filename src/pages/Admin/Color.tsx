import { AddColor, ColorTable, EditColor, TotalColor } from "../../components";
import { useState } from "react";
import { colorAdminApi } from "../../Redux/apis/admin/colorAdminApi";
import { useLocation } from "react-router-dom";

function Color() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editColorId, setEditColorId] = useState("");
  const location = useLocation();
  const {
    data: colors,
    isLoading: colorsLoading,
    refetch: refetchColors,
  } = colorAdminApi.useGetColorsQuery(location.search || "?page=1&limit=9");

  return (
    <>
      <div className="grid grid-cols-12 mt-4">
        <ColorTable
          colors={colors}
          colorsLoading={colorsLoading}
          refetchColors={refetchColors}
          setEditColorId={setEditColorId}
          setOpenEditModal={setOpenEditModal}
        />
        <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
          <div className="lg:col-span-2 cols-span-1">
            <TotalColor total={colors?.total} colorsLoading={colorsLoading} />
          </div>
          <div className="lg:col-span-2 cols-span-1">
            <AddColor refetchColor={refetchColors} />
          </div>
        </div>
      </div>

      <EditColor
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        editColorId={editColorId}
        refetchColor={refetchColors}
      />
    </>
  );
}

export default Color;
