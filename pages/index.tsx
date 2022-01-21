import { useState } from 'react';
import type { NextPage } from "next";
import { BundleDropMetadata } from '@3rdweb/sdk';
import {
  Box,
  Link,
  Text,
  Heading,
  Skeleton,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

import { Header, Card, useUserContext, DetailsModal } from "../components";

/* ======================= HOME PAGE ======================= */
const Home: NextPage = () => {
  const { isLoading, nfts } = useUserContext();
  const [selectedNft, setSelectedNft] = useState<BundleDropMetadata>();

  return (
    <Box minHeight="100vh" display="flex" flexDir="column">
      <Header />
      <Container maxW="container.xl" mt="95px" flex={1}>
        <Box textAlign="center">
          <Heading as="h1" size="4xl">
            Jurrasic Park
          </Heading>
          <Text fontSize="lg" fontWeight="semibold" mt={2}>
            Claim your dinosaur NFT on us
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={6}>
          {isLoading ? (
            <>
              {/* @ts-ignore */}
              {[...Array(10).keys()].map((item) => (
                <Skeleton borderRadius={["sm", null, "md"]} key={item} height="400px" />
              ))}
            </>
          ) : (
            <>
              {nfts.map((nft) => (
                <Card key={nft.metadata.id} nft={nft} onClick={() => setSelectedNft(nft)} />
              ))}
            </>
          )}
        </SimpleGrid>
      </Container>
      <Container as="footer" maxW="xl" textAlign="center" py={10}>
        <Text>
          Made with{' '}
          <span role="img" aria-label="heart emoji">
            ❤️
          </span>{' '}
          by{' '}
          <Link href="https://github.com/ximxim" isExternal>
            ximxim
          </Link>
        </Text>
      </Container>
      <DetailsModal
        nft={selectedNft}
        isOpen={!!selectedNft}
        onClose={() => setSelectedNft(undefined)}
      />
    </Box>
  );
};

export default Home;
