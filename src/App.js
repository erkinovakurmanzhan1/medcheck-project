import useToast from './hooks/useToast'

import AppRoutes from './routes/Routes'

function App() {
   const { ToastContainer } = useToast()
   return (
      <div>
         {ToastContainer}

         <AppRoutes />
      </div>
   )
}
export default App
