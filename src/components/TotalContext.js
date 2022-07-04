import React, { useContext, useState } from "react";

const TotalContext = React.createContext();

export function useTotal() {
  return useContext(TotalContext);
}

export function TotalProvider({ children }, props) {
  const [totals, setTotals] = useState({
    currentBalance: props.currentBalance,
    deposit: props.deposit,
    withdrawals: props.withdrawals,
    net: props.net,
  });

  return (
    <TotalContext.Provider value={totals}>{children}</TotalContext.Provider>
  );
}
