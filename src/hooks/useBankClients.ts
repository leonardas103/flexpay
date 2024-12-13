import { useState, useEffect } from "react";

interface BankClient {
  id: number;
  displayName: string;
  savingsAccountId: number;
  savingsProductName: string;
}

interface UseBankClientsResponse {
  client: BankClient | null;
  loading: boolean;
  error: string | null;
}

export const useBankClients = (clientId: number, username: string, password: string): UseBankClientsResponse => {
  const [client, setClient] = useState<BankClient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8080/fineract-provider/api/v1/clients/${clientId}`, {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Basic Auth
            "Fineract-Platform-TenantId": "default", // Required tenant header
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch client: ${response.statusText}`);
        }

        const data = await response.json();
        setClient({
          id: data.id,
          displayName: data.displayName,
          savingsAccountId: data.savingsAccountId,
          savingsProductName: data.savingsAccountId,
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId, username, password]);

  return { client, loading, error };
};
