import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { styles } from './ActivityListScreen.styles';

const ActivityListScreen = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  // Função para carregar atividades do Firestore
  const loadActivities = async () => {
    try {
      const querySnapshot = await db.collection('activities').get();
      const activitiesData = [];
      querySnapshot.forEach((doc) => {
        activitiesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setActivities(activitiesData);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
      Alert.alert('Erro', 'Não foi possível carregar as atividades');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Função para deletar uma atividade
  const deleteActivity = async (activityId) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta atividade?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.collection('activities').doc(activityId).delete();
              setActivities(activities.filter(a => a.id !== activityId));
              Alert.alert('Sucesso', 'Atividade excluída com sucesso!');
            } catch (error) {
              console.error('Erro ao deletar atividade:', error);
              Alert.alert('Erro', 'Não foi possível excluir a atividade');
            }
          }
        }
      ]
    );
  };

  // Função para refresh da lista
  const onRefresh = () => {
    setRefreshing(true);
    loadActivities();
  };

  // Carregar atividades quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      loadActivities();
    }, [])
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle} numberOfLines={1}>
            {item.titulo || 'Atividade sem título'}
          </Text>
          <Text style={styles.activitySubject}>
            {item.disciplina || 'Disciplina não informada'}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              // TODO: Implementar edição
              Alert.alert('Info', 'Funcionalidade de edição em desenvolvimento');
            }}
          >
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteActivity(item.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {item.descricao && (
        <Text style={styles.activityDescription} numberOfLines={2}>
          {item.descricao}
        </Text>
      )}

      <View style={styles.activityDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Duração:</Text>
          <Text style={styles.detailValue}>
            {item.duracao || 'Não informada'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tipo:</Text>
          <Text style={styles.detailValue}>
            {item.tipo || 'Não informado'}
          </Text>
        </View>
      </View>

      {item.objetivos && item.objetivos.length > 0 && (
        <View style={styles.objectivesContainer}>
          <Text style={styles.objectivesTitle}>Objetivos:</Text>
          {item.objetivos.slice(0, 2).map((obj, index) => (
            <Text key={index} style={styles.objectiveText} numberOfLines={1}>
              • {obj}
            </Text>
          ))}
          {item.objetivos.length > 2 && (
            <Text style={styles.moreObjectives}>+ {item.objetivos.length - 2} objetivos</Text>
          )}
        </View>
      )}

      <Text style={styles.activityDate}>
        Criada em: {item.data ? new Date(item.data.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível'}
      </Text>
    </View>
  );

  const navigateToCreateActivity = () => {
    navigation.navigate('CreateActivity');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Carregando atividades...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Atividades</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={navigateToCreateActivity}
        >
          <Text style={styles.addButtonText}>+ Nova Atividade</Text>
        </TouchableOpacity>
      </View>

      {activities.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma atividade encontrada</Text>
          <Text style={styles.emptySubtext}>
            Crie sua primeira atividade usando o botão acima
          </Text>
        </View>
      ) : (
        <FlatList
          data={activities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ActivityListScreen;
