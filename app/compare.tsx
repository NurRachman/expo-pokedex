import useCompare from "@/hooks/useCompare";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Dimensions, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get('screen');

export default function Detail() {
  const {
    loadingSearch,
    query,
    data,
    visibleAddPokemon,
    isError,
    onSearchPokemon,
    onVisibleModal,
    onSearch,
  } = useCompare();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperHeader}>
        <TouchableOpacity style={{ zIndex: 2 }} onPress={router.back}>
          <Ionicons name="arrow-back-outline" size={24} />
        </TouchableOpacity>

        <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', width: '100%', left: 24 }}>
          <Text style={styles.headerTitle}>Compare</Text>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{ margin: 16 }}
        keyExtractor={(item, index) => `poke-item-${index}-${item?.id}`}
        renderItem={({ item }) => {
          const maxStats = Math.max(...(item?.stats || [])?.map((value) => value.base_stat))
          return (
            <View style={styles.wrapperCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.txtValue]}>{item?.name}</Text>
                <Text style={[styles.txtLabel]}>{item?.types?.map((value) => value.type.name)?.join(', ')}</Text>
              </View>
              <Text style={[styles.txtLabel]}>{item?.abilities?.map((value) => value.ability.name)?.join(', ')}</Text>

              <View style={{ marginTop: 8 }}>
                {item?.stats?.map((value, index) => (
                  <StatsItem key={`stats-item-${index}`} label={value.stat.name} value={value.base_stat} maxStats={maxStats} />
                ))}
              </View>
            </View>
          )
        }}
        ItemSeparatorComponent={() => (
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 8 }}>
            <View style={styles.wrapperSeparator}>
              <Text style={{ fontWeight: 'bold', color: '#1F1F41' }}>VS</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={[styles.btnAddPokemon, { marginTop: 16 }]} onPress={() => onVisibleModal(true)}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Add Pokemon</Text>
          </TouchableOpacity>
        )} />

      {/* Modal Add Pokemon */}
      <Modal
        transparent
        visible={visibleAddPokemon}
        onRequestClose={() => onVisibleModal(false)}>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={[styles.headerTittle, { fontSize: 24 }]}>Add Pokédex</Text>

            <View style={styles.wrapperSearch}>
              <Ionicons name="search" color='black' size={24} />
              <TextInput
                value={query}
                onChangeText={onSearch}
                placeholder="Name or number"
                style={{ flex: 1 }} />
            </View>

            {isError && (
              <Text style={{ color: 'red', marginBottom: 16 }}>Data tidak ditemukan!</Text>
            )}

            <TouchableOpacity disabled={loadingSearch} style={[styles.btnAddPokemon, { marginBottom: 32 }]} onPress={onSearchPokemon}>
              {loadingSearch ? <ActivityIndicator color='white' /> : <Text style={{ fontWeight: 'bold', color: 'white' }}>Search Pokemon</Text>}
            </TouchableOpacity>

          </View>
        </View>

      </Modal>
      {/* Modal Add Pokemon */}
    </SafeAreaView>
  );
}

const StatsItem = ({ label = '', value = 0, maxStats = 0 }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={[styles.txtLabel, { minWidth: '35%', fontWeight: '500' }]}>{label}</Text>
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
  wrapperCard: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 8,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.17,
    // shadowRadius: 3.05,
    // elevation: 4
  },

  wrapperSeparator: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    width: 34,
    height: 34,
    borderWidth: 2,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'grey',
    textTransform: 'capitalize',
  },
  txtValue: {
    color: '#303254',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  wrapperBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E1E0E1',
  },
  btnAddPokemon: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#5D5F7A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#30325466',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  btnItemFilter: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECF3F5',
  },
  wrapperSearch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ECF3F5',
    gap: 8,
    minHeight: 48,
    marginVertical: 16,
  },
})
