import { fetchPokemon, fetchPokemonFilterList, fetchPokemonFilterType } from "@/api/pokemonApi";
import { PokemonItem } from "@/types/pokemonTypes";
import { useEffect, useState } from "react";

type FilterParamsType = {
  type: 'pokemon-habitat' | 'pokemon-shape' | 'pokemon-species' | '';
  id: string;
}

export default function useIndex() {
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [tempFilter, setTempFilter] = useState<FilterParamsType>({
    type: '',
    id: '',
  });
  const [filter, setFilter] = useState<FilterParamsType>({
    type: '',
    id: '',
  });
  const [habitats, setHabitats] = useState<PokemonItem[]>([]);
  const [shapes, setShapes] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilterData] = useState<PokemonItem[]>([]);
  const [data, setData] = useState<PokemonItem[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const [respHabitat, respShape] = await Promise.all([
        fetchPokemonFilterType('pokemon-habitat'),
        fetchPokemonFilterType('pokemon-shape'),
        // fetchPokemonFilterType('pokemon-species'),
      ]);
      setHabitats(respHabitat.results);
      setShapes(respShape.results);
    }

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setData([]);
      let tempResp: PokemonItem[] = [];
      if (filter.type) {
        const resp = await fetchPokemonFilterList(filter.type, filter.id).finally(() => setLoading(false));
        tempResp = resp.pokemon_species;
      } else {
        const resp = await fetchPokemon().finally(() => setLoading(false));
        tempResp = resp.results;
      }

      setData(tempResp);
    }

    init();
  }, [filter])

  useEffect(() => {
    if (query) {
      setFilterData(data.filter((pokeItem) => {
        const pokeId = pokeItem?.url.split('/')[6];

        return pokeItem?.name.toLowerCase().includes(query.toLowerCase()) || query === pokeId;
      }))
    } else {
      setFilterData(data);
    }
  }, [query, data]);

  const onSearch = (str: string) => setQuery(str);

  const onChangeTempFilter = (params: FilterParamsType) => setTempFilter(params);

  const onFilter = () => {
    setVisibleFilter(false);
    setFilter(tempFilter);
  }

  const onVisibleFilter = (isVisible: boolean) => {
    if (isVisible) {
      setTempFilter(filter);
    }
    setVisibleFilter(isVisible);
  };

  return {
    query,
    loading,
    filteredData,
    habitats,
    visibleFilter,
    tempFilter,
    shapes,
    onChangeTempFilter,
    onFilter,
    onSearch,
    onVisibleFilter,
  }
}