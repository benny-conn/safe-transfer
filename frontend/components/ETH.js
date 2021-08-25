import React, { useState } from "react"
import { Box, Stack, Heading, Text, Input, Button } from "@chakra-ui/react"
import { safeTransfer } from "../interact/safe-transfer"

export const TransferETH = () => {
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [secret, setSecret] = useState("")

  const { transferETH } = safeTransfer.useContainer()

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
            ETH
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Please input the amount of ETH you would like to send, the address of
          the wallet you want to transfer ETH to, and a secret phrase they will
          need to use to receieve the funds.
        </Text>
      </Stack>
      <Box as={"form"} mt={10} h="100%">
        <Stack spacing={4} justify="space-evenly" h="100%">
          <Input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.1"
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
              transferETH(to, amount, secret)
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
            Send ETH
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export const ReceieveETH = () => {
  const [from, setFrom] = useState("")
  const [secret, setSecret] = useState("")

  const { completeTransferETH } = safeTransfer.useContainer()

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
            ETH
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Please input the address that is sending you funds and the secret
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
              completeTransferETH(from, secret)
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
            Receive ETH
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export const PullETH = () => {
  const [to, setTo] = useState("")

  const { pullTransferETH } = safeTransfer.useContainer()

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
            ETH
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Please input the address that you sent funds to.
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
              pullTransferETH(to)
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
