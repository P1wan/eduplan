import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './RouletteScreen.styles';

const RouletteScreen = ({ navigation }) => {
  const [items, setItems] = useState('');
  const [result, setResult] = useState('');

  const handleSpin = () => {
    if (!items.trim()) {
      Alert.alert("Atenção", "Por favor, insira pelo menos um item para sortear.");
      return;
    }
    const itemList = items.split('\n').filter(item => item.trim() !== '');
    if (itemList.length === 0) {
      Alert.alert("Atenção", "Nenhum item válido para sortear.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * itemList.length);
    const winner = itemList[randomIndex];
    setResult(winner);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Roleta de Sorteio</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Itens para sortear (um por linha):</Text>
        <TextInput
          style={styles.textArea}
          value={items}
          onChangeText={setItems}
          placeholder="Ex: Joãozinho&#10;Maria&#10;Pedrinho"
          multiline
        />
        <Button title="Girar Roleta" onPress={handleSpin} />
        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>O item sorteado foi:</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RouletteScreen;