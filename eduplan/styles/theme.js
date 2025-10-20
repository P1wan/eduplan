// Este arquivo é o nosso "Brand Guide" ou "Design Tokens".
// Ele define as constantes de design (cores, fontes, espaçamentos)
// que serão usadas em todo o aplicativo para garantir consistência.

export const colors = {
  primary: '#4A90E2',
  secondary: '#95A5A6',
  success: '#27AE60',
  danger: '#E74C3C',
  background: '#F8F9FA',
  white: '#FFFFFF',
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  border: '#E0E0E0',
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  // Quando você adicionar fontes customizadas, o nome da fonte viria aqui
  // fontFamily: 'SuaFonte_Regular', 
};