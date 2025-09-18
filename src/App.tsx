
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { useAppRouter } from './app/router';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Footer from './components/common/Footer';


function App() {
  const router = useAppRouter();

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Footer />
    </ErrorBoundary>
  )
}

export default App
