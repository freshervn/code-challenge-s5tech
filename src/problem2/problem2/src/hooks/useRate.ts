import { useEffect, useState } from "react";

const PRICE_URL = "https://interview.switcheo.com/prices.json";

function useRate() {
  const [rate, setRate] = useState<
    {
      currency: string;
      date: string;
      price: number;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    fetch(PRICE_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // Remove duplicates from data
        const uniqueData = data.filter(
          (
            item: { currency: string },
            index: number,
            self: { currency: string }[]
          ) => index === self.findIndex((t) => t.currency === item.currency)
        );
        setRate(
          uniqueData as { currency: string; date: string; price: number }[]
        );
      })
      .catch(() => setFetchError("Error fetching rate"))
      .finally(() => setLoading(false));
  }, []);

  return { rate, loading, fetchError };
}

export default useRate;
