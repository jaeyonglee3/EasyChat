import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={<Home />}
        />
        <Route 
          path='/login'
          element={<Login />}
        />
        <Route 
          path='/signup'
          element={<Signup />}
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
