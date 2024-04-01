import instance from "../core/api";
import {
  clusterApiUrl,
  Connection,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { decode } from "bs58";
export const createNFT = async (formdata) => {
  const xApiKey = localStorage.getItem("privateKey");

  const config = {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      "x-api-key": xApiKey,
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const url = "v2/nft/create";

  const response = await instance().post(url, formdata, config);
  return response;
};
export const signAndSendTransactionWithPrivateKeys = async (
  network,
  encodedTransaction,
  privateKey
) => {
  const connection = new Connection(clusterApiUrl(network), "confirmed");
  const signedTxn = await partialSignTransactionWithPrivateKeys(
    encodedTransaction,
    privateKey
  );

  const signature = await connection.sendRawTransaction(
    signedTxn.serialize({ requireAllSignatures: false })
  );
  return signature;
};
export const partialSignTransactionWithPrivateKeys = async (
  encodedTransaction,
  privateKey
) => {
  const recoveredTransaction = getRawTransaction(encodedTransaction);
  const signers = getSignersFromPrivateKeys(privateKey);
  recoveredTransaction.partialSign(signers);
  return recoveredTransaction;
};
export const getRawTransaction = (encodedTransaction) => {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, "base64")
  );
  return recoveredTransaction;
};

export const getSignersFromPrivateKeys = (privateKey) => {
  const signer = Keypair.fromSecretKey(decode(privateKey));
  return signer;
};
