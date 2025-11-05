import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './FlashcardsScreen.styles';
import { colors } from '../../styles/theme';

const FlashcardsScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [isStudying, setIsStudying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const addCard = () => {
    if (!frontText.trim() || !backText.trim()) {
      Alert.alert("Atenção", "Preencha a frente e o verso do cartão.");
      return;
    }
    setCards([...cards, { front: frontText, back: backText }]);
    setFrontText(''); // Limpa os campos
    setBackText('');
  };

  const startStudy = () => {
    if (cards.length === 0) {
      Alert.alert("Atenção", "Adicione pelo menos um cartão antes de iniciar.");
      return;
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsStudying(true);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false); // Mostra a frente do próximo
    } else {
      Alert.alert("Fim!", "Você revisou todos os cartões.");
      setIsStudying(false); // Volta para o modo de edição
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false); // Mostra a frente do anterior
    }
  };

  if (isStudying) {
    // --- MODO DE ESTUDO ---
    const currentCard = cards[currentIndex];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
           <TouchableOpacity onPress={() => setIsStudying(false)}>
             <Ionicons name="close-circle-outline" size={28} color={colors.danger} />
           </TouchableOpacity>
          <Text style={styles.headerTitle}>Estudando ({currentIndex + 1}/{cards.length})</Text>
          <View style={{width: 28}}/>
        </View>
        <View style={styles.studyContainer}>
          <TouchableOpacity style={styles.cardDisplay} onPress={flipCard}>
            <Text style={styles.cardText}>
              {isFlipped ? currentCard.back : currentCard.front}
            </Text>
            <Text style={styles.flipIndicator}>{isFlipped ? '(Verso)' : '(Frente)'}</Text>
          </TouchableOpacity>
          <View style={styles.navigationButtons}>
            <Button title="Anterior" onPress={prevCard} disabled={currentIndex === 0} />
            <Button title="Próximo" onPress={nextCard} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // --- MODO DE CRIAÇÃO ---
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar Flashcards</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.creationForm}>
        <Text style={styles.label}>Frente do Cartão:</Text>
        <TextInput style={styles.input} value={frontText} onChangeText={setFrontText} placeholder="Pergunta ou termo"/>
        <Text style={styles.label}>Verso do Cartão:</Text>
        <TextInput style={styles.input} value={backText} onChangeText={setBackText} placeholder="Resposta ou definição"/>
        <Button title="Adicionar Cartão" onPress={addCard} />
      </View>
      <FlatList
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cardListItem}>
            <Text>{`${index + 1}. ${item.front}`}</Text>
          </View>
        )}
        ListHeaderComponent={<Text style={styles.listHeader}>Cartões Adicionados:</Text>}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum cartão adicionado ainda.</Text>}
      />
      <View style={styles.startButtonContainer}>
        <Button title="Iniciar Estudo" onPress={startStudy} disabled={cards.length === 0} />
      </View>
    </SafeAreaView>
  );
};

export default FlashcardsScreen;