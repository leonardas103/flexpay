"use client";

import { useBankClients } from "@/hooks/useBankClients";

export default function BankClientDetails() {
  const username = "mifos"; // Replace with dynamic username
  const password = "password"; // Replace with dynamic password
  const clientId = 4; // Replace with the client ID you want to fetch

  const { client, loading, error } = useBankClients(clientId, username, password);

  if (loading) {
    return <p>Loading client details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Client Details</h1>
      <p>Name: {client?.displayName}</p>
      <p>Email: {client?.savingsAccountId}</p>
    </div>
  );
}
