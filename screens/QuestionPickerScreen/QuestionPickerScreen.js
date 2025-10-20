import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './QuestionPickerScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../styles/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LOCAL_QUESTIONS_KEY = 'my_questions';

const QuestionPickerScreen = ({ route, navigation }) => {
  const { initialSelectedIds } = route.params;

  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState(initialSelectedIds || []);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [anos, setAnos] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ disciplina: null, ano: null });
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const loadLocalQuestions = async () => {
      setLoading(true);
      try {
        const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
        const questions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];
        setAllQuestions(questions);
        const uniqueDisciplinas = [...new Set(questions.map(q => q.disciplina).filter(Boolean))];
        const uniqueAnos = [...new Set(questions.map(q => q.ano).filter(Boolean))];
        setDisciplinas(uniqueDisciplinas.sort());
        setAnos(uniqueAnos.sort());
      } catch (e) { console.error("Erro ao carregar questões locais", e); } 
      finally { setLoading(false); }
    };
    loadLocalQuestions();
  }, []);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      const searchMatch = searchTerm === '' || q.enunciado.toLowerCase().includes(searchTerm.toLowerCase());
      const disciplinaMatch = !activeFilters.disciplina || q.disciplina === activeFilters.disciplina;
      const anoMatch = !activeFilters.ano || q.ano === activeFilters.ano;
      return searchMatch && disciplinaMatch && anoMatch;
    });
  }, [searchTerm, allQuestions, activeFilters]);

  const toggleQuestionSelection = (id) => {
    setSelectedQuestionIds(prev => prev.includes(id) ? prev.filter(qid => qid !== id) : [...prev, id]);
  };
  
  const handleConfirmSelection = () => {
    navigation.navigate('CreateActivity', { updatedSelectedIds: selectedQuestionIds });
  };

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({ ...prev, [type]: prev[type] === value ? null : value }));
  };

  const toggleFiltersVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFiltersVisible(!filtersVisible);
  };
  
  const renderItem = ({ item }) => {
    const isSelected = selectedQuestionIds.includes(item.id);
    return (
      <TouchableOpacity onPress={() => toggleQuestionSelection(item.id)}>
        <View style={[styles.card, isSelected && styles.cardSelected]}>
          <Text style={styles.questionText} numberOfLines={2}>{item.enunciado}</Text>
          <View style={styles.footer}>
            <Text style={styles.detailsText}>{`${item.disciplina} - ${item.ano}`}</Text>
            <Ionicons name={isSelected ? "checkbox" : "square-outline"} size={24} color={isSelected ? colors.primary : "#ccc"} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={28} color={colors.primary} /></TouchableOpacity>
        <Text style={styles.title}>Selecionar Questões</Text>
        <View style={{width: 28}} />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar..." value={searchTerm} onChangeText={setSearchTerm}/>
        <TouchableOpacity onPress={toggleFiltersVisibility} style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {filtersVisible && (
        <View style={styles.filtersPanel}>
          <Text style={styles.filterTitle}>Disciplinas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollView}>
            {disciplinas.map(d => (
              <TouchableOpacity key={d} onPress={() => toggleFilter('disciplina', d)} style={[styles.chip, activeFilters.disciplina === d && styles.chipActive]}>
                <Text style={[styles.chipText, activeFilters.disciplina === d && styles.chipTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.filterTitle}>Anos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollView}>
            {anos.map(a => (
              <TouchableOpacity key={a} onPress={() => toggleFilter('ano', a)} style={[styles.chip, activeFilters.ano === a && styles.chipActive]}>
                <Text style={[styles.chipText, activeFilters.ano === a && styles.chipTextActive]}>{a}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={filteredQuestions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma questão encontrada.</Text>}
        />
      )}
      
      <View style={styles.confirmButtonContainer}>
        <Button title={`Confirmar (${selectedQuestionIds.length} selecionadas)`} onPress={handleConfirmSelection} />
      </View>
    </SafeAreaView>
  );
};

export default QuestionPickerScreen;