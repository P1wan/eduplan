import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ActivityListScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_ACTIVITIES_KEY = 'my_activities';

const ActivityListScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLocalActivities = async () => {
        setLoading(true);
        try {
          const activitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
          setActivities(activitiesJson ? JSON.parse(activitiesJson) : []);
        } catch (error) {
          console.error("Erro ao buscar atividades locais: ", error);
          Alert.alert('Erro', 'Não foi possível carregar as atividades do dispositivo.');
        } finally {
          setLoading(false);
        }
      };

      fetchLocalActivities();
    }, [])
  );

  // --- INÍCIO DA CORREÇÃO ---
  // A função onPress agora navega para a tela de detalhes, passando o ID da atividade.
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ActivityDetail', { activityId: item.id })}>
      <View style={styles.card}>
        <Text style={styles.titleText}>{item.title}</Text>
        {/* CORREÇÃO AQUI */}
        <Text style={styles.detailsText}>{item.questions?.length || 0} questões</Text>
      </View>
    </TouchableOpacity>
  );
  // --- FIM DA CORREÇÃO ---

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Atividades</Text>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }}/>
      ) : (
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma atividade criada.</Text>}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('CreateActivity', { activity: null })} // Passa null para garantir o modo de criação
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ActivityListScreen;