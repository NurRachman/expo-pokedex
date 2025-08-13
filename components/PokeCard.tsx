import { PokemonItem } from "@/types/pokemonTypes";
import { getPokeId } from "@/utils/helper";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type PokeCardType = {
  index: number;
  onPress: VoidFunction;
  pokeItem?: PokemonItem;
}

export default function PokeCard({ index = 0, onPress = () => { }, pokeItem }: PokeCardType) {
  const pokeId = pokeItem?.url ? getPokeId(pokeItem?.url) : '1';
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: index % 2 === 0 ? '#C4DADC' : '#CAE3D6' }]}
      onPress={onPress}>

      <Image
        style={{ width: 100, height: 100, borderRadius: 8 }}
        source={{ uri: imageUrl }} />

      <Text style={[styles.pokeName, { marginTop: 8, textAlign: 'center' }]}>{pokeItem?.name || ''}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 180,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212B3F',
    textTransform: 'capitalize',
  },
})