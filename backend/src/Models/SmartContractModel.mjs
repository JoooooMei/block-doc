import { ethers } from 'ethers';
import { abi } from '../../config/abi.mjs';

import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

export class smartContractModel {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);

    this.contractAddress = process.env.CONTRACT_ADDRESS;
    this.abi = abi;

    // Contract instance
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.abi,
      this.wallet
    );
  }

  async addRecord(patientId, recordHash, recordType) {
    const tx = await this.contract.addRecord(patientId, recordHash, recordType);
    const receipt = await tx.wait();

    const block = await this.provider.getBlock(receipt.blockNumber);

    const timestamp = block.timestamp;

    return { txHash: tx.hash, timestamp };
  }

  async authorizeProvider(providerAddress) {
    const tx = await this.contract.setProviderAuthorization(
      providerAddress,
      true
    );
    await tx.wait();
    return tx.hash;
  }

  async revokeProvider(providerAddress) {
    const tx = await this.contract.setProviderAuthorization(
      providerAddress,
      false
    );
    await tx.wait();
    return tx.hash;
  }

  async isProvider(providerAddress) {
    return await this.contract.authorizedProviders(providerAddress);
  }
}
