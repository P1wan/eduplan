import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './QuestionOriginListScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

const LOCAL_QUESTIONS_KEY = 'my_questions';

const QuestionOriginListScreen = ({ navigation }) => {
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadOrigins = async () => {
        setLoading(true);
        try {
          const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
          const questions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];

          // Extrai origens únicas das questões canônicas
          const canonicalOrigins = [...new Set(questions.filter(q => q.isCanonical && q.origem).map(q => q.origem))];
          
          // Verifica se existem questões pessoais
          const hasPersonalQuestions = questions.some(q => !q.isCanonical);
          
          let availableOrigins = canonicalOrigins.sort();
          if (hasPersonalQuestions) {
            // Adiciona a categoria "Minhas Questões" no início
            availableOrigins.unshift("Minhas Questões Pessoais");
          }

          setOrigins(availableOrigins);
        } catch (e) {
          console.error("Erro ao carregar origens das questões", e);
        } finally {
          setLoading(false);
        }
      };
      loadOrigins();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('QuestionBank', { origin: item })} // Navega para a lista, passando a origem
    >
      <Text style={styles.originText}>{item}</Text>
      <Ionicons name="chevron-forward" size={24} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Banco de Questões</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }}/>
      ) : (
        <FlatList
          data={origins}
          renderItem={renderItem}
          keyExtractor={item => item}
          ListHeaderComponent={<Text style={styles.listHeader}>Selecione a Origem:</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma questão encontrada. Sincronize na Dashboard.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default QuestionOriginListScreen;