import React, { useContext } from "react";
import { View, Button, StyleSheet } from "react-native";
import AuthContext from "../../../contexts/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

const Logout: React.FC = () => {
  const { signOut } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Button title="Sair" onPress={handleSignOut}  color="#333" />
    </View>
  );
};

export default Logout;
