import { ethers } from 'ethers';

import lighthouse from '@lighthouse-web3/sdk';
import {
    WALLET_PRIVATE_KEY,
    WALLET_PUBLIC_KEY,
    LIGHTHOUSE_API_KEY,
} from './env';

const signAuthMessage = async (publicKey: string, privateKey: string) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = new ethers.Wallet(privateKey, provider);
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
        .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
};

export const signWithServerWallet = async () => {
    return signAuthMessage(WALLET_PUBLIC_KEY, WALLET_PRIVATE_KEY);
};

export const uploadEncryptedFileWithPath = async (filePath: string) => {
    const signedMessage = await signWithServerWallet();
    const response = await lighthouse.uploadEncrypted(
        filePath,
        LIGHTHOUSE_API_KEY,
        WALLET_PUBLIC_KEY,
        signedMessage
    );

    const { data } = response;

    console.log(response);
    return {
        name: data.Name,
        cid: data.Hash,
    };
};

export const decryptWithCid = async (cid: string) => {
    // Get file encryption key
    const signedMessage = await signWithServerWallet();
    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
        cid,
        WALLET_PUBLIC_KEY,
        signedMessage
    );

    // Decrypt File
    return lighthouse.decryptFile(cid, fileEncryptionKey.data.key);
};
