import { Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
export default function CardComponent(props) {
  const [inputTotal, setInputTotal] = useState(0);

  const plus = () => {
    let data = inputTotal;
    setInputTotal((data += 1));
  };

  const minus = () => {
    let data = inputTotal;
    setInputTotal((data -= 1));
  };

  useEffect(() => {
    if (props.carts) {
      for (let i = 0; i < props.carts.length; i++) {
        if (props.carts[i].productId === props.product.id) {
          setInputTotal(props.carts[i].total);
        }
      }
    }
  }, []);
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: props.product.image }} style={styles.image} />
      <Title>{props.product.title}</Title>
      <Paragraph>{props.product.description}</Paragraph>
      <Paragraph
        style={{
          width: 80,
          padding: 4,
          borderRadius: 6,
          // borderWidth: 1,
          backgroundColor: "#4CB050",
        }}
      >
        {props.product.price}
      </Paragraph>
      <Card.Actions style={{ alignSelf: "flex-end" }}>
        <Paragraph>{inputTotal}</Paragraph>
        <Button onPress={minus} color="red">
          -
        </Button>
        <Button onPress={plus} color="blue">
          +
        </Button>
        <Button
          onPress={() => {
            props.deleteProduct(props.product.id);
          }}
          color="red"
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    margin: 8,
    shadowColor: "black",
    shadowOpacity: 0.3,
  },
  image: {
    width: "20%",
    height: "20%",
  },
});
