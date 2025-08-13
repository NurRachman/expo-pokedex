import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get('screen');

const MENUS = ['Forms', 'Detail', 'Types', 'Stats', 'Weapon'];

export default function Detail() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperHeader}>
        <TouchableOpacity style={{ zIndex: 2 }} onPress={router.back}>
          <Ionicons name="arrow-back-outline" size={24} />
        </TouchableOpacity>

        <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', width: '100%', left: 24 }}>
          <Text style={styles.headerTitle}>Venusaur</Text>
          <Text style={{ color: '#686A75', fontWeight: '500' }}>003</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16, paddingVertical: 16 }}>
        <View style={{ marginHorizontal: 16, backgroundColor: '#CAE3D6', height: height * 0.35, flex: 1, borderRadius: 8 }} />

        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 8, paddingHorizontal: 16, marginTop: 16 }}>
          {MENUS.map((value, index) => (
            <TouchableOpacity key={`menu-item-${index}`}>
              <Text style={[styles.menuText, index === 0 ? { color: '#40425A' } : { color: "#9094A1" }]}>{value}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#40425A' }}>Mega Evolutaion</Text>
          <Text style={{ color: '#9094A1', letterSpacing: 1, fontWeight: '500' }} >In order to support its flower, which has grown larger due to Mega Evolution, its back and legs have become stronger.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#40425A',
  },
})
