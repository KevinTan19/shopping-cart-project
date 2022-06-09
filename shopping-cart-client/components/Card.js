import { Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet } from "react-native";
export default function CardComponent(props) {
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
        <Button onPress={() => {}} color="red">
          -
        </Button>
        <Button onPress={() => {}} color="blue">
          +
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
