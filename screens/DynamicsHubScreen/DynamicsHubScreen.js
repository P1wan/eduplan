import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DynamicsHubScreen.styles';
import { colors } from '../../styles/theme';

const DynamicsHubScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dinâmicas e Jogos</Text>
      </View>
      <ScrollView>
        <View style={styles.gridContainer}>
          {/* Card para a Roleta */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Roulette')} // Navega para a tela da Roleta
          >
            <Ionicons name="aperture-outline" size={48} color={colors.primary} />
            <Text style={styles.cardTitle}>Roleta</Text>
            <Text style={styles.cardDescription}>Sorteio aleatório de itens</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Timer')} // Navega para a nova tela
          >
            <Ionicons name="timer-outline" size={48} color={colors.primary} />
            <Text style={styles.cardTitle}>Timer</Text>
            <Text style={styles.cardDescription}>Contagem regressiva / progressiva</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DiceRoller')} // Navega para a nova tela
          >
            <Ionicons name="dice-outline" size={48} color={colors.primary} />
            <Text style={styles.cardTitle}>Dados</Text>
            <Text style={styles.cardDescription}>Rolar dados virtuais</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Flashcards')} // Navega para a nova tela
          >
            <Ionicons name="copy-outline" size={48} color={colors.primary} />
            <Text style={styles.cardTitle}>Flashcards</Text>
            <Text style={styles.cardDescription}>Cartões de estudo</Text>
          </TouchableOpacity>
          {/* Adicione outros cards aqui no futuro */}
          {/* Exemplo:
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Sortition')}>
            <Ionicons name="shuffle-outline" size={48} color={colors.primary} />
            <Text style={styles.cardTitle}>Sorteio</Text>
            <Text style={styles.cardDescription}>Nomes ou números</Text>
          </TouchableOpacity>
          */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DynamicsHubScreen;