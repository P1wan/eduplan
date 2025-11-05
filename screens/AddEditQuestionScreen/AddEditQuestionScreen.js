// Local: Mobile/eduplan/screens/AddEditQuestionScreen/AddEditQuestionScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './AddEditQuestionScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_QUESTIONS_KEY = 'my_questions';

const AddEditQuestionScreen = ({ route, navigation }) => {
  const { question, originalQuestion } = route.params;
  const isEditing = !!question;
  const isAdapting = !!originalQuestion;

  const [enunciado, setEnunciado] = useState('');
  const [alternativa1, setAlternativa1] = useState('');
  const [alternativa2, setAlternativa2] = useState('');
  const [alternativa3, setAlternativa3] = useState('');
  const [alternativa4, setAlternativa4] = useState('');
  const [respostaCorreta, setRespostaCorreta] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [ano, setAno] = useState('');
  const [codigoSaeb, setCodigoSaeb] = useState(''); // Estado para o código SAEB
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialData = isEditing ? question : isAdapting ? originalQuestion : null;
    if (initialData) {
      setEnunciado(initialData.enunciado);
      setAlternativa1(initialData.alternativas[0] || '');
      setAlternativa2(initialData.alternativas[1] || '');
      setAlternativa3(initialData.alternativas[2] || '');
      setAlternativa4(initialData.alternativas[3] || '');
      setRespostaCorreta(initialData.respostaCorreta);
      setDisciplina(initialData.disciplina);
      setAno(initialData.ano);
      setCodigoSaeb(initialData.codigoSaeb || ''); // Preenche o código SAEB se estiver editando
    }
  }, [question, originalQuestion, isEditing, isAdapting]);

  const getTitle = () => {
    if (isEditing) return 'Editar Questão';
    if (isAdapting) return 'Criar Adaptação';
    return 'Nova Questão Pessoal';
  };

  const handleSave = async () => {
    if (!enunciado || !disciplina || !ano || !respostaCorreta) {
      Alert.alert("Erro", "Preencha pelo menos o enunciado, disciplina, ano e a resposta correta.");
      return;
    }
    setLoading(true);

    try {
      const localQuestionsJson = await AsyncStorage.getItem(LOCAL_QUESTIONS_KEY);
      const allQuestions = localQuestionsJson ? JSON.parse(localQuestionsJson) : [];

      if (isEditing) {
        const questionIndex = allQuestions.findIndex(q => q.id === question.id);
        if (questionIndex > -1) {
          allQuestions[questionIndex] = {
            ...allQuestions[questionIndex],
            enunciado,
            alternativas: [alternativa1, alternativa2, alternativa3, alternativa4],
            respostaCorreta,
            disciplina,
            ano,
            codigoSaeb: codigoSaeb.trim() // Salva o código SAEB
          };
        }
      } else {
        const newQuestion = {
          id: `local_${new Date().getTime()}`,
          enunciado,
          alternativas: [alternativa1, alternativa2, alternativa3, alternativa4],
          respostaCorreta,
          disciplina,
          ano,
          codigoSaeb: codigoSaeb.trim(), // Salva o código SAEB
          isCanonical: false,
          type: isAdapting ? 'ADAPTATION' : 'CUSTOM',
          originalRef: isAdapting ? { collection: 'canonical_questions', docId: originalQuestion.id } : null
        };
        allQuestions.push(newQuestion);
      }

      await AsyncStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(allQuestions));
      navigation.navigate('QuestionBank', { refresh: new Date().getTime() });
    } catch (error) {
      console.error("Erro ao salvar questão: ", error);
      Alert.alert("Erro", "Não foi possível salvar a questão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{getTitle()}</Text>

          <Text style={styles.label}>Enunciado</Text>
          <TextInput style={styles.input} value={enunciado} onChangeText={setEnunciado} multiline />

          <Text style={styles.label}>Alternativa 1</Text>
          <TextInput style={styles.input} value={alternativa1} onChangeText={setAlternativa1} />

          <Text style={styles.label}>Alternativa 2</Text>
          <TextInput style={styles.input} value={alternativa2} onChangeText={setAlternativa2} />

          <Text style={styles.label}>Alternativa 3</Text>
          <TextInput style={styles.input} value={alternativa3} onChangeText={setAlternativa3} />

          <Text style={styles.label}>Alternativa 4</Text>
          <TextInput style={styles.input} value={alternativa4} onChangeText={setAlternativa4} />

          <Text style={styles.label}>Resposta Correta</Text>
          <TextInput style={styles.input} value={respostaCorreta} onChangeText={setRespostaCorreta} placeholder="Digite o texto exato da alternativa correta"/>

          <Text style={styles.label}>Disciplina</Text>
          <TextInput style={styles.input} value={disciplina} onChangeText={setDisciplina} placeholder="Ex: Matemática"/>

          <Text style={styles.label}>Ano</Text>
          <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ex: 4º Ano"/>

          {/* --- CAMPO CÓDIGO SAEB ADICIONADO --- */}
          <Text style={styles.label}>Código Habilidade SAEB (Opcional)</Text>
          <TextInput
            style={styles.input}
            value={codigoSaeb}
            onChangeText={setCodigoSaeb}
            placeholder="Ex: EF01MA01"
            autoCapitalize="characters"
          />
          {/* --- FIM DO CAMPO CÓDIGO SAEB --- */}

          <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleSave} disabled={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEditQuestionScreen;