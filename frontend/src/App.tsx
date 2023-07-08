import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  ChakraProvider,
} from "@chakra-ui/react"
import theme from "./theme"
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
          path='/signup'
          element={<Signup />}
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
