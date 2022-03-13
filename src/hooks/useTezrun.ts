import Network from "network";
import { useCallback } from "react";
import useBeacon from "./useBeacon";

const useTezrun = () => {
  const { tezos, contract, address, setLoading } = useBeacon();

  const getStorage = useCallback((setStorage) => {
    return contract?.storage().then((storage) => {
      console.log("storage", storage);
      setStorage(storage);
    });
  }, [contract]);


  const getApproval = useCallback(() => {
    setLoading(true);

    return tezos?.wallet.at(Network.uUSD)
      .then(contract => {
        return contract.storage()
      })
      .then((storage: any) => {
        return storage.balances.get(address)
      })
      .then(balance => {
        return balance.approvals.get(Network.contractAddress);
      })
      .then(approvals => {
        return approvals.toNumber();
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tezos, address, setLoading])


  const approve = useCallback(() => {
    console.log("approve")
    setLoading(true);

    return tezos?.wallet.at(Network.uUSD)
      .then(contract => {
        console.info("uUSD.contract", contract);
        return contract?.methods.approve(Network.contractAddress, 1000000).send()
      })
      .then(result => {
        console.info("approve", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tezos, setLoading]);


  const placeBet = useCallback((raceId, horseId, payout, amount) => {
    console.log("placeBet", raceId, horseId, payout, amount)
    setLoading(true);

    return contract?.methods
      .placeBet(horseId, payout, raceId)
      .send({ amount: amount })
      .then((result) => {
        console.info("placeBet", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contract, setLoading]);


  const takeReward = useCallback(() => {
    setLoading(true);

    return contract?.methods
      .takeReward()
      .send()
      .then((result) => {
        console.info("takeReward", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contract, setLoading]);


  return {
    getStorage,
    placeBet,
    takeReward,
    getApproval,
    approve,
  };
};

export default useTezrun;