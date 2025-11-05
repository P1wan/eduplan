// Local: Mobile/eduplan/screens/ActivityDetailScreen/ActivityDetailScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Button, Alert, FlatList, TouchableOpacity, Share } from 'react-native';
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

          if (currentActivity?.questions) {
            const allQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
            const allQuestions = allQuestionsJson ? JSON.parse(allQuestionsJson) : [];
            const activityQuestions = currentActivity.questions.map(activityItem => {
                const questionData = allQuestions.find(q => q.id === activityItem.id);
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

  const handleExport = async () => {
    if (!activity || !questions) {
      Alert.alert("Erro", "Dados da atividade ainda não carregados.");
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    let professorName = 'Professor(a)';
    try {
      const sessionJson = await AsyncStorage.getItem('user_session');
      if (sessionJson) professorName = JSON.parse(sessionJson).name;
    } catch (e) { console.error("Erro ao ler nome para exportação"); }

    let exportText = `Atividade: ${activity.title}\n`;
    exportText += `Professor(a): ${professorName}\n`;
    exportText += `Data de Exportação: ${formattedDate}\n`;
    if (activity.date) { // Adiciona a data da atividade se existir
      exportText += `Data da Atividade: ${activity.date}\n`;
    }
    if (activity.instructions) {
      exportText += `Instruções: ${activity.instructions}\n`;
    }
    exportText += "----------------------------\n\n";

    const formattedQuestions = questions.map((q, index) => {
      let questionString = `${index + 1}. ${q.enunciado}\n`;
      if (q.alternativas && q.alternativas.length > 0) {
        const letters = ['A', 'B', 'C', 'D'];
        q.alternativas.forEach((alt, i) => {
          if (alt && alt.trim() !== '') {
            questionString += `   ${letters[i]}) ${alt}\n`;
          }
        });
      }
      if (q.comment) {
        questionString += `   *Comentário:* ${q.comment}\n`;
      }
      questionString += `\n`;
      return questionString;
    }).join('');

    exportText += formattedQuestions;

    try {
      await Share.share({
        message: exportText,
        title: `Atividade: ${activity.title}`
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar a atividade.");
    }
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

              {/* --- EXIBIR A DATA SE EXISTIR --- */}
              {activity.date && (
                <>
                  <Text style={styles.label}>Data:</Text>
                  <Text style={styles.dateText}>{activity.date}</Text>
                </>
              )}
              {/* --- FIM DA EXIBIÇÃO DA DATA --- */}

              <View style={styles.divider} />
              <View style={styles.actionsContainer}>
                <View style={styles.actionButton}>
                  <Button title="Editar" onPress={() => navigation.navigate('CreateActivity', { activity: activity })} />
                </View>
                <View style={styles.actionButton}>
                  <Button title="Exportar" onPress={handleExport} />
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