import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({
   component: Component,
   fallbackPath,
   isAllowed,
}) => {
   if (!isAllowed) {
      return <Navigate replace to={fallbackPath} />
   }
   return <Component />
}
