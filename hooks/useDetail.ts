import { fetchPokemonInfo } from "@/api/pokemonApi";
import { PokemonInfo } from "@/types/pokemonTypes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function useDetail() {
  const { pokeId } = useLocalSearchParams<{ pokeId: string }>();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PokemonInfo>();
  const [maxStats, setMaxStats] = useState(0);

  useEffect(() => {

    const init = async () => {
      const resp = await fetchPokemonInfo(pokeId).finally(() => setLoading(false));
      setData(resp)
      setMaxStats(Math.max(...resp.stats.map((value) => value.base_stat)))
    };

    init();
  }, [pokeId]);

  return {
    pokeId,
    data,
    loading,
    maxStats,
  }
}