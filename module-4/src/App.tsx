import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import HeaderLayout from './layouts/HeaderLayout'
import WithoutHeader from './layouts/WithoutHeader'
import { AuthProvider } from './contexts/AuthContext'
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
          </Route>
          <Route element={<WithoutHeader />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
