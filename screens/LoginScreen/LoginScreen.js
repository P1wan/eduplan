import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

// Importa o SafeAreaView da biblioteca correta
import { SafeAreaView } from 'react-native-safe-area-context';

// Importa os estilos (que estariam em LoginScreen.styles.js no seu projeto final)
// No Snack, você pode criar um arquivo styles.js e importar de lá.
import { styles } from './LoginScreen.styles';

// Importa o auth do Firebase
import { auth } from '../../firebaseConfig';

// Importa useNavigation para navegação
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Função que lida com o login usando Firebase Auth
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('Usuário logado:', userCredential.user.email);
      // Navegar para o Dashboard após login bem-sucedido
      navigation.replace('Dashboard');
    } catch (error) {
      console.error('Erro de login:', error);
      Alert.alert("Erro de Login", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para cadastro de novos usuários
  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Usuário cadastrado:', userCredential.user.email);
      Alert.alert("Sucesso!", "Conta criada com sucesso!");
      // Após cadastro, fazer login automaticamente
      navigation.replace('Dashboard');
    } catch (error) {
      console.error('Erro de cadastro:', error);
      Alert.alert("Erro de Cadastro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>EduPlan</Text>
        <Text style={styles.slogan}>Planejamento Pedagógico Inteligente</Text>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="E-mail do professor"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry 
      />

      {/* Botão de Login */}
      <TouchableOpacity
        style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem conta?</Text>
        <TouchableOpacity onPress={handleSignup} disabled={loading}>
            <Text style={[styles.signupLink, loading && styles.linkDisabled]}>
              {loading ? 'Criando conta...' : 'Cadastre-se'}
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
