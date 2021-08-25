import React, { useState } from "react"
import { Box, Stack, Heading, Text, Input, Button } from "@chakra-ui/react"
import { safeTransfer } from "../interact/safe-transfer"

export const TransferNFT = () => {
  const [tokenAddress, setTokenAddress] = useState("")
  const [to, setTo] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [secret, setSecret] = useState("")

  const { transferNFT } = safeTransfer.useContainer()

  return (
    <Stack
      bg={"gray.50"}
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
      h="100%">
      <Stack spacing={4}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
          Transfer{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">
            NFT
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Please input the contract address of your NFT, the ID of the NFT you
          wish to send, the address of the intended recipient, and a secret
          phrase they will need to receive the NFT.
        </Text>
      </Stack>
      <Box as={"form"} mt={10} h="100%">
        <Stack spacing={4} justify="space-evenly" h="100%">
          <Input
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            placeholder="0xb47...BBB"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Input
            value={tokenId}
            onChange={e => setTokenId(e.target.value)}
            placeholder="5"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Input
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="0x319...f9F"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Input
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="My favorite color is dog"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Button
            onClick={() => {
              transferNFT(tokenAddress, tokenId, to, secret)
            }}
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, pink.400,purple.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, pink.400,purple.400)",
              boxShadow: "xl",
            }}>
            Send NFT
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export const ReceieveNFT = () => {
  const [from, setFrom] = useState("")
  const [secret, setSecret] = useState("")

  const { completeTransferNFT } = safeTransfer.useContainer()

  return (
    <Stack
      bg={"gray.50"}
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
      h="100%">
      <Stack spacing={4}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
          Receive{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">
            NFT
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Please input the address that is sending you an NFT and the secret
          phrase they used to secure the transfer.
        </Text>
      </Stack>
      <Box as={"form"} mt={10} h="100%">
        <Stack spacing={4} justify="space-evenly" h="100%">
          <Input
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="0xBA8...5F7"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Input
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="I like tacos"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Button
            onClick={() => {
              completeTransferNFT(from, secret)
            }}
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, pink.400,purple.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, pink.400,purple.400)",
              boxShadow: "xl",
            }}>
            Receive NFT
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export const PullNFT = () => {
  const [to, setTo] = useState("")

  const { pullTransferNFT } = safeTransfer.useContainer()

  return (
    <Stack
      bg={"gray.50"}
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
      h="100%">
      <Stack spacing={4}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
          Pull Transfer of{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">
            NFT
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Please input the address that you sent an NFT to.
        </Text>
      </Stack>
      <Box as={"form"} mt={10} h="100%">
        <Stack spacing={4} justify="space-evenly" h="100%">
          <Input
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="0xBA8...5F7"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Button
            onClick={() => {
              pullTransferNFT(to)
            }}
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, pink.400,purple.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, pink.400,purple.400)",
              boxShadow: "xl",
            }}>
            Cancel Transfer
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
