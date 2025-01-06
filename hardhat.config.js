require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
      localhost: {
          url: "http://127.0.0.1:8545", // Ganache
          accounts: [
              "0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897", // Private key akun pertama Ganache
          ],
      },
  },
  hardhat: {
    chainId: 31337, // Pastikan ini sesuai dengan jaringan Anda
  },

};

