// Local: eduplan/screens/LoginScreen/LoginScreen.styles.js

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.large,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xlarge,
  },
  title: {
    ...typography.h1,
    fontSize: 32,
  },
  slogan: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    marginBottom: spacing.medium,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: spacing.small,
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.large,
  },
  signupText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  signupLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: spacing.small,
  },
    logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: spacing.medium,
  },
    forgotPasswordText: {
    ...typography.body,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: spacing.medium,
  },
  passwordContainer: {
  flexDirection: 'row', // Alinha o campo e o ícone na horizontal
  alignItems: 'center', // Centraliza eles verticalmente
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.small,
  marginBottom: spacing.medium,
},
passwordInput: {
  flex: 1, // Faz o campo de texto ocupar todo o espaço disponível
  padding: spacing.medium,
  fontSize: 16,
},
eyeIcon: {
  padding: spacing.medium, // Cria uma área de clique confortável para o ícone
}
});