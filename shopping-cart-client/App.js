import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Modal,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import CardComponent from "./components/Card";

/////// read README for BASE URL ///////
const BASE_URL = "https://5b60-180-247-164-80.ap.ngrok.io/";

export default function App() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);

  //FORM & MODAL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <CardComponent product={item} carts={carts} deleteProduct={deleteProduct} />
  );

  const deleteProduct = (id) => {
    fetch(`${BASE_URL}products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        } else {
          setProducts(products.filter((product) => product.id !== id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = () => {
    let payload = {
      title,
      description,
      stock,
      price,
      image,
    };
    fetch(`${BASE_URL}products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setModalVisible(!modalVisible);
        setProducts([...products, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

    fetch(`${BASE_URL}carts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Cannot Fetch Data");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setCarts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let calculateTotal = 0;
    for (let i = 0; i < carts.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (carts[i].productId === products[j].id) {
          calculateTotal += carts[i].total * products[j].price;
        }
      }
    }
    setTotal(calculateTotal);
  }, [carts]);

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Product</Text>
            <TextInput
              style={styles.input}
              onChangeText={(newTitle) => setTitle(newTitle)}
              placeholder="input title"
            />
            <TextInput
              style={styles.input}
              onChangeText={(newDescription) => setDescription(newDescription)}
              placeholder="input description"
            />
            <TextInput
              style={styles.input}
              onChangeText={(newStock) => setStock(newStock)}
              placeholder="input stock"
            />
            <TextInput
              style={styles.input}
              onChangeText={(newPrice) => setPrice(newPrice)}
              placeholder="input price"
            />
            <TextInput
              style={styles.input}
              onChangeText={(newImage) => setImage(newImage)}
              placeholder="input image"
            />
            <Button color="green" title="add Product" onPress={addProduct} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView>
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
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>+</Text>
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              width: "90%",
              margin: 15,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Button color="red" title="close" />
            <Button title="Go to Checkout" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  flatList: {
    width: "90%",
    margin: 10,
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#4CB050",
    alignSelf: "flex-end",
    borderRadius: 0,
    marginRight: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
