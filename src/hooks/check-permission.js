import { useSelector } from "react-redux"
import constants from "../constants";

export const useCheckPermission = () => {
  const user = useSelector(state => state.user);

  const permissionGuard = (permission, client_id) => {
    if (!permission || !client_id) return;

    if (user.role.isEmployee) {
      const check = user?.detail?.client_assignments.some(item => (item.company.id === client_id && item.action.identifier === permission))
      return check 
    }
    else return true
  }

  return { permissionGuard }
}