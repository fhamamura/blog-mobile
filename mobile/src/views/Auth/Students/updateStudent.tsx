import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import AuthContext from "../../../contexts/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

const UpdateTeacher: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("authToken").then((token) => {
      setToken(token);
    });

    fetch(`${API.STUDENTS}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
      })
      .catch((error) => {
        console.error("Error fetching teacher:", error);
        Alert.alert('Erro ao carregar aluno');
      });
  }, [id]);

  const handleUpdate = async () => {
    const response = await fetch(`${API.STUDENTS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      Alert.alert('Aluno atualizado com sucesso');
      navigation.navigate('ViewStudent', { id , refresh: true});
    } else {
      Alert.alert('Erro ao atualizar aluno');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View><Text>Nome:</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <View><Text>Email:</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View><Text>Senha:</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Atualizar" onPress={handleUpdate}  color="#666" />
    </SafeAreaView>
  );
};

export default UpdateTeacher;