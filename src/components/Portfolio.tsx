import { useCallback, useEffect } from "react";
import api from "../services/api";

export default function Portfolio() {
  const fetchRepos = useCallback(async () => {
    try {
      const { data } = await api.get("/repos");
      console.log(data);
    } catch (err) {
      console.error("Error fetching repos:", err);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section className="w-full">
      <h1></h1>
    </section>
  );
}
