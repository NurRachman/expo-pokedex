import useDetail from "@/hooks/useDetail";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get('screen');

export default function Detail() {
  const { pokeId, data, maxStats } = useDetail();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperHeader}>
        <TouchableOpacity style={{ zIndex: 2 }} onPress={router.back}>
          <Ionicons name="arrow-back-outline" size={24} />
        </TouchableOpacity>

        <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', width: '100%', left: 24 }}>
          <Text style={styles.headerTitle}>{data?.name}</Text>
          <Text style={{ color: '#686A75', fontWeight: '500' }}>{pokeId}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ gap: 16, paddingVertical: 16 }}>
        <View style={{ marginHorizontal: 16, backgroundColor: '#CAE3D6', height: height * 0.35, flex: 1, borderRadius: 8, padding: 16 }}>
          <Image style={{ flex: 1 }} contentFit="contain" source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png` }} />
        </View>

        <View style={{ marginHorizontal: 16, marginTop: 24 }}>
          <Text style={styles.headerTitle}>General Information</Text>

          <View style={{ gap: 8, marginTop: 8 }}>
            <GeneralItem label="Height" value={`${data?.height} m`} />

            <GeneralItem label="Weight" value={`${data?.weight} kg`} />

            <GeneralItem label="Experience" value={`${data?.base_experience}`} />

            <GeneralItem label="Species" value={data?.species.name} />

            <GeneralItem label="Abilities" value={data?.abilities?.map((value) => value.ability.name)?.join(', ')} />

            <GeneralItem label="Types" value={data?.types?.map((value) => value.type.name)?.join(', ')} />
          </View>
        </View>

        <View style={{ marginHorizontal: 16, marginTop: 24 }}>
          <Text style={styles.headerTitle}>Stats</Text>

          <View style={{ gap: 8, marginTop: 8 }}>
            {data?.stats?.map((value, index) => (
              <StatsItem key={`stats-item-${index}`} label={value.stat.name} value={value.base_stat} maxStats={maxStats} />
            ))}
          </View>
        </View>

      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/compare', params: { pokeId } })}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>VS</Text>
      </TouchableOpacity>
      {/* FAB */}
    </SafeAreaView>
  );
}

const GeneralItem = ({ label = '', value = '' }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={[styles.txtLabel, { minWidth: 80 }]}>{label}</Text>
      <Text style={[styles.txtValue, { minWidth: 100, }]}>{value}</Text>
    </View>
  )
};

const StatsItem = ({ label = '', value = 0, maxStats = 0 }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={[styles.txtLabel, { minWidth: '35%' }]}>{label}</Text>
      <Text style={[styles.txtValue, { minWidth: '10%', }]}>{value}</Text>
      <View style={styles.wrapperBar}>
        <View style={{ width: `${Math.round((value / maxStats) * 100)}%`, height: 4, backgroundColor: '#7FCB7C' }} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    minHeight: 45,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F1F41',
    textTransform: 'capitalize',
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#40425A',
  },
  headerTittle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#303254',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5E6074',
  },
  txtLabel: {
    fontWeight: 'bold',
    color: 'grey'
  },
  txtValue: {
    color: '#303254',
    fontWeight: 'bold'
  },
  wrapperBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E1E0E1',
  },
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: 'white',
    right: 32,
    bottom: 32,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  }
})
