import React from "react"
import { Box, HStack, Text } from "@chakra-ui/react"
import ConnectButton from "./ConnectButton"

const Nav = () => {
  return (
    <Box w="100%" padding="5" position="absolute" top={0}>
      <HStack justify="space-between">
        <Text fontSize="lg">
          Safe Transfer{" "}
          <Text fontSize="sm" as={"span"} color="gray.400">
            by bennycio
          </Text>
        </Text>
        <ConnectButton />
      </HStack>
    </Box>
  )
}

export default Nav
