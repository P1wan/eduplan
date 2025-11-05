import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './TimerScreen.styles';
import { colors } from '../../styles/theme';

// Função para formatar segundos em MM:SS
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const TimerScreen = ({ navigation }) => {
  const [mode, setMode] = useState('timer'); // 'timer' ou 'stopwatch'
  const [timeInput, setTimeInput] = useState(''); // Input em segundos para o timer
  const [timeValue, setTimeValue] = useState(0); // Tempo atual em segundos
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // Referência para o intervalo

  // Limpa o intervalo quando o componente é desmontado
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Lógica do contador
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeValue((prevTime) => {
          if (mode === 'timer') {
            if (prevTime <= 1) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              // Opcional: Adicionar um som ou alerta aqui
              return 0;
            }
            return prevTime - 1;
          } else { // stopwatch
            return prevTime + 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current); // Limpeza ao pausar/resetar
  }, [isRunning, mode]);

  const handleStartPause = () => {
    if (mode === 'timer' && !isRunning && timeValue === 0) {
      // Se for timer e estiver zerado, define o tempo inicial a partir do input
      const seconds = parseInt(timeInput, 10);
      if (isNaN(seconds) || seconds <= 0) {
        alert('Por favor, insira um tempo válido em segundos.');
        return;
      }
      setTimeValue(seconds);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (mode === 'timer') {
      const seconds = parseInt(timeInput, 10);
      setTimeValue(isNaN(seconds) || seconds <= 0 ? 0 : seconds);
    } else {
      setTimeValue(0); // Reseta cronômetro para 0
    }
  };

  const switchMode = (newMode) => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setMode(newMode);
    setTimeInput(''); // Limpa input ao trocar
    setTimeValue(0); // Zera o tempo ao trocar
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Timer / Cronômetro</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'timer' && styles.modeButtonActive]}
          onPress={() => switchMode('timer')}
        >
          <Text style={[styles.modeText, mode === 'timer' && styles.modeTextActive]}>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'stopwatch' && styles.modeButtonActive]}
          onPress={() => switchMode('stopwatch')}
        >
          <Text style={[styles.modeText, mode === 'stopwatch' && styles.modeTextActive]}>Cronômetro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {mode === 'timer' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Definir tempo (em segundos):</Text>
            <TextInput
              style={styles.input}
              value={timeInput}
              onChangeText={setTimeInput}
              placeholder="Ex: 60 para 1 minuto"
              keyboardType="numeric"
              editable={!isRunning} // Não deixa editar enquanto roda
            />
          </View>
        )}

        <Text style={styles.timeDisplay}>{formatTime(timeValue)}</Text>

        <View style={styles.controls}>
          <Button
            title={isRunning ? 'Pausar' : 'Iniciar'}
            onPress={handleStartPause}
          />
          <Button
            title="Resetar"
            onPress={handleReset}
            color="#E74C3C" // Vermelho para resetar
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TimerScreen;