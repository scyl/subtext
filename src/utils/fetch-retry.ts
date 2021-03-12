import fetch, { RequestInit } from "node-fetch";

// Fetches from specified url
// Will retry indefinitely if the response is an error
export async function fetchRetry(url: string, options?: RequestInit): Promise<any> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url, options);
      if (response.ok) {
        // eslint-disable-next-line no-await-in-loop
        return await response.json();
      }
      // eslint-disable-next-line no-console
      console.warn(`NETWORK_ERROR: unable to fetch "${url}". `, response.statusText);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`NETWORK_ERROR: unable to fetch "${url}". `, error.message);
    }
    // eslint-disable-next-line no-await-in-loop
    await timeout(500);
  }
}

function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
