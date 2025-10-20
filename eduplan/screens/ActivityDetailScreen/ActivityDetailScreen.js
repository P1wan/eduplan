import React, { useState, useEffect, useCallback } from 'react'; // Esta é a linha corrigida
import { View, Text, ScrollView, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ActivityDetailScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LOCAL_QUESTIONS_KEY = 'my_questions';
const LOCAL_ACTIVITIES_KEY = 'my_activities';

const ActivityDetailScreen = ({ route, navigation }) => {
  const { activityId } = route.params;
  const [activity, setActivity] = useState(null);
  const [questions, setQuestions] = useState([]);
  
  useFocusEffect(
    useCallback(() => {
      const loadActivityDetails = async () => {
        try {
          const allActivitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
          const allActivities = allActivitiesJson ? JSON.parse(allActivitiesJson) : [];
          const currentActivity = allActivities.find(a => a.id === activityId);
          setActivity(currentActivity);

          if (currentActivity?.questions) { // Lê a nova estrutura de dados
            const allQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
            const allQuestions = allQuestionsJson ? JSON.parse(allQuestionsJson) : [];
            const activityQuestions = currentActivity.questions.map(activityItem => {
                const questionData = allQuestions.find(q => q.id === activityItem.id);
                // Junta os dados da questão com o comentário da atividade
                return { ...questionData, comment: activityItem.comment };
            });
            setQuestions(activityQuestions);
          }
        } catch (e) {
          Alert.alert("Erro", "Não foi possível carregar os detalhes da atividade.");
        }
      };
      loadActivityDetails();
    }, [activityId])
  );

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar Exclusão", "Você tem certeza que deseja apagar esta atividade?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: async () => {
          try {
            const allActivitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
            const allActivities = allActivitiesJson ? JSON.parse(allActivitiesJson) : [];
            const updatedActivities = allActivities.filter(a => a.id !== activityId);
            await AsyncStorage.setItem(LOCAL_ACTIVITIES_KEY, JSON.stringify(updatedActivities));
            navigation.goBack();
          } catch (e) {
             Alert.alert("Erro", "Não foi possível apagar a atividade.");
          }
        }}
      ]
    );
  };

  if (!activity) {
    return <Text style={styles.emptyText}>Carregando atividade...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{activity.title}</Text>
        <View style={{ width: 28 }} />
      </View>
      
      <FlatList
        data={questions}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Instruções:</Text>
              <Text style={styles.instructions}>{activity.instructions || "Nenhuma instrução fornecida."}</Text>
              <View style={styles.divider} />
              <View style={styles.actionsContainer}>
                <View style={styles.actionButton}>
                  <Button title="Editar" onPress={() => navigation.navigate('CreateActivity', { activity: activity })} />
                </View>
                <View style={styles.actionButton}>
                  <Button title="Apagar" color="#E74C3C" onPress={handleDelete} />
                </View>
              </View>
              <View style={styles.divider} />
              <Text style={styles.label}>Questões:</Text>
            </View>
          </>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.questionText}>{`${index + 1}. ${item.enunciado}`}</Text>
            {item.comment && <Text style={styles.commentText}>Comentário: {item.comment}</Text>}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma questão nesta atividade.</Text>}
      />
    </SafeAreaView>
  );
};

export default ActivityDetailScreen;