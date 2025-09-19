
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { useAppRouter } from './app/router';
import { ErrorBoundary } from './components/common/ErrorBoundary';


function App() {
  const router = useAppRouter();

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
