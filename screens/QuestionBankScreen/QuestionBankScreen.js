import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, LayoutAnimation, UIManager, Platform, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './QuestionBankScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../styles/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LOCAL_QUESTIONS_KEY = 'my_questions';

const QuestionBankScreen = ({ route, navigation }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [anos, setAnos] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ disciplina: null, ano: null });
  const [filtersVisible, setFiltersVisible] = useState(false);

  const loadLocalQuestions = useCallback(async () => {
    try {
      const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
      const questions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];
      setAllQuestions(questions);
      const uniqueDisciplinas = [...new Set(questions.map(q => q.disciplina).filter(Boolean))];
      const uniqueAnos = [...new Set(questions.map(q => q.ano).filter(Boolean))];
      setDisciplinas(uniqueDisciplinas.sort());
      setAnos(uniqueAnos.sort());
    } catch (e) {
      console.error("Erro ao carregar questões locais", e);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadLocalQuestions().finally(() => setLoading(false));
  }, [route.params?.refresh, loadLocalQuestions]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLocalQuestions();
    setRefreshing(false);
  }, [loadLocalQuestions]);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      const searchMatch = searchTerm === '' || q.enunciado.toLowerCase().includes(searchTerm.toLowerCase());
      const disciplinaMatch = !activeFilters.disciplina || q.disciplina === activeFilters.disciplina;
      const anoMatch = !activeFilters.ano || q.ano === activeFilters.ano;
      return searchMatch && disciplinaMatch && anoMatch;
    });
  }, [searchTerm, allQuestions, activeFilters]);

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({ ...prev, [type]: prev[type] === value ? null : value }));
  };

  const toggleFiltersVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFiltersVisible(!filtersVisible);
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('QuestionDetail', { question: item })}>
      <View style={styles.card}>
        <Text style={styles.questionText} numberOfLines={2}>{item.enunciado}</Text>
        <View style={styles.footer}>
          <Text style={styles.detailsText}>{`${item.disciplina} - ${item.ano}`}</Text>
          {item.isCanonical && <Text style={styles.canonicalText}>{item.origem || 'Oficial'}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Banco de Questões</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar por enunciado..." value={searchTerm} onChangeText={setSearchTerm}/>
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
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddEditQuestion', { question: null, originalQuestion: null })}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QuestionBankScreen;