import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './SyncScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; // Mantenha as importações

// Chaves do AsyncStorage (copiadas da Dashboard)
const LOCAL_ACTIVITIES_KEY = 'my_activities';
const LOCAL_QUESTIONS_KEY = 'my_questions';
const LOCAL_VERSION_KEY = 'local_questions_version';

const SyncScreen = ({ navigation }) => {
  const [statusMessage, setStatusMessage] = useState('Preparando seus dados...');

const restoreUserData = async () => {
    if (!auth.currentUser) return; // Sai se não houver usuário logado
    const userId = auth.currentUser.uid;
    setStatusMessage('Sincronizando seus dados pessoais (questões e atividades)...');
    console.log("Iniciando restauração/sincronização de dados do usuário...");

    try {
      // 1. Buscar Questões do Firestore (Backup)
      const questionsQuery = await db.collection('users').doc(userId).collection('questions').get();
      const firestoreQuestions = questionsQuery.docs.map(doc => ({ id: doc.id, ...doc.data(), isCanonical: false })); // Garante que questões do backup não são canônicas

      // --- ADICIONADO: Buscar Atividades do Firestore ---
      const activitiesQuery = await db.collection('users').doc(userId).collection('activities').get();
      const firestoreActivities = activitiesQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // --- FIM DA ADIÇÃO ---

      // 2. Ler Dados Locais (AsyncStorage)
      const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
      const localQuestions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];
      const canonicalLocalQuestions = localQuestions.filter(q => q.isCanonical); // Preserva canônicas
      const personalLocalQuestions = localQuestions.filter(q => !q.isCanonical);

      const localActivitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
      const localActivities = localActivitiesJson ? JSON.parse(localActivitiesJson) : [];

      // 3. Mesclar Questões (Prioriza Firestore, mantém canônicas locais)
      const combinedQuestions = [...canonicalLocalQuestions]; // Começa com as canônicas
      const questionMap = new Map();
      personalLocalQuestions.forEach(q => questionMap.set(q.id, q)); // Locais primeiro
      firestoreQuestions.forEach(q => questionMap.set(q.id, q)); // Firestore sobrescreve/adiciona
      questionMap.forEach(q => combinedQuestions.push(q)); // Adiciona mescladas

      // --- ADICIONADO: Mesclar Atividades (Prioriza Firestore) ---
      const activityMap = new Map();
      localActivities.forEach(a => activityMap.set(a.id, a)); // Locais primeiro
      firestoreActivities.forEach(a => activityMap.set(a.id, a)); // Firestore sobrescreve/adiciona
      const combinedActivities = Array.from(activityMap.values());
      // --- FIM DA ADIÇÃO ---

      // 5. Salvar dados mesclados de volta no AsyncStorage
      await AsyncStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(combinedQuestions));
      await AsyncStorage.setItem(LOCAL_ACTIVITIES_KEY, JSON.stringify(combinedActivities)); // Salva atividades mescladas

      console.log(`Sincronização pessoal concluída: ${questionMap.size} questões pessoais, ${activityMap.size} atividades.`);

    } catch (error) {
      console.error("Erro durante a restauração/sincronização de dados:", error);
      Alert.alert(
        "Erro de Sincronização",
        "Não foi possível sincronizar todos os seus dados com a nuvem. Verifique sua conexão. O aplicativo usará os dados salvos localmente."
      );
      // Não retorna dados locais aqui, pois pode causar inconsistência se a leitura falhou parcialmente.
      // A Dashboard tentará ler o que existe no AsyncStorage.
    }
  };

  const checkAndUpdateQuestions = async () => {
    setStatusMessage('Verificando atualizações do banco de questões...');
    try {
      const versionDocRef = db.collection("app_meta").doc("version_control");
      const versionDoc = await versionDocRef.get();
      const remoteVersion = versionDoc.exists ? versionDoc.data().canonical_questions_version : 1;
      const localVersion = await AsyncStorage.getItem(LOCAL_VERSION_KEY);

      if (!localVersion || remoteVersion > parseInt(localVersion, 10)) {
        setStatusMessage(`Baixando nova versão (${remoteVersion}) das questões...`);
        const querySnapshot = await db.collection("canonical_questions").get();
        const canonicalQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isCanonical: true }));

        const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
        const userCreatedQuestions = (localQuestionsJson ? JSON.parse(localQuestionsJson) : []).filter(q => !q.isCanonical);

        const allQuestions = [...canonicalQuestions, ...userCreatedQuestions];
        await AsyncStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(allQuestions));
        await AsyncStorage.setItem(LOCAL_VERSION_KEY, remoteVersion.toString());
        console.log("Banco de questões oficial atualizado!");
      } else {
        console.log("Banco de questões oficial já está atualizado.");
      }
    } catch (e) {
      console.error("Falha na sincronização passiva das questões oficiais: ", e);
      // Não interrompe o fluxo por isso, apenas loga
    }
  };
  // --- FIM DAS FUNÇÕES MOVIDAS ---

  useEffect(() => {
    const runSync = async () => {
      await restoreUserData(); // Primeiro sincroniza os dados do usuário
      await checkAndUpdateQuestions(); // Depois verifica as questões canônicas

      // Navega para a tela principal, substituindo a tela de sync no histórico
      navigation.replace('MainNavigator');
    };

    runSync();
  }, [navigation]); // Depende apenas da navegação

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#4A90E2" />
      <Text style={styles.statusText}>{statusMessage}</Text>
    </SafeAreaView>
  );
};

export default SyncScreen;