// Local: Mobile/eduplan/screens/CreateActivityScreen/CreateActivityScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateActivityScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

const LOCAL_QUESTIONS_KEY = 'my_questions';
const LOCAL_ACTIVITIES_KEY = 'my_activities';

const CreateActivityScreen = ({ route, navigation }) => {
  const { activity } = route.params || {};
  const isEditing = !!activity;

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAllQuestions = async () => {
      const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
      setAllQuestions(localQuestionsJson ? JSON.parse(localQuestionsJson) : []);
    };
    loadAllQuestions();

    if (isEditing) {
      setTitle(activity.title);
      setInstructions(activity.instructions || '');
      setSelectedItems(activity.questions || []);
      setActivityDate(activity.date || '');
    }
  }, [activity, isEditing]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.updatedSelectedIds) {
        const { updatedSelectedIds } = route.params;
        const newItems = updatedSelectedIds.map(id => {
          const existingItem = selectedItems.find(item => item.id === id);
          return existingItem || { id: id, comment: '' };
        });
        setSelectedItems(newItems);
        navigation.setParams({ updatedSelectedIds: undefined });
      }
    }, [route.params, navigation, selectedItems])
  );

  const handleDateChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formattedDate = cleaned;
    if (cleaned.length > 2) formattedDate = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    if (cleaned.length > 4) formattedDate = `${formattedDate.substring(0, 5)}/${cleaned.substring(4, 8)}`;
    setActivityDate(formattedDate);
  };

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
    if (month === 2 && day > 29) return false;
    return true;
  };

  const handleSaveActivity = async () => {
    if (!title.trim() || selectedItems.length === 0) {
      Alert.alert("Atenção", "Dê um título e selecione pelo menos uma questão.");
      return;
    }
    if (!validateDate(activityDate)) {
      Alert.alert("Data Inválida", "Formato DD/MM/AAAA ou deixe em branco.");
      return;
    }
    setSaving(true);
    try {
      const localActivitiesJson = await AsyncStorage.getItem(LOCAL_ACTIVITIES_KEY);
      const allActivities = localActivitiesJson ? JSON.parse(localActivitiesJson) : [];
      if (isEditing) {
        const index = allActivities.findIndex(a => a.id === activity.id);
        if (index > -1) allActivities[index] = { ...allActivities[index], title: title.trim(), instructions: instructions.trim(), questions: selectedItems, date: activityDate.trim() };
      } else {
        const newActivity = { id: `activity_${new Date().getTime()}`, title: title.trim(), instructions: instructions.trim(), questions: selectedItems, date: activityDate.trim(), createdAt: new Date().toISOString() };
        allActivities.push(newActivity);
      }
      await AsyncStorage.setItem(LOCAL_ACTIVITIES_KEY, JSON.stringify(allActivities));
      Alert.alert("Sucesso", `Atividade ${isEditing ? 'atualizada' : 'criada'}!`);
      navigation.navigate('ActivityList');
    } catch (error) { Alert.alert("Erro", "Não foi possível salvar."); }
    finally { setSaving(false); }
  };

  const updateComment = (id, text) => {
    setSelectedItems(currentItems =>
      currentItems.map(item => item.id === id ? { ...item, comment: text } : item)
    );
  };

  const moveItem = (index, direction) => {
    const newItems = [...selectedItems];
    const [item] = newItems.splice(index, 1);
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex <= newItems.length) { // Corrigido <= para permitir mover para o final
      newItems.splice(newIndex, 0, item);
      setSelectedItems(newItems);
    }
  };

  // --- FUNÇÃO RENDERSELECTEDITEM REINTRODUZIDA ---
  const renderSelectedItem = ({ item, index }) => {
    const questionData = allQuestions.find(q => q.id === item.id);
    if (!questionData) return null;

    return (
      <View style={styles.selectedCard}>
        <Text style={styles.questionText}>{`${index + 1}. ${questionData.enunciado}`}</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Adicionar comentário/instrução..."
          value={item.comment}
          onChangeText={(text) => updateComment(item.id, text)}
        />
        <View style={styles.reorderButtons}>
          <TouchableOpacity onPress={() => moveItem(index, -1)} disabled={index === 0}>
            <Ionicons name="arrow-up-circle" size={32} color={index === 0 ? '#ccc' : colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => moveItem(index, 1)} disabled={index === selectedItems.length - 1}>
            <Ionicons name="arrow-down-circle" size={32} color={index === selectedItems.length - 1 ? '#ccc' : colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // --- FIM DA REINTRODUÇÃO ---

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={28} color={colors.primary} /></TouchableOpacity>
        <Text style={styles.title}>{isEditing ? 'Editar Atividade' : 'Criar Atividade'}</Text>
        <View style={{ width: 28 }} />
      </View>
      <FlatList
        data={selectedItems}
        renderItem={renderSelectedItem} // Agora a função existe
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Título da Atividade</Text>
              <TextInput style={styles.input} value={title} onChangeText={setTitle} />
              <Text style={styles.label}>Instruções Gerais (Opcional)</Text>
              <TextInput style={[styles.input, { height: 100 }]} value={instructions} onChangeText={setInstructions} multiline />
              <Text style={styles.label}>Data da Atividade (Opcional)</Text>
              <TextInput
                style={styles.input}
                value={activityDate}
                onChangeText={handleDateChange}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={styles.pickerButtonContainer}>
              <Button title="Adicionar / Editar Questões" onPress={() => navigation.navigate('QuestionPicker', { initialSelectedIds: selectedItems.map(i => i.id) })} />
            </View>
            <Text style={styles.listHeader}>Questões Selecionadas</Text>
          </>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>Clique no botão acima para selecionar questões.</Text>}
      />
      <View style={styles.saveButtonContainer}>
        <Button title={saving ? "Salvando..." : "Salvar Atividade"} onPress={handleSaveActivity} disabled={saving} />
      </View>
    </SafeAreaView>
  );
};

export default CreateActivityScreen;