import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import {
    WALLET_PRIVATE_KEY,
    WALLET_PUBLIC_KEY,
    LIGHTHOUSE_API_KEY,
} from './env';

import { applyAccessCondition } from '@lighthouse-web3/sdk';

export const getClient = () => {
    return lighthouse;
};

export const signAuthMessage = async (
    publicKey: string,
    privateKey: string
) => {
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

// TODO refactor similar methods
export const uploadEncryptedFileWithText = async (text: string) => {
    const signedMessage = await signWithServerWallet();
    const response = await lighthouse.textUploadEncrypted(
        text,
        LIGHTHOUSE_API_KEY,
        WALLET_PUBLIC_KEY,
        signedMessage
    );

    const { data } = response;

    return {
        name: data.Name,
        cid: data.Hash,
    };
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

export const applyAccessConditionWithCid = async (
    cid: string,
    contentUri: string
) => {
    console.log('applyAccessConditionWithCid', cid);
    const signedMessage = await signWithServerWallet();
    const conditions = [
        {
            id: 1,
            chain: 'calibrationnet',
            method: 'retrieve',
            standardContractType: 'Custom',
            contractAddress: '0xC21144be080cddEe3d7d1D7171F7826BcD0601aF',
            returnValueTest: {
                comparator: '==',
                value: contentUri,
            },
            parameters: [],
            inputArrayType: [],
            outputType: 'uint256',
        },
    ];
    return applyAccessCondition(
        WALLET_PUBLIC_KEY,
        cid,
        signedMessage,
        conditions
    );
};
