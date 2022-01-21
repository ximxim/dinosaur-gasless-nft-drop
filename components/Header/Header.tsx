import { MoonIcon } from "@chakra-ui/icons";
import { FunctionComponent } from "react";
import {
  MdPerson,
  MdNetworkCell,
  MdAccountBalanceWallet,
} from "react-icons/md";
import {
  Box,
  Text,
  List,
  Link,
  Alert,
  Button,
  Popover,
  Skeleton,
  ListItem,
  ListIcon,
  Container,
  AlertIcon,
  IconButton,
  PopoverBody,
  useColorMode,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  PopoverCloseButton,
} from "@chakra-ui/react";

import { useUserContext } from "../UserContext";

const networkName = process.env.NEXT_PUBLIC_CHAIN_NAME as string;

export const Header: FunctionComponent = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const { isCorrectNetwork, connect, isConnecting, walletInfo, switchNetwork } =
    useUserContext();

  return (
    <Box position="fixed" w="100%" zIndex={1} backgroundColor={bgColor}>
      <Container
        maxW="container.xl"
        py={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="ghost" fontSize="xl">
          Jurraic Park
        </Button>
        <Box>
          <IconButton
            ml={2}
            onClick={toggleColorMode}
            aria-label="Toggle theme"
            icon={<MoonIcon />}
          />
          {walletInfo?.account ? (
            <Popover>
              <PopoverTrigger>
                <IconButton
                  ml={1}
                  aria-label="Toggle theme"
                  icon={<MdPerson />}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverBody>
                  <List spacing={3} mb={4}>
                    <ListItem>
                      <ListIcon as={MdPerson} />
                      {walletInfo.account || <Skeleton height={20} />}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdNetworkCell} />
                      {walletInfo.network?.name || <Skeleton height={20} />}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdAccountBalanceWallet} />
                      {walletInfo.wallet[1] || <Skeleton height={20} />}
                    </ListItem>
                  </List>
                  {!isCorrectNetwork && (
                    <Alert status="warning">
                      <AlertIcon />
                      <Box>
                        <Text mb={2}>
                          This app works on {networkName} network.
                        </Text>
                        <Link onClick={switchNetwork}>Switch Network</Link>
                      </Box>
                    </Alert>
                  )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              ml={2}
              onClick={() => connect()}
              isLoading={isConnecting}
              loadingText="Connecting"
            >
              Connect Wallet
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
