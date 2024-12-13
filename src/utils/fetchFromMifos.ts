export const fetchFromMifos = async <T>(url: string, username: string, password: string): Promise<T> => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Basic Auth
        "Fineract-Platform-TenantId": "default", // Required tenant header
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
  
    return response.json();
  };
  