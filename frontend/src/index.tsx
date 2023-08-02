import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import theme from './theme'
import { AuthContextProvider } from './context/AuthContext'
import { FriendContextProvider } from './context/FriendContext'


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <FriendContextProvider>
      <AuthContextProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
      </AuthContextProvider>
    </FriendContextProvider>
  </React.StrictMode>,
)

