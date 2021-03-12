import fetch from "node-fetch";

// Fetches from specified url
// Will retry indefinitly if the response is an error
export async function fetchRetry(url: string, options?: any): Promise<any> {
  let result: any | undefined;

  while (result === undefined) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url, options);
      if (response.ok) {
      // eslint-disable-next-line no-await-in-loop
        result = await response.json();
      } else {
        // eslint-disable-next-line no-console
        console.warn(`NETWORK_ERROR: unable to fetch "${url}". `, response.statusText);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`NETWORK_ERROR: unable to fetch "${url}". `, error.message);
    }
  }

  return result;
}
