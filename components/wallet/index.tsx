import React, { useState } from "react";
import { useBalance, useContract, useProvider, useAccount } from "wagmi";
import { ADDRESS } from "../../constants/address";
import Abi from "../../abi/abi.json";
import useMounted from "../../pages/useMounted";
import { ethers } from "ethers";

export default function WalletContainer() {
  const { data, isError, isLoading } = useBalance({
    addressOrName: ADDRESS,
  });

  const { address: account } = useAccount();
  const [balanceOf, setBalanceOf] = useState<string>("");

  const provider = useProvider();
  const contract = useContract({
    addressOrName: ADDRESS,
    contractInterface: Abi,
    signerOrProvider: provider,
  });
  const isMounted = useMounted();

  const handleBalanceOf = async () => {
    try {
      const rs = await contract.balanceOf(account);

      setBalanceOf(ethers.utils.formatEther(rs));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !isMounted) return <div>Loading…</div>;

  if (isError) return <div>Error fetching balance</div>;

  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
      <p>Balance Of WETH: {balanceOf}</p>
      <div>
        <button onClick={handleBalanceOf}>Get Balance Of</button>
      </div>
    </div>
  );
}
