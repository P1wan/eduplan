// Local: Mobile/eduplan/screens/QuestionBankScreen/QuestionBankScreen.js

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, LayoutAnimation, UIManager, Platform, RefreshControl, Alert } from 'react-native'; // Adicionado Alert
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
  const { origin } = route.params;

  const [allQuestionsForOrigin, setAllQuestionsForOrigin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [anos, setAnos] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ disciplina: null, ano: null });
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false); // Estado para filtro de favoritos

  // Função para carregar questões da origem específica
  const loadLocalQuestions = useCallback(async () => {
    try {
      const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
      const allQuestions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];

      const questionsForThisOrigin = allQuestions.filter(q => {
        if (origin === "Minhas Questões Pessoais") {
          return !q.isCanonical;
        } else {
          return q.isCanonical && q.origem === origin;
        }
      });
      setAllQuestionsForOrigin(questionsForThisOrigin);

      // Popula filtros baseado APENAS nas questões desta origem
      const uniqueDisciplinas = [...new Set(questionsForThisOrigin.map(q => q.disciplina).filter(Boolean))];
      const uniqueAnos = [...new Set(questionsForThisOrigin.map(q => q.ano).filter(Boolean))];
      setDisciplinas(uniqueDisciplinas.sort());
      setAnos(uniqueAnos.sort());

    } catch (e) {
      console.error("Erro ao carregar questões locais por origem", e);
    }
  }, [origin]); // Depende da origem

  // Hook para carregar dados ao focar/receber refresh ou quando a função de carregar muda
  useEffect(() => {
    setLoading(true);
    loadLocalQuestions().finally(() => setLoading(false));
  }, [route.params?.refresh, loadLocalQuestions]);

  // Função para o Pull-to-Refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLocalQuestions(); // Recarrega os dados do AsyncStorage para esta origem
    setRefreshing(false);
  }, [loadLocalQuestions]);

  // Função para alternar o status de favorito
  const toggleFavorite = async (questionId) => {
    try {
      // Lê a lista COMPLETA de questões do AsyncStorage
      const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
      let allQuestions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];
      const questionIndex = allQuestions.findIndex(q => q.id === questionId);

      if (questionIndex > -1) {
        // Inverte o status de favorito na lista completa
        allQuestions[questionIndex].isFavorite = !allQuestions[questionIndex].isFavorite;

        // Salva a lista COMPLETA atualizada de volta no AsyncStorage
        await AsyncStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(allQuestions));

        // Atualiza o estado local que exibe APENAS as questões desta origem
        // Isso força a re-renderização do item específico
        setAllQuestionsForOrigin(prev => prev.map(q =>
            q.id === questionId ? { ...q, isFavorite: !q.isFavorite } : q
        ));

      }
    } catch (error) {
      console.error("Erro ao favoritar questão:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status de favorito.");
    }
  };

  // Lógica de filtragem atualizada para incluir favoritos
  const filteredQuestions = useMemo(() => {
    return allQuestionsForOrigin.filter(q => {
      // Filtro de Favoritos (se ativo)
      if (showOnlyFavorites && !q.isFavorite) {
        return false;
      }
      // Filtros existentes
      const searchMatch = searchTerm === '' || q.enunciado.toLowerCase().includes(searchTerm.toLowerCase());
      const disciplinaMatch = !activeFilters.disciplina || q.disciplina === activeFilters.disciplina;
      const anoMatch = !activeFilters.ano || q.ano === activeFilters.ano;
      return searchMatch && disciplinaMatch && anoMatch;
    });
  }, [searchTerm, allQuestionsForOrigin, activeFilters, showOnlyFavorites]); // Adicionado showOnlyFavorites

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({ ...prev, [type]: prev[type] === value ? null : value }));
  };

  const toggleFiltersVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFiltersVisible(!filtersVisible);
  };

  // Render Item com ícone de favorito
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('QuestionDetail', { question: item })}>
      <View style={styles.card}>
        {/* Ícone de Favorito Adicionado */}
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
          <Ionicons
            name={item.isFavorite ? "star" : "star-outline"}
            size={24}
            color={item.isFavorite ? colors.warning : colors.border} // Amarelo quando favorito
          />
        </TouchableOpacity>
        <Text style={[styles.questionText, { marginRight: 30 }]} numberOfLines={2}>{item.enunciado}</Text>
        <View style={styles.footer}>
          <Text style={styles.detailsText}>{`${item.disciplina} - ${item.ano}`}</Text>
          {item.isCanonical && <Text style={styles.canonicalText}>{item.origem || 'Oficial'}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botão Voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{origin}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Barra de Busca e Botões de Filtro */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar nesta origem..." value={searchTerm} onChangeText={setSearchTerm}/>
        <TouchableOpacity onPress={toggleFiltersVisibility} style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={colors.primary} />
        </TouchableOpacity>
        {/* Botão para filtrar favoritos */}
        <TouchableOpacity onPress={() => setShowOnlyFavorites(!showOnlyFavorites)} style={styles.filterButton}>
          <Ionicons
            name={showOnlyFavorites ? "star" : "star-outline"}
            size={24}
            color={showOnlyFavorites ? colors.warning : colors.primary} // Amarelo quando ativo
          />
        </TouchableOpacity>
      </View>

      {/* Painel de Filtros Deslizante */}
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

      {/* Lista de Questões */}
      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={filteredQuestions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma questão encontrada com os filtros atuais.</Text>}
          contentContainerStyle={{ paddingBottom: 120 }} // Espaço para FAB
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Botão Flutuante para Nova Questão */}
      {origin === "Minhas Questões Pessoais" && ( // Mostra FAB apenas na lista de questões pessoais
          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddEditQuestion', { question: null, originalQuestion: null })}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default QuestionBankScreen;