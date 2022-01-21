import { motion } from "framer-motion";
import { CalendarIcon, StarIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { BundleDropMetadata } from "@3rdweb/sdk";
import { FunctionComponent, useEffect, useState } from "react";
import {
  Tag,
  Box,
  Flex,
  Text,
  Link,
  Image,
  Modal,
  Button,
  Heading,
  Skeleton,
  TagLabel,
  ModalProps,
  TagRightIcon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
} from '@chakra-ui/react'

import { useUserContext } from "../UserContext";

const contractAddress = process.env
  .NEXT_PUBLIC_THIRD_WEB_BUNDLE_MODULE as string;

export const DetailsModal: FunctionComponent<{ nft?: BundleDropMetadata } & Omit<ModalProps, 'children'>> = ({
  nft,
  ...modalProps
}) => {
  const [balance, setBalance] = useState<number>(-1);
  const { claiming, claim, getBalance, walletInfo } = useUserContext();

  useEffect(() => {
    if (!nft) return;

    (async () => {
      const balanceBigNumber = await getBalance(nft.metadata.id);
      setBalance(balanceBigNumber.toNumber())
    })();
  }, [nft, claiming]);

  return (
    <Modal size="xl" {...modalProps}>
    <ModalOverlay />
    <ModalContent backgroundImage={nft?.metadata.image} backgroundSize="cover" backgroundBlendMode="color">
      <ModalHeader>{nft?.metadata.name}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Image src={nft?.metadata.image} alt={nft?.metadata.name} borderRadius={5} mb={3} />
        <Text as="h6" fontSize={16} mb={3}>{nft?.metadata.description}</Text>
        {(nft?.metadata.properties as unknown as any[] || []).map?.((prop: any, index: number) => (
          <Tag size="lg" key={index} borderRadius='full' variant='solid' mr={2} mb={3}>
            <TagLabel>{prop.display_type === 'date' ? new Date(prop.value).toDateString() : prop.value}</TagLabel>
            {prop.display_type && <TagRightIcon as={prop.display_type === 'date' ? CalendarIcon : StarIcon} />}
          </Tag>
        ))}
      </ModalBody>

      <ModalFooter>
        <Box>
          <Link mr={3} textTransform="uppercase" href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${nft?.metadata.id}`} isExternal>
            <IconButton
              aria-label="someting"
              icon={<ExternalLinkIcon />}
            />
          </Link>
          {nft && (
            <Button
              disabled={!!claiming || balance !== 0}
              loadingText="Claiming"
              textTransform="uppercase"
              onClick={() => claim(nft.metadata.id)}
              isLoading={claiming === nft.metadata.id || balance === -1}
            >
              {balance > 0 ? `You own ${balance}` : 'Claim'}
            </Button>
          )}
        </Box>
      </ModalFooter>

    </ModalContent>
  </Modal>
  );
};
