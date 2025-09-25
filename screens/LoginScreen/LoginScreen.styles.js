import { StyleSheet } from 'react-native';
// Importamos nosso "Brand Guide" para usar as variáveis
import { colors, spacing, typography } from '../../styles/theme'; // Usamos '../../' para voltar duas pastas

// Este arquivo funciona como o "styles.css" para a Tela de Login.
// Ele define os estilos específicos para cada elemento desta tela,
// mas usa as variáveis do nosso theme.js para manter a consistência.

export const styles = StyleSheet.create({
  // Container principal que ocupa a tela inteira e centraliza o conteúdo
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.large,
  },

  // Seção do header com o logo e o título
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xlarge,
  },
  
  // Título principal "EduPlan"
  title: {
    ...typography.h1,
    fontSize: 32,
  },

  // Slogan abaixo do título
  slogan: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  
  // Estilo para os campos de texto (Email, Senha)
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    marginBottom: spacing.medium,
  },

  // Botão de ação principal (Entrar)
  buttonPrimary: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: spacing.small,
    alignItems: 'center',
    marginBottom: spacing.medium,
  },

  // Texto dentro dos botões
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },

  // Container para o link de cadastro na parte inferior
  signupContainer: {
    flexDirection: 'row', // Para colocar os textos lado a lado
    justifyContent: 'center',
    marginTop: spacing.large,
  },
  
  // Texto do link de cadastro ("Não tem conta?")
  signupText: {
    ...typography.body,
    color: colors.textSecondary,
  },

  // A parte clicável do link de cadastro ("Cadastre-se")
  signupLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: spacing.small, // Um pequeno espaço entre os textos
  },

  // Estilo para botão desabilitado (loading)
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.6,
  },

  // Estilo para link desabilitado
  linkDisabled: {
    color: colors.textSecondary,
    opacity: 0.6,
  }
});