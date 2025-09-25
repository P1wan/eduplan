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
import { styles } from './CreateQuestionScreen.styles';

const CreateQuestionScreen = () => {
  const [enunciado, setEnunciado] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '']);
  const [respostaCorreta, setRespostaCorreta] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Função para atualizar uma alternativa específica
  const updateAlternativa = (index, value) => {
    const newAlternativas = [...alternativas];
    newAlternativas[index] = value;
    setAlternativas(newAlternativas);
  };

  // Função para adicionar uma nova alternativa
  const addAlternativa = () => {
    if (alternativas.length < 6) {
      setAlternativas([...alternativas, '']);
    }
  };

  // Função para remover uma alternativa
  const removeAlternativa = (index) => {
    if (alternativas.length > 2) {
      const newAlternativas = alternativas.filter((_, i) => i !== index);
      setAlternativas(newAlternativas);

      // Se a alternativa removida era a correta, limpar a seleção
      if (respostaCorreta === alternativas[index]) {
        setRespostaCorreta('');
      }
    }
  };

  // Função para selecionar resposta correta
  const selectRespostaCorreta = (alternativa) => {
    setRespostaCorreta(alternativa);
  };

  // Função para salvar a questão
  const salvarQuestao = async () => {
    // Validações
    if (!enunciado.trim()) {
      Alert.alert('Erro', 'Por favor, digite o enunciado da questão');
      return;
    }

    const alternativasValidas = alternativas.filter(alt => alt.trim() !== '');
    if (alternativasValidas.length < 2) {
      Alert.alert('Erro', 'A questão deve ter pelo menos 2 alternativas');
      return;
    }

    if (!respostaCorreta) {
      Alert.alert('Erro', 'Por favor, selecione a resposta correta');
      return;
    }

    if (!alternativasValidas.includes(respostaCorreta)) {
      Alert.alert('Erro', 'A resposta correta deve ser uma das alternativas');
      return;
    }

    setLoading(true);

    try {
      const novaQuestao = {
        enunciado: enunciado.trim(),
        alternativas: alternativasValidas,
        respostaCorreta,
        data: new Date(),
        userId: db.app.auth().currentUser?.uid || 'anonymous'
      };

      await db.collection('questions').add(novaQuestao);

      Alert.alert('Sucesso!', 'Questão salva com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (error) {
      console.error('Erro ao salvar questão:', error);
      Alert.alert('Erro', 'Não foi possível salvar a questão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Criar Nova Questão</Text>

          {/* Enunciado */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enunciado da Questão *</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Digite o enunciado da questão..."
              value={enunciado}
              onChangeText={setEnunciado}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Alternativas */}
          <View style={styles.inputGroup}>
            <View style={styles.alternativasHeader}>
              <Text style={styles.label}>Alternativas *</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addAlternativa}
                disabled={alternativas.length >= 6}
              >
                <Text style={styles.addButtonText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>

            {alternativas.map((alternativa, index) => (
              <View key={index} style={styles.alternativaContainer}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    respostaCorreta === alternativa && alternativa.trim() !== '' && styles.radioButtonSelected
                  ]}
                  onPress={() => selectRespostaCorreta(alternativa)}
                  disabled={alternativa.trim() === ''}
                >
                  <Text style={styles.radioButtonText}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.alternativaInput}
                  placeholder={`Alternativa ${String.fromCharCode(65 + index)}`}
                  value={alternativa}
                  onChangeText={(value) => updateAlternativa(index, value)}
                />

                {alternativas.length > 2 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeAlternativa(index)}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <Text style={styles.hint}>
              Toque no círculo para marcar como resposta correta
            </Text>
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={salvarQuestao}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Salvando...' : 'Salvar Questão'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateQuestionScreen;
