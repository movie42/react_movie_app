import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function useData() {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`,
    fetcher
  );

  return {
    movie: data,
    error
  };
}

export default useData;
