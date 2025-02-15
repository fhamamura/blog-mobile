import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';

type Props = NativeStackScreenProps<RootStackParamList, 'ViewStudent'>;

interface Student {
    _id: number;
    name: string;
    email: string;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 8,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cardButton: {
        backgroundColor: '#ff0000',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    cardButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default function DeleteStudent({ route, navigation }: Props) {
    const { id } = route.params;
    const [student, setStudent] = useState<Student | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        SecureStore.getItemAsync("authToken").then((token) => {
            setToken(token);
        });

        fetch(`${API.STUDENTS}/${id}`)
            .then((res) => res.json())
            .then((data) => setStudent(data))
            .catch((error) => {
                //console.error("Erro:", error);
                Alert.alert('Erro ao carregar aluno');
            });
    }, [id]);

    useEffect(() => {
        navigation.setOptions({ title: 'Excluir Aluno' });
    }, [navigation]);

    const handleDeleteStudent= () => {
        if (!token) {
            Alert.alert('Erro', 'Token de autenticação não encontrado');
            return;
        }

        fetch(`${API.STUDENTS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    Alert.alert('Aluno excluído com sucesso!');
                    navigation.navigate('Students', { refresh: true });
                } else {
                    throw new Error('Falha ao excluir o aluno');
                }
            })
            .catch((error) => {
                console.error("Erro ao excluir aluno:", error);
                Alert.alert('Erro ao excluir aluno');
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{student?.name}</Text>
                    <Text style={styles.cardText}>{student?.email}</Text>
                    <View style={styles.cardActions}>
                        <TouchableOpacity style={styles.cardButton} onPress={handleDeleteStudent}>
                            <Text style={styles.cardButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}