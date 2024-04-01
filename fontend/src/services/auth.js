import instance from "../core/api";

export const getPrivate = async (value) => {
  const xKey = localStorage.getItem("privateKey");

  const publicKey = localStorage.getItem("adressWallet");
  const password = value.password;
  const url = `v1/semi_wallet/get_keypair?wallet=${publicKey}&password=${password}`;

  const config = {
    headers: {
      "x-api-key": xKey,
    },
  };

  const response = await instance().get(url, config);
  return response.data.result.secretKey;
};
