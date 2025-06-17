import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './Layout.jsx';
import { routes, routeArray } from './config/routes.js';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={routes.dashboard.path} replace />} />
            {routeArray.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <route.component />
                    </motion.div>
                  </AnimatePresence>
                }
              />
            ))}
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="!bg-white !text-gray-900 !rounded-lg !shadow-lg"
          progressClassName="!bg-primary"
          className="!z-[9999]"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;