// ARQUIVO COMPLETO: Mobile/eduplan/screens/DashboardScreen/DashboardScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DashboardScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../config/firebaseConfig';

const LOCAL_ACTIVITIES_KEY = 'my_activities';
const LOCAL_QUESTIONS_KEY = 'my_questions';
const LOCAL_VERSION_KEY = 'local_questions_version';

const DashboardScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkAndUpdateQuestions = async () => {
    try {
      const versionDoc = await db.collection("app_meta").doc("version_control").get();
      const remoteVersion = versionDoc.exists ? versionDoc.data().canonical_questions_version : 1;
      const localVersion = await AsyncStorage.getItem(LOCAL_VERSION_KEY);
      
      if (!localVersion || remoteVersion > parseInt(localVersion, 10)) {
        console.log(`Nova versão encontrada (${remoteVersion}). Atualizando...`);
        const querySnapshot = await db.collection("canonical_questions").get();
        const canonicalQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isCanonical: true }));
        const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
        const userCreatedQuestions = (localQuestionsJson ? JSON.parse(localQuestionsJson) : []).filter(q => !q.isCanonical);
        const allQuestions = [...canonicalQuestions, ...userCreatedQuestions];
        await AsyncStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(allQuestions));
        await AsyncStorage.setItem(LOCAL_VERSION_KEY, remoteVersion.toString());
        console.log("Banco de questões atualizado!");
      } else {
        console.log("Banco de questões já está atualizado.");
      }
    } catch (e) {
      console.error("Falha na sincronização passiva: ", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadDashboardData = async () => {
        setLoading(true);
        try {
          await checkAndUpdateQuestions();

          if (auth.currentUser) {
            const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
            if (userDoc.exists) {
              setUserName(userDoc.data().name);
            }
          }

          const activitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
          const allActivities = activitiesJson ? JSON.parse(activitiesJson) : [];
          setActivities(allActivities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));
        } catch (e) {
          console.error("Erro ao carregar dados do dashboard", e);
        } finally {
          setLoading(false);
        }
      };
      loadDashboardData();
    }, [])
  );

  const renderActivityCarouselItem = ({ item }) => (
    <TouchableOpacity style={styles.carouselCard} onPress={() => navigation.navigate('ActivitiesTab', { screen: 'ActivityDetail', params: { activityId: item.id } })}>
      <Text style={styles.carouselCardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.carouselCardSubtitle}>{item.questions?.length || 0} questões</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.userName}>{userName || 'Professor(a)'}!</Text>
          </View>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.shortcutsContainer}>
          <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('QuestionsTab', { screen: 'AddEditQuestion', params: { question: null, originalQuestion: null } })}>
            <Ionicons name="add-circle-outline" size={32} color="#fff" />
            <Text style={styles.shortcutText}>Nova Questão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('ActivitiesTab', { screen: 'CreateActivity' })}>
            <Ionicons name="document-text-outline" size={32} color="#fff" />
            <Text style={styles.shortcutText}>Nova Atividade</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Atividades Recentes</Text>
        {loading ? <ActivityIndicator/> : (
          <FlatList
            horizontal data={activities} renderItem={renderActivityCarouselItem} keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<Text style={styles.emptyCarouselText}>Nenhuma atividade recente.</Text>}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        )}
        <Text style={styles.sectionTitle}>Calendário</Text>
        <View style={styles.calendarContainer}>
          <Calendar theme={{ arrowColor: '#4A90E2', todayTextColor: '#4A90E2', selectedDayBackgroundColor: '#4A90E2' }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;