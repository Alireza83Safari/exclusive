import { useContext, useMemo } from "react";
import { authContext, authContextType } from "../context/authContext";

function useHasAccess(permissions: string) {
  const { userPermissions } = useContext(authContext) as authContextType;

  const userHasAccess = useMemo(() => {
    return userPermissions?.some((item) => item === permissions);
  }, [userPermissions, userPermissions]);
  return { userHasAccess };
}

export default useHasAccess;
