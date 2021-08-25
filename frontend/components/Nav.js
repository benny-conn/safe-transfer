import React from "react"
import { Box, HStack, Text } from "@chakra-ui/react"
import ConnectButton from "./ConnectButton"

const Nav = () => {
  return (
    <Box w="100%" padding="5" position="absolute" top={3}>
      <HStack justify="space-between">
        <Text>Safe Transfer by bennycio</Text>
        <ConnectButton />
      </HStack>
    </Box>
  )
}

export default Nav
