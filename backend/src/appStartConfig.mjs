import { SmartContractRepository } from './repository/smartContractRepository.mjs';

export const appStartConfig = () => {
  verifyProvider();
};

const verifyProvider = async () => {
  const address = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

  const verified = await new SmartContractRepository().isProvider(address);

  if (verified) {
    console.log(`\nProvider is authorized \nProvider adress: ${address}`);
    return;
  }

  await new SmartContractRepository().authorizeProvider(address);

  console.log(`\nProvider is authorized \nProvider adress: ${address}`);
};
