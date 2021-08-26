import React, { createContext, useEffect, useState } from "react"
import Head from "next/head"
import { Box, VStack, HStack, Button, Text, Link } from "@chakra-ui/react"
import Nav from "../components/Nav"
import { TransferETH, PullETH, ReceieveETH } from "../components/ETH"
import { TransferNFT, PullNFT, ReceieveNFT } from "../components/NFT"
import { safeTransfer } from "../interact/safe-transfer"

const TRANSFER = "transfer"
const PULL = "pull"
const COMPLETE = "complete"

export default function Home() {
  const [current, setCurrent] = useState(TRANSFER)
  const { txHash } = safeTransfer.useContainer()

  return (
    <Box w="100%" pb="10" position="absolute" top={0}>
      <Head>
        <title>Safe Transfer</title>
        <meta name="description" content="Safe Transfer by bennycio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <VStack w="100%" top={10} position="relative" h="75%">
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
        {txHash && (
          <Text position="relative" top={5}>
            Transaction at:{" "}
            <Link href={`https://ropsten.etherscan.io/tx/${txHash}`}>
              {txHash}
            </Link>
          </Text>
        )}
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
    <HStack w="80%" spacing={24} p={8} position="relative" top={2}>
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
