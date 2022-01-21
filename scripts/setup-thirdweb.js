import ethers from 'ethers';
import { readFileSync, appendFileSync } from 'fs';
import dotenvFlow from 'dotenv-flow';
import { ThirdwebSDK } from '@3rdweb/sdk';
import metadatas from './metadata.js';

dotenvFlow.load(['.env', '.env.local']);

const privateKey = process.env.NEXT_PUBLIC_WALLET_KEY;
const rpcUrl = process.env.NEXT_PUBLIC_NETWORK_RPC_URL;

const sdk = new ThirdwebSDK(
  new ethers.Wallet(privateKey, ethers.getDefaultProvider(rpcUrl)),
);

(async () => {
  let nftIds = process.env.NEXT_PUBLIC_THIRD_WEB_NFT_IDS;
  let appAddress = process.env.NEXT_PUBLIC_THIRD_WEB_APP_ADDRESS;
  let bundleDropAddress = process.env.NEXT_PUBLIC_THIRD_WEB_BUNDLE_MODULE;

  /* ============ APP SETUP  ============ */
  try {
    if (appAddress) {
      throw {
        code: 0,
        message: 'NEXT_PUBLIC_THIRD_WEB_APP_ADDRESS already exists in the env',
      };
    }

    console.log('⏳ Creating app...');
    const app = await sdk.createApp({
      name: 'Jurassic Park',
      description: 'When dinosaurs rules the earth',
    });

    appAddress = app.events[0].address;
    appendFileSync('.env', `\nNEXT_PUBLIC_THIRD_WEB_APP_ADDRESS=${appAddress}`);
    console.log('✅ Successfully created app.');
  } catch (err) {
    if (err.code === 0) {
      console.log(err.message);
    } else {
      console.error("Failed to get apps from the sdk", err);
      process.exit(1);
    }
  }

  /* ============ DROP BUNDLE SETUP  ============ */
  try {
    if (bundleDropAddress) {
      throw {
        code: 0,
        message: 'NEXT_PUBLIC_THIRD_WEB_BUNDLE_MODULE already exists in the env',
      };
    }
    const app = sdk.getAppModule(appAddress);
    console.log('⏳ Deploying bundle drop...');
    const bundleDropModule = await app.deployBundleDropModule({
      name: "Jurassic Park",
      description: "When dinosaurs rules the earth",
      image: readFileSync('scripts/assets/logo.png'),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    bundleDropAddress = bundleDropModule.address;
    appendFileSync('.env', `\nNEXT_PUBLIC_THIRD_WEB_BUNDLE_MODULE=${bundleDropAddress}`);
    console.log('✅ Successfully deployed bundleDrop module.');
  } catch (error) {
    if (error.code === 0) {
      console.log(error.message);
    } else {
      console.log("failed to deploy bundleDrop module", error);
    }
  }

  /* ============ CREATE AND MINT NFT SETUP  ============ */
  try {
    if (nftIds) {
      throw {
        code: 0,
        message: 'NEXT_PUBLIC_THIRD_WEB_NFT_IDS already exists in the env',
      };
    }

    const bundleDrop = sdk.getBundleDropModule(bundleDropAddress);
    console.log('⏳ Creating batch...');
    const ids = await bundleDrop.createBatch(metadatas);

    nftIds = ids.join();

    console.log("✅ Successfully created a new NFT in the drop!");

    const claimFactory = bundleDrop.getClaimConditionFactory();
    claimFactory.newClaimPhase({ startTime: 0, maxQuantityPerTransaction: 1 });

    console.log('⏳ Setting claim condition...');

    for (const id in ids) {
      await bundleDrop.setClaimCondition(id, claimFactory);
    }

    console.log('✅ Successfully set claim condition');

    console.log('⏳ Lazy minting NFT for owner...');

    for (const id in ids) {
     await bundleDrop.claim(id, 1)
   }
    appendFileSync('.env', `\nNEXT_PUBLIC_THIRD_WEB_NFT_IDS=${nftIds}`);
    console.log("✅ Successfully minted one for the owner wallet!");
  } catch (error) {
    if (error.code === 0) {
      console.log(error.message);
    } else {
      console.error("failed to create the new NFT", error);
    }
  }
})()

export default sdk;
