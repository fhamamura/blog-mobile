import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';

type Props = NativeStackScreenProps<RootStackParamList, 'ViewStudent'>;

interface Student {
    _id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export default function ViewStudent({ route, navigation }: Props) {
    const { id } = route.params;
    const [student, setStudent] = useState<Student | null>(null);
    const UseNavigation = useNavigation();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string; name: string; email: string, isAdmin: boolean } | null>(null);

    useEffect(() => {
        UseNavigation.setOptions({ title: 'Visualizar Estudante' });
        navigation.setOptions({ title: 'Visualizar Estudante' });
    }, [navigation]);

    useEffect(() => {
        SecureStore.getItemAsync("authToken").then((token) => {
            setToken(token);
        });
        SecureStore.getItemAsync("authUser").then((user) => {
            if (user) {
                setUser(JSON.parse(user));
            }
        });
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            const fetchStudentData = async () => {
                try {
                    const response = await fetch(`${API.STUDENTS}/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setStudent(data);
                } catch (error) {
                    console.error("Error fetching student:", error);
                    Alert.alert('Erro ao carregar estudante');
                }
            };
    
            fetchStudentData();
        }, [id, token])
  );
  
  const deleteStudent = () => {
    navigation.navigate('DeleteStudent', { id });
};

const updateStudent = () => {
    navigation.navigate('UpdateStudent', { id });
};

  if (!student) return <Text>Carregando...</Text>;

    return (
            <SafeAreaView style={styles.SafeAreaView}>
                <ScrollView>
                    <Text style={{ fontSize: 24 }}>{student.name}</Text>
                    <Text style={{ fontSize: 16, marginVertical: 10 }}>Email: {student.email}</Text>
                    <Text style={{ fontSize: 16, marginVertical: 10 }}>Senha: {student.password}</Text>
                    {token && user?.isAdmin ? (
                        <>
                            <TouchableOpacity style={styles.button} onPress={updateStudent}>
                                <Text style={styles.buttonText}>Atualizar Aluno</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonSpacing} />
                            <TouchableOpacity style={styles.button} onPress={deleteStudent}>
                                <Text style={styles.buttonText}>Excluir Aluno</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                </ScrollView>
            </SafeAreaView>
        );
    }
    
    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#666', // Cor do botão de login
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginVertical: 10,
        },
        buttonText: {
            color: '#FFFFFF', // Cor do texto do botão de login
            fontSize: 16,
        },
        buttonSpacing: {
            height: 10,
        },
        SafeAreaView: {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 0
        },
    });