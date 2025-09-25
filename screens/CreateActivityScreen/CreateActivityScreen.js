import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { styles } from './CreateActivityScreen.styles';

const CreateActivityScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [tipo, setTipo] = useState('');
  const [duracao, setDuracao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [objetivos, setObjetivos] = useState(['']);
  const [materiais, setMateriais] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Tipos de atividade disponíveis
  const tiposAtividade = [
    'Aula expositiva',
    'Atividade prática',
    'Trabalho em grupo',
    'Pesquisa',
    'Avaliação',
    'Projeto',
    'Outro'
  ];

  // Disciplinas comuns
  const disciplinas = [
    'Matemática',
    'Português',
    'História',
    'Geografia',
    'Ciências',
    'Inglês',
    'Educação Física',
    'Artes',
    'Outro'
  ];

  // Função para atualizar um objetivo específico
  const updateObjetivo = (index, value) => {
    const newObjetivos = [...objetivos];
    newObjetivos[index] = value;
    setObjetivos(newObjetivos);
  };

  // Função para adicionar um novo objetivo
  const addObjetivo = () => {
    setObjetivos([...objetivos, '']);
  };

  // Função para remover um objetivo
  const removeObjetivo = (index) => {
    if (objetivos.length > 1) {
      const newObjetivos = objetivos.filter((_, i) => i !== index);
      setObjetivos(newObjetivos);
    }
  };

  // Função para salvar a atividade
  const salvarAtividade = async () => {
    // Validações
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Por favor, digite o título da atividade');
      return;
    }

    if (!disciplina.trim()) {
      Alert.alert('Erro', 'Por favor, selecione a disciplina');
      return;
    }

    const objetivosValidos = objetivos.filter(obj => obj.trim() !== '');
    if (objetivosValidos.length === 0) {
      Alert.alert('Erro', 'A atividade deve ter pelo menos um objetivo');
      return;
    }

    setLoading(true);

    try {
      const novaAtividade = {
        titulo: titulo.trim(),
        disciplina: disciplina.trim(),
        tipo: tipo.trim() || 'Não especificado',
        duracao: duracao.trim() || 'Não informada',
        descricao: descricao.trim(),
        objetivos: objetivosValidos,
        materiais: materiais.trim(),
        data: new Date(),
        userId: db.app.auth().currentUser?.uid || 'anonymous'
      };

      await db.collection('activities').add(novaAtividade);

      Alert.alert('Sucesso!', 'Atividade salva com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
      Alert.alert('Erro', 'Não foi possível salvar a atividade. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderSelectOptions = (options, selectedValue, onSelect) => (
    <View style={styles.optionsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            selectedValue === option && styles.optionButtonSelected
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={[
            styles.optionText,
            selectedValue === option && styles.optionTextSelected
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Criar Nova Atividade</Text>

          {/* Título */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título da Atividade *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o título da atividade..."
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          {/* Disciplina */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Disciplina *</Text>
            {renderSelectOptions(disciplinas, disciplina, setDisciplina)}
          </View>

          {/* Tipo de Atividade */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Atividade</Text>
            {renderSelectOptions(tiposAtividade, tipo, setTipo)}
          </View>

          {/* Duração */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Duração Estimada</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 45 minutos, 1 hora, 2 aulas..."
              value={duracao}
              onChangeText={setDuracao}
            />
          </View>

          {/* Descrição */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição da Atividade</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva como a atividade será desenvolvida..."
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Objetivos */}
          <View style={styles.inputGroup}>
            <View style={styles.objectivesHeader}>
              <Text style={styles.label}>Objetivos de Aprendizagem *</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addObjetivo}
              >
                <Text style={styles.addButtonText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>

            {objetivos.map((objetivo, index) => (
              <View key={index} style={styles.objectiveContainer}>
                <TextInput
                  style={styles.objectiveInput}
                  placeholder={`Objetivo ${index + 1}`}
                  value={objetivo}
                  onChangeText={(value) => updateObjetivo(index, value)}
                />
                {objetivos.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeObjetivo(index)}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {/* Materiais */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Materiais Necessários</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Liste os materiais necessários para a atividade..."
              value={materiais}
              onChangeText={setMateriais}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={salvarAtividade}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Salvando...' : 'Salvar Atividade'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateActivityScreen;
