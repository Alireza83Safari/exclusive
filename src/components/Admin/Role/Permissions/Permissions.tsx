import reactDOM from "react-dom";
import { role } from "../../../../types/role";
import { PermissionsProps } from "./Permissions.interface";

function Permissions(props: PermissionsProps) {
  const { setShowPermissions, roleId, roles } = props;

  const findPermissions = roles?.data.find((role: role) => role.id == roleId);

  return reactDOM.createPortal(
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400">
      <div className="relative max-h-[96%] min-h-[20%] w-auto overflow-auto">
        <p
          className="absolute top-0 right-0 text-red text-2xl"
          onClick={() => setShowPermissions(false)}
        >
          X
        </p>
        <ul className="bg-white p-4">
          {findPermissions?.permissions?.map((item: any, index: number) => (
            <li key={index}>
              {index + 1} {item}
            </li>
          ))}
        </ul>
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}

export default Permissions;
