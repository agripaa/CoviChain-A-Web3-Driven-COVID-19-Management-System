const { ethers } = require("hardhat");

async function main() {
    const deployer = new ethers.Wallet(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Private key dari Account #0
        ethers.provider
    );

    console.log("Deploying contracts with the account:", deployer.address);

    // Mendapatkan saldo akun
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    // Deploy contract
    const UserCovidManagement = await ethers.getContractFactory("UserCovidManagement", deployer);
    const userCovidData = await UserCovidManagement.deploy();

    await userCovidData.waitForDeployment();
    console.log("UserCovidManagement deployed to:", userCovidData.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
