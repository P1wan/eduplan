# EduPlan - Planejamento Pedagógico Inteligente 📚

Uma aplicação mobile completa para planejamento pedagógico, desenvolvida com React Native e Expo, utilizando Firebase para autenticação e armazenamento de dados.

## 🚀 Estado Atual da Aplicação

### ✅ Funcionalidades Implementadas

#### 🔐 **Sistema de Autenticação**
- **Login e Cadastro**: Autenticação completa com Firebase Auth v8
- **Validação de formulários**: E-mail, senha (mínimo 6 caracteres)
- **Estados de loading**: Feedback visual durante operações
- **Navegação automática**: Redirecionamento para dashboard após login

#### 🏠 **Dashboard Principal**
- **Interface de boas-vindas**: Exibe email do usuário logado
- **Navegação intuitiva**: Botões para acessar Questões e Atividades
- **Logout seguro**: Desconexão com confirmação

#### 📚 **Gerenciamento de Questões**
- **Criar Questões**: Formulário completo com:
  - Enunciado da questão
  - Múltiplas alternativas (até 6 opções)
  - Seleção visual da resposta correta
  - Validações obrigatórias
- **Listar Questões**: Visualização em cards com:
  - Enunciado e alternativas
  - Resposta correta destacada
  - Data de criação
  - Opções de editar/excluir
- **Excluir Questões**: Confirmação antes da exclusão
- **Refresh automático**: Pull-to-refresh para atualizar lista

#### 📝 **Gerenciamento de Atividades**
- **Criar Atividades**: Formulário abrangente com:
  - Título e disciplina
  - Tipo de atividade (predefinido)
  - Duração estimada
  - Descrição detalhada
  - Objetivos de aprendizagem (múltiplos)
  - Materiais necessários
- **Listar Atividades**: Cards informativos mostrando:
  - Título, disciplina e tipo
  - Duração e descrição
  - Objetivos (até 2 primeiros + contador)
  - Data de criação
- **Excluir Atividades**: Sistema de confirmação
- **Seleção intuitiva**: Botões para disciplinas e tipos

#### 💾 **Persistência Offline**
- **Cache automático**: Firestore configurado com `enablePersistence()`
- **Funcionamento offline**: Dados salvos localmente
- **Sincronização**: Dados sincronizados quando online
- **Tratamento de erros**: Gestão de conflitos de múltiplas abas

#### 🧭 **Navegação Completa**
- **React Navigation**: Sistema de navegação profissional
- **Stack Navigator**: Fluxo linear e intuitivo
- **Headers customizados**: Design consistente em todas as telas
- **Transições suaves**: Animações nativas

## 🛠️ Tecnologias Utilizadas

### Core
- **React Native 0.81.4**: Framework mobile cross-platform
- **Expo ~54.0.10**: Plataforma de desenvolvimento
- **React 19.1.0**: Biblioteca JavaScript

### Navegação & UI
- **@react-navigation/native**: Sistema de navegação
- **@react-navigation/stack**: Navegação em pilha
- **react-native-screens**: Otimização de performance
- **react-native-safe-area-context**: Suporte a safe areas

### Firebase (v8)
- **firebase@8.0.0**: SDK do Firebase
- **Authentication**: Sistema de login/cadastro
- **Firestore**: Banco de dados NoSQL
- **Offline Persistence**: Cache local automático

### UI/UX
- **react-native-paper@4.9.2**: Componentes Material Design
- **@expo/vector-icons@^15.0.2**: Biblioteca de ícones
- **Sistema de temas customizado**: Cores e tipografia consistentes

## 📁 Estrutura do Projeto

```
eduplan/
├── App.js                          # Ponto de entrada da aplicação
├── firebaseConfig.js               # Configuração Firebase + persistência offline
├── app.json                        # Configurações do Expo
├── package.json                    # Dependências e scripts
├── index.js                        # Inicialização Expo
│
├── assets/                         # Recursos estáticos
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
│
├── components/                     # Componentes reutilizáveis
│   └── AssetExample.js
│
├── navigation/                     # Sistema de navegação
│   └── AppNavigator.js            # Configuração das rotas
│
├── screens/                        # Telas da aplicação
│   ├── LoginScreen/                # Tela de autenticação
│   │   ├── LoginScreen.js
│   │   └── LoginScreen.styles.js
│   ├── DashboardScreen/            # Dashboard principal
│   │   ├── DashboardScreen.js
│   │   └── DashboardScreen.styles.js
│   ├── QuestionListScreen/         # Lista de questões
│   │   ├── QuestionListScreen.js
│   │   └── QuestionListScreen.styles.js
│   ├── CreateQuestionScreen/       # Criação de questões
│   │   ├── CreateQuestionScreen.js
│   │   └── CreateQuestionScreen.styles.js
│   ├── ActivityListScreen/         # Lista de atividades
│   │   ├── ActivityListScreen.js
│   │   └── ActivityListScreen.styles.js
│   └── CreateActivityScreen/       # Criação de atividades
│       ├── CreateActivityScreen.js
│       └── CreateActivityScreen.styles.js
│
├── styles/                         # Sistema de design
│   └── theme.js                    # Cores, tipografia e espaçamentos
│
├── implementation_guide.md         # Guia de implementação
└── README.md                       # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **Expo CLI** instalado globalmente
- **Expo Go** no dispositivo móvel (ou emulador)

### Instalação e Execução

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm start
   # ou
   expo start
   ```

