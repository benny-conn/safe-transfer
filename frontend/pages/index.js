import React, { useState } from "react"
import Head from "next/head"
import { Box, VStack, HStack, Button } from "@chakra-ui/react"
import Nav from "../components/Nav"
import { TransferETH, PullETH, ReceieveETH } from "../components/ETH"
import { TransferNFT, PullNFT, ReceieveNFT } from "../components/NFT"

const TRANSFER = "transfer"
const PULL = "pull"
const COMPLETE = "complete"

export default function Home() {
  const [current, setCurrent] = useState(TRANSFER)

  return (
    <Box w="100%">
      <Head>
        <title>Safe Transfer</title>
        <meta name="description" content="Safe Transfer by bennycio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <VStack w="100%" top={20} position="absolute" h="70%">
        <Options current={current} setCurrent={setCurrent} />
        <HStack
          justify="space-evenly"
          w="100%"
          h="100%"
          m={10}
          position="relative"
          top={5}>
          <Actions current={current} />
        </HStack>
      </VStack>
    </Box>
  )
}

const Actions = ({ current }) => {
  switch (current) {
    case TRANSFER:
      return (
        <>
          <TransferETH />
          <TransferNFT />
        </>
      )
    case PULL:
      return (
        <>
          <PullETH />
          <PullNFT />
        </>
      )
    case COMPLETE:
      return (
        <>
          <ReceieveETH />
          <ReceieveNFT />
        </>
      )
    default:
      return (
        <>
          <TransferETH />
          <TransferNFT />
        </>
      )
  }
}

const Options = ({ current, setCurrent }) => {
  return (
    <HStack w="80%" spacing={24} p={5} position="relative" top={3}>
      <Button
        w="100%"
        onClick={() => setCurrent(TRANSFER)}
        background={current == TRANSFER ? "gray.300" : "gray.100"}>
        Transfer
      </Button>
      <Button
        w="100%"
        onClick={() => setCurrent(PULL)}
        background={current == PULL ? "gray.300" : "gray.100"}>
        Pull
      </Button>
      <Button
        w="100%"
        onClick={() => setCurrent(COMPLETE)}
        background={current == COMPLETE ? "gray.300" : "gray.100"}>
        Receive
      </Button>
    </HStack>
  )
}
