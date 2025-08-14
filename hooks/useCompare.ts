import { fetchPokemonInfo } from "@/api/pokemonApi";
import { PokemonInfo } from "@/types/pokemonTypes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function useCompare() {
  const { pokeId } = useLocalSearchParams<{ pokeId: string }>();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PokemonInfo[]>();
  const [maxStats, setMaxStats] = useState(0);
  const [visibleAddPokemon, setVisibleAddPokemon] = useState(false);
  const [query, setQuery] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const init = async () => {
      const resp = await fetchPokemonInfo(pokeId).finally(() => setLoading(false));
      setData([resp])
      setMaxStats(Math.max(...resp.stats.map((value) => value.base_stat)))
    };

    init();
  }, [pokeId]);

  const onVisibleModal = (isVisible: boolean) => {
    if (isVisible) {
      setIsError(false);
      setLoadingSearch(false)
      setQuery('')
    }

    setVisibleAddPokemon(isVisible)
  };

  const onSearchPokemon = async () => {
    if (!query) {
      return;
    }
    setIsError(false);
    setLoadingSearch(true);
    try {
      const resp = await fetchPokemonInfo(query).finally(() => setLoadingSearch(false));
      if (resp) {
        const tempData = data || [];
        tempData.push(resp);
        setData(tempData);
        onVisibleModal(false);
      } else {
        setQuery('');
        setIsError(true);
      }
    } catch (error) {
      setQuery('');
      setIsError(true);
    }
  };

  const onSearch = (str: string) => setQuery(str);

  return {
    pokeId,
    data,
    loading,
    maxStats,
    visibleAddPokemon,
    query,
    loadingSearch,
    isError,
    onSearchPokemon,
    onVisibleModal,
    onSearch,
  }
}