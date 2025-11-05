// Local: Mobile/eduplan/screens/QuestionDetailScreen/QuestionDetailScreen.js

import React from 'react';
import { View, Text, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './QuestionDetailScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_QUESTIONS_KEY = 'my_questions';

const QuestionDetailScreen = ({ route, navigation }) => {
  const { question } = route.params;

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja apagar esta questão?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: async () => {
          try {
            const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
            const allQuestions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];
            const updatedQuestions = allQuestions.filter(q => q.id !== question.id);
            await AsyncStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(updatedQuestions));
            navigation.goBack();
          } catch (e) {
             Alert.alert("Erro", "Não foi possível apagar a questão.");
          }
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Questão</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Enunciado:</Text>
          <Text style={styles.enunciado}>{question.enunciado}</Text>
          
          <Text style={styles.label}>Alternativas:</Text>
          {question.alternativas.map((alt, index) => (
            <Text key={index} style={styles.alternativa}>
              {alt || '---'}
            </Text>
          ))}

          <Text style={styles.label}>Resposta Correta:</Text>
          <Text style={styles.resposta}>{question.respostaCorreta}</Text>

          {/* --- EXIBIR CÓDIGO SAEB SE EXISTIR --- */}
          {question.codigoSaeb && (
            <>
              <Text style={styles.label}>Código Habilidade (SAEB):</Text>
              <Text style={styles.metadataText}>{question.codigoSaeb}</Text>
            </>
          )}
          {/* --- FIM DA EXIBIÇÃO --- */}

          <View style={styles.divider} />
          
          {question.isCanonical ? (
            <View style={styles.actionButton}>
              <Button 
                title="Criar Adaptação" 
                onPress={() => navigation.navigate('AddEditQuestion', { originalQuestion: question, question: null })}
              />
            </View>
          ) : (
            <View style={styles.actionsContainer}>
              <View style={styles.actionButton}>
                <Button 
                  title="Editar" 
                  onPress={() => navigation.navigate('AddEditQuestion', { question: question, originalQuestion: null })}
                />
              </View>
              <View style={styles.actionButton}>
                <Button 
                  title="Apagar" 
                  color="#E74C3C"
                  onPress={handleDelete}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuestionDetailScreen;