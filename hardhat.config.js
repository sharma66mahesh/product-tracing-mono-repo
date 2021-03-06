require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const RINKEBY_PRIVATE_KEY =
  "319896ebb901da4f6c445c77ba261ab50571f16fd7787f0d3c28f66c719c2ee8";
module.exports = {
  networks: {
    hardhat: {},
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/ee24d40ca3ff418e806d229e64aee553",
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.4",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
