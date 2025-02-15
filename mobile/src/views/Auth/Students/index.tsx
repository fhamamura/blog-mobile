import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Students'>;

interface Student {
    _id: number;
    name: string;
    email: string;
}

export default function Students({ navigation }: Props) {
    const [students, setStudents] = useState<Student[]>([]);
    const [showHeader, setShowHeader] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string; name: string; email: string, isAdmin: boolean } | null>(null);

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Alunos' });
    }, [navigation, showHeader]);

    useEffect(() => {
        SecureStore.getItemAsync("authToken").then((token) => {
            setToken(token);
        });
        SecureStore.getItemAsync("authUser").then((user) => {
            if (user) {
                setUser(JSON.parse(user));
            }
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchStudents = async () => {
                try {
                    const response = await fetch(`${API.STUDENTS}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setStudents(data);
                } catch (error) {
                    console.error("Error fetching students:", error);
                    Alert.alert('Erro ao carregar alunos');
                }
            };

            fetchStudents();
        }, [token])
    );

return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={students}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ViewStudent', { id: item._id })}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            {token && user?.isAdmin === true ? (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateStudent')}>
                    <Text style={styles.buttonText}>Criar Novo Aluno</Text>
                </TouchableOpacity>
            ) : null}
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
});