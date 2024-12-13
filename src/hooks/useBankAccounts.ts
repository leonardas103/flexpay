import { useState, useEffect } from "react";
import { fetchFromMifos } from "@/utils/fetchFromMifos";

interface BankAccount {
  id: number;
  accountNo: string;
  accountType: string;
  balance: number;
}

interface UseBankAccountsResponse {
  accounts: BankAccount[] | null;
  loading: boolean;
  error: string | null;
}

export const useBankAccounts = (clientId: number, username: string, password: string): UseBankAccountsResponse => {
  const [accounts, setAccounts] = useState<BankAccount[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchFromMifos<{ savingsAccounts: any[] }>(
          `http://localhost:8080/fineract-provider/api/v1/clients/${clientId}/accounts`,
          username,
          password
        );

        // Transform and set the data
        setAccounts(
          data.savingsAccounts.map((account) => ({
            id: account.id,
            accountNo: account.accountNo,
            accountType: account.accountType.value,
            balance: account.accountBalance,
          }))
        );
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [clientId, username, password]);

  return { accounts, loading, error };
};
