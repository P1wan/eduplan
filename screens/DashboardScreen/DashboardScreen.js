// ARQUIVO COMPLETO E CORRIGIDO: Mobile/eduplan/screens/DashboardScreen/DashboardScreen.js

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DashboardScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../config/firebaseConfig'; // db ainda é necessário para buscar o nome
// Removidas importações não usadas: collection, getDocs
import { colors, spacing } from '../../styles/theme';

const LOCAL_ACTIVITIES_KEY = 'my_activities';
const USER_PROFILE_KEY = 'user_profile';

// Funções auxiliares (formatDateForCalendar, parseDateString, validateDate)
const formatDateForCalendar = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      return `${year}-${month}-${day}`;
    }
  }
  return null;
};

const parseDateString = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }
    return null;
}

const validateDate = (dateString) => {
    if (!dateString || dateString.trim() === '') return true;
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);
    if (!match) return false;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 2000 || year > 2100) return false;
    if ([4, 6, 9, 11].includes(month) && day > 30) return false;
    if (month === 2 && day > 29) return false; // Não valida bissexto
    return true;
};

const DashboardScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('🧑‍🏫');
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [allActivitiesWithDate, setAllActivitiesWithDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});

  // As funções checkAndUpdateQuestions e restoreUserData foram REMOVIDAS daqui

  const generateMarkedDates = (activitiesList) => {
    const marks = {};
    activitiesList.forEach(activity => {
      const formattedDate = formatDateForCalendar(activity.date);
      if (formattedDate) {
        marks[formattedDate] = { marked: true, dotColor: colors.primary };
      }
    });
    return marks;
  };

  useFocusEffect(
    useCallback(() => {
      const loadDashboardData = async () => {
        console.log("Dashboard: Iniciando carregamento de dados...");
        setLoading(true);
        try {
          // NÃO chama mais restoreUserData ou checkAndUpdateQuestions aqui

          // Carrega nome do usuário (do Firestore - necessário a cada foco caso mude)
          if (auth.currentUser) {
            const userDocRef = db.collection("users").doc(auth.currentUser.uid);
            const userDoc = await userDocRef.get();
            if (userDoc.exists) {
              setUserName(userDoc.data().name);
            } else {
               console.log("Dashboard: Perfil não encontrado no Firestore ao carregar.");
               // Tenta pegar do AsyncStorage como fallback se tivermos salvo lá antes
               const sessionJson = await AsyncStorage.getItem('user_session');
               if (sessionJson) setUserName(JSON.parse(sessionJson).name);
            }
          }

          // Carrega avatar (do AsyncStorage)
          const profileJson = await AsyncStorage.getItem(USER_PROFILE_KEY);
          setUserAvatar(profileJson ? JSON.parse(profileJson).avatar : '🧑‍🏫');

          // Carrega atividades do AsyncStorage (que foram sincronizadas pela SyncScreen)
          const activitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
          const allActivities = activitiesJson ? JSON.parse(activitiesJson) : [];
          console.log(`Dashboard: ${allActivities.length} atividades lidas do AsyncStorage.`);

          // Prepara dados para UI
          setRecentActivities(allActivities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));
          const activitiesWithDate = allActivities.filter(a => a.date && validateDate(a.date));
          setAllActivitiesWithDate(activitiesWithDate);
          setMarkedDates(generateMarkedDates(activitiesWithDate));
          const today = new Date(); today.setHours(0, 0, 0, 0);
          const sevenDaysLater = new Date(today); sevenDaysLater.setDate(today.getDate() + 7);
          const upcoming = activitiesWithDate
            .map(a => ({ ...a, parsedDate: parseDateString(a.date) }))
            .filter(a => a.parsedDate && a.parsedDate >= today && a.parsedDate <= sevenDaysLater)
            .sort((a, b) => a.parsedDate - b.parsedDate);
          setUpcomingActivities(upcoming);

        } catch (e) {
            console.error("Erro ao carregar dados da dashboard:", e);
            // Considerar mostrar um erro mais amigável ou estado de erro na UI
        } finally {
          setLoading(false);
          console.log("Dashboard: Carregamento de dados finalizado.");
        }
      };
      loadDashboardData();
    }, []) // Roda a cada foco para atualizar nome/avatar/atividades locais
  );

  const onDayPress = (day) => {
    const dateString = day.dateString;
    const activitiesOnThisDay = allActivitiesWithDate.filter(activity => formatDateForCalendar(activity.date) === dateString);
    if (activitiesOnThisDay.length > 0) {
      const titles = activitiesOnThisDay.map(a => a.title).join('\n - ');
      Alert.alert(`Atividades em ${dateString.split('-').reverse().join('/')}:`, `- ${titles}`);
    }
  };

  const renderActivityCarouselItem = ({ item }) => (
    <TouchableOpacity style={styles.carouselCard} onPress={() => navigation.navigate('ActivitiesTab', { screen: 'ActivityDetail', params: { activityId: item.id } })}>
      <Text style={styles.carouselCardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.carouselCardSubtitle}>{item.questions?.length || 0} questões</Text>
    </TouchableOpacity>
  );

   const renderUpcomingActivityItem = ({ item }) => (
     <TouchableOpacity
       style={styles.upcomingCard}
       onPress={() => navigation.navigate('ActivitiesTab', { screen: 'ActivityDetail', params: { activityId: item.id } })}
     >
       <Text style={styles.upcomingDate}>{item.date}</Text>
       <Text style={styles.upcomingTitle} numberOfLines={1}>{item.title}</Text>
     </TouchableOpacity>
   );

  return (
    <SafeAreaView style={styles.container}>
       {/* Usamos ScrollView apenas se o loading terminou */}
      {loading ? (
           <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
           </View>
        ) : (
          <ScrollView>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName || 'Professor(a)'}!</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.avatarButton}>
                <Text style={styles.avatarDisplay}>{userAvatar}</Text>
              </TouchableOpacity>
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
            {/* Verifica se recentActivities tem itens antes de renderizar FlatList */}
            {recentActivities.length > 0 ? (
                <FlatList
                    horizontal
                    data={recentActivities}
                    renderItem={renderActivityCarouselItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: spacing.large }}
                />
            ) : (
                <Text style={styles.emptyCarouselText}>Nenhuma atividade recente.</Text>
            )}

            <Text style={styles.sectionTitle}>Calendário</Text>
            <View style={styles.calendarContainer}>
              <Calendar
                theme={{ arrowColor: colors.primary, todayTextColor: colors.primary, selectedDayBackgroundColor: colors.primary, dotColor: colors.primary }}
                markedDates={markedDates}
                onDayPress={onDayPress}
              />
            </View>

            <Text style={styles.sectionTitle}>Próximas Atividades (7 dias)</Text>
            {upcomingActivities.length > 0 ? (
              <FlatList
                data={upcomingActivities}
                renderItem={renderUpcomingActivityItem}
                keyExtractor={item => item.id}
                scrollEnabled={false} // Mantém false para não ter scroll dentro de scroll
                contentContainerStyle={{ paddingHorizontal: spacing.large }}
              />
            ) : (
              <Text style={styles.emptyUpcomingText}>Nenhuma atividade agendada para os próximos 7 dias.</Text>
            )}
          </ScrollView>
       )}
    </SafeAreaView>
  );
};

export default DashboardScreen;