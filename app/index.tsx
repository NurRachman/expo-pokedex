import PokeCard from "@/components/PokeCard";
import useIndex from "@/hooks/useIndex";
import { getPokeId } from "@/utils/helper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {
    filteredData,
    habitats,
    loading,
    visibleFilter,
    query,
    tempFilter,
    shapes,
    onChangeTempFilter,
    onSearch,
    onFilter,
    onVisibleFilter,
  } = useIndex();


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        ListHeaderComponent={
          <View style={{ gap: 8, marginVertical: 24 }}>
            <Text style={styles.headerTittle}>Pokédex</Text>
            <Text style={styles.descriptionTitle}>Search for a Pokémon by name or using its National Pokédex number.</Text>

            <View style={styles.wrapperHeader}>
              <View style={styles.wrapperSearch}>
                <Ionicons name="search" color='black' size={24} />
                <TextInput
                  value={query}
                  onChangeText={onSearch}
                  placeholder="Name or number"
                  style={{ flex: 1 }} />
              </View>

              <TouchableOpacity style={styles.btnFilter} onPress={() => onVisibleFilter(true)}>
                <Ionicons name="options-outline" size={20} color='white' />
              </TouchableOpacity>
            </View>
          </View>
        }
        numColumns={2}
        data={filteredData}
        renderItem={({ item, index }) => (
          <PokeCard
            pokeItem={item}
            index={index}
            onPress={() => router.push('/detail')} />
        )}
        ListEmptyComponent={
          <View style={styles.wrapperEmpty}>
            {loading ? <ActivityIndicator color='#303254' /> : <Text style={styles.descriptionTitle}>Data tidak tersedia!</Text>}
          </View>
        } />

      <Modal
        transparent
        visible={visibleFilter}
        onRequestClose={() => onVisibleFilter(false)}>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={[styles.headerTittle, { fontSize: 24 }]}>Filter Pokédex</Text>

            <Text style={[styles.descriptionTitle, { fontSize: 16, marginTop: 16 }]}>Filter By Habitats</Text>
            <View style={styles.wrapperGroupFilter}>
              {habitats.map((value, index) => {
                const isActive = tempFilter.type === 'pokemon-habitat' && tempFilter.id === getPokeId(value.url);
                return (
                  <TouchableOpacity
                    key={`habitat-item-${index}`}
                    style={[styles.btnItemFilter, isActive && { borderColor: '#5D5F7A' }]}
                    onPress={() => {
                      onChangeTempFilter({ id: getPokeId(value.url), type: 'pokemon-habitat' });
                    }}>
                    <Text style={[styles.txtItemFilter, isActive && { fontWeight: 'bold', color: '#5D5F7A' }]}>{value.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View style={{ borderTopWidth: 0.5, borderColor: 'gray', marginTop: 16 }} />

            <Text style={[styles.descriptionTitle, { fontSize: 16, marginTop: 16 }]}>Filter By Shapes</Text>
            <View style={styles.wrapperGroupFilter}>
              {shapes.map((value, index) => {
                const isActive = tempFilter.type === 'pokemon-shape' && tempFilter.id === getPokeId(value.url);
                return (
                  <TouchableOpacity
                    key={`habitat-item-${index}`}
                    style={[styles.btnItemFilter, isActive && { borderColor: '#5D5F7A' }]}
                    onPress={() => {
                      onChangeTempFilter({ id: getPokeId(value.url), type: 'pokemon-shape' });
                    }}>
                    <Text style={[styles.txtItemFilter, isActive && { fontWeight: 'bold', color: '#5D5F7A' }]}>{value.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <TouchableOpacity style={[styles.btnFilter, { marginTop: 16 }]} onPress={onFilter}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Apply</Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatList: {
    padding: 16,
  },
  headerTittle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#303254',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5E6074',
  },
  btnFilter: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#5D5F7A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250
  },
  wrapperHeader: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 16
  },
  wrapperSearch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ECF3F5',
    gap: 8
  },

  // Modal
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
  txtItemFilter: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    color: 'gray',
    textTransform: 'capitalize',
  },
  wrapperGroupFilter: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 8
  },
})
