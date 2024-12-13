"use client";

import { useBankAccounts } from "@/hooks/useBankAccounts";

export default function BankAccountDetails() {
  const username = "mifos"; // Replace with dynamic username
  const password = "password"; // Replace with dynamic password
  const clientId = 4; // Replace with the client ID you want to fetch

  const { accounts, loading, error } = useBankAccounts(clientId, username, password);

  if (loading) {
    return <p>Loading account details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!accounts || accounts.length === 0) {
    return <p>No accounts found for this client.</p>;
  }

  return (
    <div>
      <h1>Bank Accounts</h1>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <p>Account No: {account.accountNo}</p>
            <p>Type: {account.accountType}</p>
            <p>Balance: ${account.balance.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
