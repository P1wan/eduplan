// Local: Mobile/eduplan/screens/ProfileScreen/ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ProfileScreen.styles';
import { colors } from '../../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../config/firebaseConfig'; // Importar db

const AVATARS = ['👩‍🏫', '👨‍🏫', '🧑‍🏫', '🍎', '📚', '💡', '🎓', '✏️', '⭐', '☀️', '🚀', '🧠'];
const USER_SESSION_KEY = 'user_session';
const USER_PROFILE_KEY = 'user_profile';
const LOCAL_QUESTIONS_KEY = 'my_questions'; // Chave das questões
const LOCAL_ACTIVITIES_KEY = 'my_activities';

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [isBackingUp, setIsBackingUp] = useState(false); // Estado para backup

  // Carrega dados do usuário e avatar salvo
  useEffect(() => {
    const loadData = async () => {
      try {
        const sessionJson = await AsyncStorage.getItem(USER_SESSION_KEY);
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          setUserName(session.name);
          setUserEmail(auth.currentUser?.email || '');
        }

        const profileJson = await AsyncStorage.getItem(USER_PROFILE_KEY);
        if (profileJson) {
          const profile = JSON.parse(profileJson);
          setSelectedAvatar(profile.avatar || AVATARS[0]);
        }
      } catch (e) {
        console.error("Erro ao carregar dados do perfil", e);
      }
    };
    loadData();
  }, []);

  // Salva o avatar escolhido
  const handleSaveProfile = async () => {
    try {
      const profileData = { avatar: selectedAvatar };
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
      Alert.alert("Sucesso", "Perfil atualizado!");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar o perfil.");
      console.error("Erro ao salvar perfil", e);
    }
  };

const handleBackupUserData = async () => {
    if (!auth.currentUser) return;
    setIsBackingUp(true);
    let questionCount = 0;
    let activityCount = 0;

    try {
      const userId = auth.currentUser.uid;

      // PARTE 1: Backup das Questões Pessoais
      const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
      const allLocalQuestions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];
      const personalQuestions = allLocalQuestions.filter(q => !q.isCanonical);
      questionCount = personalQuestions.length;

      if (questionCount > 0) {
        const userQuestionsRef = db.collection('users').doc(userId).collection('questions');
        const questionBackupPromises = personalQuestions.map(question => {
          const { isCanonical, ...questionData } = question;
          return userQuestionsRef.doc(question.id).set(questionData, { merge: true });
        });
        await Promise.all(questionBackupPromises);
        console.log(`${questionCount} questões pessoais enviadas para backup.`);
      }

      // PARTE 2: Backup das Atividades
      const localActivitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
      const localActivities = localActivitiesJson ? JSON.parse(localActivitiesJson) : [];
      activityCount = localActivities.length;

      if (activityCount > 0) {
        const userActivitiesRef = db.collection('users').doc(userId).collection('activities');
        const activityBackupPromises = localActivities.map(activity => {
          // Podemos enviar o objeto de atividade inteiro
          return userActivitiesRef.doc(activity.id).set(activity, { merge: true });
        });
        await Promise.all(activityBackupPromises);
        console.log(`${activityCount} atividades enviadas para backup.`);
      }

      // Feedback Final
      if (questionCount === 0 && activityCount === 0) {
        Alert.alert("Backup", "Nenhum dado pessoal (questões ou atividades) para fazer backup.");
      } else {
        Alert.alert("Sucesso", `Backup concluído!\n- ${questionCount} questões pessoais salvas.\n- ${activityCount} atividades salvas.`);
      }

    } catch (error) {
      console.error("Erro durante o backup de dados:", error);
      Alert.alert("Erro", "Não foi possível fazer o backup dos seus dados. Verifique sua conexão.");
    } finally {
      setIsBackingUp(false);
    }
  };
  // Renderiza cada opção de avatar na lista
  const renderAvatarOption = ({ item }) => (
    <TouchableOpacity
      style={[styles.avatarOption, selectedAvatar === item && styles.avatarSelected]}
      onPress={() => setSelectedAvatar(item)}
    >
      <Text style={styles.avatarText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Seção de Informações do Usuário */}
      <View style={styles.userInfoSection}>
        <Text style={styles.currentAvatar}>{selectedAvatar}</Text>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
        {/* Botão de Backup */}
        <View style={styles.backupButtonContainer}>
          {isBackingUp ? (
            <ActivityIndicator color={colors.primary} size="small"/>
          ) : (
            <Button title="Fazer Backup Dos Dados" onPress={handleBackupUserData} />
          )}
        </View>
      </View>

      {/* Seção de Seleção de Avatar */}
      <Text style={styles.sectionTitle}>Escolha seu Avatar:</Text>
      <FlatList
        data={AVATARS}
        renderItem={renderAvatarOption}
        keyExtractor={(item) => item}
        numColumns={4}
        columnWrapperStyle={styles.avatarGrid}
        contentContainerStyle={styles.listContainer}
      />

      {/* Botão Salvar */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;