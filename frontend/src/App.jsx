import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/AppRoutes';

// Minimal change: no AuthProvider required for localStorage-based guard
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;