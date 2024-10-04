import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export const useFetchCSV = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Failed to read the response body');
        }

        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        Papa.parse<T>(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (parsedData) => {
            setData(parsedData.data);
          },
          error: (parseError: unknown) => {
            if (parseError instanceof Error) {
              setError(parseError.message);
            } else {
              setError('An error occurred while parsing CSV data');
            }
          },
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, [url]); // Re-run when the URL changes

  return { data, error };
};
