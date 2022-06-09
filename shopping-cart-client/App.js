import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import CardComponent from "./components/Card";
const BASE_URL = "https://4ca7-180-247-164-80.ap.ngrok.io/";

export default function App() {
  const [products, setProducts] = useState([]);
  const [total, SetTotal] = useState(0);
  const renderItem = ({ item }) => <CardComponent product={item} />;

  useEffect(() => {
    fetch(`${BASE_URL}products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Cannot Fetch Data");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!products) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(product) => product.id}
        style={styles.flatList}
      />
      <Text>Dummy product</Text>
      <View
        style={{
          flex: 1,
          width: "90%",
          backgroundColor: "white",
          margin: 15,
        }}
      >
        <View>
          <AntDesign name="shoppingcart" size={24} color="black" />
          <Text>Total - Rp. {total}</Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "90%",
            margin: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button color="red" title="close" />
          <Button title="Go to Checkout" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  flatList: {
    width: "90%",
    margin: 10,
  },
  button: {
    borderRadius: "30%",
  },
});
