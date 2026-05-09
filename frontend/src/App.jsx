import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/AppRoutes';

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;