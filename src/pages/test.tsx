import { useEffect, useState } from 'react';

const LocationFetcher = () => {
  const [data, setData] = useState<{ ip: string; location: Record<string, string> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const result = await response.json();
        setData(result);
        console.log(result); // Log the API response
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Client Location and IP</h2>
      {data ? (
        <div>
          <p><strong>IP Address:</strong> {data.ip}</p>
          <p><strong>Country:</strong> {data.location.country}</p>
          <p><strong>Region:</strong> {data.location.region}</p>
          <p><strong>City:</strong> {data.location.city}</p>
          <p><strong>Latitude:</strong> {data.location.latitude}</p>
          <p><strong>Longitude:</strong> {data.location.longitude}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default LocationFetcher;
