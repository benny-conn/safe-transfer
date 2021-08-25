import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

import StateProvider from "../interact/index"
import { ToastContainer } from "react-toastify"
import { ChakraProvider } from "@chakra-ui/react"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout"

function App({ Component, pageProps }) {
  return (
    <DAppProvider>
      <StateProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </ChakraProvider>
      </StateProvider>
    </DAppProvider>
  )
}

export default App
