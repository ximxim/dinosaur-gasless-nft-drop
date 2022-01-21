import { motion } from "framer-motion";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { BundleDropMetadata } from "@3rdweb/sdk";
import { FunctionComponent } from "react";
import { Img, Box, Flex, Text, Link, BoxProps } from "@chakra-ui/react";

const MotionImg = motion(Img);
const contractAddress = process.env
  .NEXT_PUBLIC_THIRD_WEB_BUNDLE_MODULE as string;

export const Card: FunctionComponent<{ nft: BundleDropMetadata } & BoxProps> = ({
  nft,
  ...boxProps
}) => {
  return (
    <Box borderRadius={["sm", null, "md"]} overflow="hidden">
      <Box
        {...boxProps}
        cursor="pointer"
        position="relative"
        overflow="hidden"
      >
        <MotionImg
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          w="100%"
          h="100%"
          objectFit="cover"
          src={nft.metadata.image}
        />
      </Box>
      <Box px="4" py="2" w="100%">
        <Flex align="center" justify="space-between">
          <Text fontSize={["xs", null, "sm"]}>
            <Link
              fontWeight="semibold"
              href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${nft.metadata.id}`}
              isExternal
            >
              {nft.metadata.name}
            </Link>
          </Text>
          <Flex align="center">
            <ArrowUpIcon />
            <Text ml={1} fontSize={["xs", null, "sm"]}>
              {nft.supply.toNumber()}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
