import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// --- INÍCIO DA CORREÇÃO ---
// 1. Importar o conjunto correto de ícones
import { MaterialCommunityIcons as MCIcons, Ionicons } from '@expo/vector-icons';
// --- FIM DA CORREÇÃO ---
import { styles } from './DiceRollerScreen.styles';
import { colors } from '../../styles/theme';

// --- INÍCIO DA CORREÇÃO ---
// 2. Atualizar a função para usar os nomes corretos do MaterialCommunityIcons
const getDiceIconName = (number) => {
  // Nomes dos ícones em MaterialCommunityIcons
  const icons = ['help-circle-outline', 'dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6'];
  return icons[number] || 'dice-multiple-outline'; // Retorna um ícone de fallback válido
};
// --- FIM DA CORREÇÃO ---

const DiceRollerScreen = ({ navigation }) => {
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [diceResults, setDiceResults] = useState([1]);
  const [total, setTotal] = useState(1);

  const rollDice = () => {
    const results = [];
    let currentTotal = 0;
    for (let i = 0; i < numberOfDice; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      results.push(roll);
      currentTotal += roll;
    }
    setDiceResults(results);
    setTotal(currentTotal);
  };

  const changeNumberOfDice = (amount) => {
    setNumberOfDice((prev) => {
      const newValue = prev + amount;
      if (newValue >= 1 && newValue <= 6) {
        const initialResults = Array(newValue).fill(1);
        setDiceResults(initialResults);
        setTotal(newValue);
        return newValue;
      }
      return prev;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Usamos Ionicons para a seta de voltar, sem problemas */}
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dados Virtuais</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Quantidade de Dados:</Text>
          <View style={styles.selectorControls}>
            <TouchableOpacity onPress={() => changeNumberOfDice(-1)} style={styles.controlButton}>
              <Ionicons name="remove-circle" size={32} color={numberOfDice <= 1 ? colors.border : colors.primary} />
            </TouchableOpacity>
            <Text style={styles.numberOfDiceText}>{numberOfDice}</Text>
            <TouchableOpacity onPress={() => changeNumberOfDice(1)} style={styles.controlButton}>
              <Ionicons name="add-circle" size={32} color={numberOfDice >= 6 ? colors.border : colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.diceContainer}>
          {diceResults.map((result, index) => (
            // --- INÍCIO DA CORREÇÃO ---
            // 3. Usar o componente MCIcons importado
            <MCIcons
              key={index}
              name={getDiceIconName(result)}
              size={64}
              color={colors.text}
              style={styles.diceIcon}
            />
            // --- FIM DA CORREÇÃO ---
          ))}
        </View>

        <View style={styles.rollButtonContainer}>
          <Button title="Rolar Dados" onPress={rollDice} />
        </View>

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>Resultados: {diceResults.join(' + ')}</Text>
          <Text style={styles.totalText}>Soma: {total}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiceRollerScreen;