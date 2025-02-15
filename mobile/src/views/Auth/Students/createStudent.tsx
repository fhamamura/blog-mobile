import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
//import AuthContext from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
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
  button: {
    backgroundColor: '#666',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const CreateStudent: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: 'Criar Aluno' });
  }, [navigation]);

  const handleCreateStudent = () => {
    if (!name || !email || !password) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    fetch(`${API.STUDENTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, isAdmin }),
    })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert('Aluno criado com sucesso!');
          setName('');
          setEmail('');
          setPassword('');
          navigation.navigate('Students', { refresh: true });
        } else {
          Alert.alert('Erro ao criar aluno!');
        }
      })
      .catch((error) => {
        console.error("Error creating student:", error);
        Alert.alert('Erro ao criar aluno');
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateStudent}>
        <Text style={styles.buttonText}>Criar Aluno</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateStudent;