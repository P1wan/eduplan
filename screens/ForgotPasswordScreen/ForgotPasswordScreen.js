import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ForgotPasswordScreen.styles';
import { auth } from '../../config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = () => {
    if (!email.trim()) {
      Alert.alert("Atenção", "Por favor, insira seu e-mail.");
      return;
    }
    setLoading(true);
    auth.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Verifique seu E-mail", "Um link para redefinir sua senha foi enviado para o seu e-mail.");
        navigation.goBack(); // Volta para a tela de login
      })
      .catch(error => {
        // Trata erros comuns, como e-mail não encontrado
        Alert.alert("Erro", "Não foi possível enviar o e-mail. Verifique se o e-mail está correto e tente novamente.");
        console.error("Erro ao enviar email de redefinição: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Adicionamos um cabeçalho com botão de voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#4A90E2" />
        </TouchableOpacity>

        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.instructions}>
          Digite o e-mail associado à sua conta e enviaremos um link para você redefinir sua senha.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.buttonPrimary} onPress={handlePasswordReset} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Enviando..." : "Enviar E-mail"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;