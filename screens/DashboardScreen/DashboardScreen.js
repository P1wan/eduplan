import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig';
import { styles } from './DashboardScreen.styles';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout');
    }
  };

  const navigateToQuestions = () => {
    navigation.navigate('QuestionList');
  };

  const navigateToActivities = () => {
    navigation.navigate('ActivityList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EduPlan</Text>
        <Text style={styles.subtitle}>Planejamento Pedagógico Inteligente</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Bem-vindo, {auth.currentUser?.email}!
        </Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={navigateToQuestions}
          >
            <Text style={styles.menuButtonText}>📚 Questões</Text>
            <Text style={styles.menuButtonSubtext}>
              Criar e gerenciar questões de avaliação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={navigateToActivities}
          >
            <Text style={styles.menuButtonText}>📝 Atividades</Text>
            <Text style={styles.menuButtonSubtext}>
              Planejar e organizar atividades pedagógicas
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