3. **Executar no dispositivo**:
   - **Android**: Pressione `a` ou escaneie QR code com Expo Go
   - **iOS**: Pressione `i` ou escaneie QR code com câmera
   - **Web**: Pressione `w` para versão web

## 📱 Fluxo da Aplicação

### 1. Autenticação
```
LoginScreen → [Login/Cadastro] → DashboardScreen
```

### 2. Gerenciamento de Questões
```
Dashboard → QuestionListScreen → CreateQuestionScreen
Dashboard ← QuestionListScreen ← CreateQuestionScreen
```

### 3. Gerenciamento de Atividades
```
Dashboard → ActivityListScreen → CreateActivityScreen
Dashboard ← ActivityListScreen ← CreateActivityScreen
```

## 🔧 Configuração do Firebase

### Estrutura do Banco de Dados

#### Coleção `questions`
```javascript
{
  id: "auto-generated",
  enunciado: "Texto da questão",
  alternativas: ["A) Opção 1", "B) Opção 2", "C) Opção 3"],
  respostaCorreta: "A) Opção 1",
  data: Timestamp,
  userId: "user-uid"
}
```

#### Coleção `activities`
```javascript
{
  id: "auto-generated",
  titulo: "Título da atividade",
  disciplina: "Matemática",
  tipo: "Aula expositiva",
  duracao: "45 minutos",
  descricao: "Descrição detalhada",
  objetivos: ["Objetivo 1", "Objetivo 2"],
  materiais: "Lista de materiais",
  data: Timestamp,
  userId: "user-uid"
}
```

### Regras de Segurança (Firestore)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários só podem acessar seus próprios dados
    match /questions/{questionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /activities/{activityId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🎨 Sistema de Design

### Tema (`styles/theme.js`)
```javascript
export const colors = {
  primary: '#6200ee',      // Roxo principal
  secondary: '#03dac6',    // Verde menta
  background: '#f5f5f5',   // Cinza claro
  white: '#ffffff',
  text: '#212121',         // Preto
  textSecondary: '#757575', // Cinza médio
  border: '#e0e0e0',       // Cinza claro
  error: '#b00020',        // Vermelho
  success: '#4caf50'       // Verde
};

export const typography = {
  h1: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  h2: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  body: { fontSize: 16, color: colors.text },
  caption: { fontSize: 12, color: colors.textSecondary }
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32
};
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de autenticação**:
   - Verifique se o projeto Firebase está configurado corretamente
   - Confirme que Authentication está habilitado
   - Verifique as regras de segurança

2. **Dados não aparecem offline**:
   - Aguarde a primeira sincronização online
   - Verifique se `enablePersistence()` está ativo

3. **Navegação não funciona**:
   - Confirme instalação do React Navigation
   - Verifique imports nos arquivos

4. **Erros de build**:
   - Execute `npm install` novamente
   - Limpe cache: `expo r -c`

## 📋 Próximas Implementações

### Funcionalidades Planejadas
- [ ] **Edição de Questões**: Implementar funcionalidade de editar questões existentes
- [ ] **Edição de Atividades**: Sistema completo de edição de atividades
- [ ] **Compartilhamento**: Exportar questões/atividades em PDF
- [ ] **Categorização**: Organizar por séries/turmas
- [ ] **Notificações**: Lembretes para planejamento
- [ ] **Backup**: Sincronização entre dispositivos

### Melhorias Técnicas
- [ ] **Testes Unitários**: Cobertura com Jest
- [ ] **TypeScript**: Migração para tipagem estática
- [ ] **Performance**: Otimizações de renderização
- [ ] **Acessibilidade**: Suporte completo a leitores de tela

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença BSD-0. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Suporte

Para suporte ou dúvidas:
- Crie uma issue no repositório
- Entre em contato via [e-mail]
- Consulte a documentação oficial do Firebase e Expo

---

**Desenvolvido com ❤️ para educadores que buscam excelência no planejamento pedagógico.**
