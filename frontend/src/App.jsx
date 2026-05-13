import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/AppRoutes';
import { RoleProvider } from './context/RoleContext';

function App() {
  return (
    <RoleProvider>
      <RouterProvider router={appRouter} />
    </RoleProvider>
  );
}

export default App;