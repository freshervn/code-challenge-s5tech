interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface Props extends BoxProps {}
  
  const PRIORITY_MAP: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  
  const getPriority = (chain: string): number =>
    PRIORITY_MAP[chain] ?? -99;
  
  const WalletPage: React.FC<Props> = (props) => {
    const { ...rest } = props;
  
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const processedBalances = useMemo(() => {
      return balances
        .filter((b) => getPriority(b.blockchain) > -99 && b.amount > 0)
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
        .map((b) => {
          const price = prices[b.currency] ?? 0;
          return {
            ...b,
            formatted: b.amount.toFixed(4),
            usdValue: b.amount * price,
          };
        });
    }, [balances, prices]);
  
    return (
      <div {...rest}>
        {processedBalances.map((balance) => (
          <WalletRow
            key={balance.currency}
            amount={balance.amount}
            formattedAmount={balance.formatted}
            usdValue={balance.usdValue}
          />
        ))}
      </div>
    );
  };
  