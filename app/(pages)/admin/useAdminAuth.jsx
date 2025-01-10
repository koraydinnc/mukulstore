import { useSelector } from 'react-redux'

export const useAdminAuth = () => {
  const { isAuthenticated, admin } = useSelector((state) => state.admin)
  return { isAuthenticated, admin }
}
