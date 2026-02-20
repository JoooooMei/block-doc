import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('BlockDocModule', (m) => {
  const blockDoc = m.contract('BlockDoc');

  return { blockDoc };
});
