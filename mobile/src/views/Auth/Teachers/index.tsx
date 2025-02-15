import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Teachers'>;

interface Teacher {
    _id: number;
    name: string;
    email: string;
}

export default function Teachers({ navigation }: Props) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [showHeader, setShowHeader] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string; name: string; email: string, isAdmin: boolean } | null>(null);

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Professores' });
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
            const fetchTeachers = async () => {
                try {
                    const response = await fetch(`${API.TEACHERS}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setTeachers(data);
                } catch (error) {
                    console.error("Error fetching teachers:", error);
                    Alert.alert('Erro ao carregar professores');
                }
            };

            fetchTeachers();
        }, [token])
    );

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={teachers}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ViewTeacher', { id: item._id })}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            {token && user?.isAdmin === true ? (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateTeacher')}>
                    <Text style={styles.buttonText}>Criar Novo Professor</Text>
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