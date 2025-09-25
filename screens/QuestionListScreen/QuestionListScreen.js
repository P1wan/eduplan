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
import { styles } from './QuestionListScreen.styles';

const QuestionListScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  // Função para carregar questões do Firestore
  const loadQuestions = async () => {
    try {
      const querySnapshot = await db.collection('questions').get();
      const questionsData = [];
      querySnapshot.forEach((doc) => {
        questionsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setQuestions(questionsData);
    } catch (error) {
      console.error('Erro ao carregar questões:', error);
      Alert.alert('Erro', 'Não foi possível carregar as questões');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Função para deletar uma questão
  const deleteQuestion = async (questionId) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta questão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.collection('questions').doc(questionId).delete();
              setQuestions(questions.filter(q => q.id !== questionId));
              Alert.alert('Sucesso', 'Questão excluída com sucesso!');
            } catch (error) {
              console.error('Erro ao deletar questão:', error);
              Alert.alert('Erro', 'Não foi possível excluir a questão');
            }
          }
        }
      ]
    );
  };

  // Função para refresh da lista
  const onRefresh = () => {
    setRefreshing(true);
    loadQuestions();
  };

  // Carregar questões quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      loadQuestions();
    }, [])
  );

  const renderQuestion = ({ item }) => (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionText} numberOfLines={2}>
          {item.enunciado || 'Questão sem enunciado'}
        </Text>
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
            onPress={() => deleteQuestion(item.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {item.alternativas && item.alternativas.length > 0 && (
        <View style={styles.alternativesContainer}>
          <Text style={styles.alternativesTitle}>Alternativas:</Text>
          {item.alternativas.map((alt, index) => (
            <Text key={index} style={styles.alternativeText}>
              {String.fromCharCode(65 + index)}) {alt}
              {item.respostaCorreta === alt && ' ✅'}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.questionDate}>
        Criada em: {item.data ? new Date(item.data.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível'}
      </Text>
    </View>
  );

  const navigateToCreateQuestion = () => {
    navigation.navigate('CreateQuestion');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Carregando questões...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Questões</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={navigateToCreateQuestion}
        >
          <Text style={styles.addButtonText}>+ Nova Questão</Text>
        </TouchableOpacity>
      </View>

      {questions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma questão encontrada</Text>
          <Text style={styles.emptySubtext}>
            Crie sua primeira questão usando o botão acima
          </Text>
        </View>
      ) : (
        <FlatList
          data={questions}
          renderItem={renderQuestion}
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

export default QuestionListScreen;
