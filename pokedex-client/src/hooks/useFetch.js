import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (page, token) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const sendQuery = async () => {
    try {
      if (hasMore) {
        setLoading(true);
        setError(false);
        const res = await axios.get(
          `http://localhost:8000/api/pokedex/paginate_pokemon?offset=${offset}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setList((prev) => [...prev, ...res.data.results]);
        setOffset(res.data.offset);
        setHasMore(res.data.url ? true : false);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    sendQuery();
  }, [page]);

  return { loading, error, list, hasMore };
};

export default useFetch;
