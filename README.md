# Smart Travel Insurance

Um sistema completo de gestão de seguros de viagem desenvolvido com **Clean Architecture** e princípios **SOLID**, utilizando Next.js 14 e TypeScript.

## 🚀 Tecnologias Utilizadas

### Frontend & Backend

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário

### Banco de Dados & ORM

- **Prisma** - ORM moderno para TypeScript/JavaScript
- **SQLite** - Banco de dados local para desenvolvimento

### Autenticação & Segurança

- **JWT (jsonwebtoken)** - Tokens de autenticação
- **bcrypt** - Hash de senhas
- **Zod** - Validação de schemas

### Desenvolvimento

- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **tsx** - Executor TypeScript para scripts

## 🏗️ Arquitetura

O projeto implementa **Clean Architecture** rigorosamente, seguindo todos os princípios **SOLID**:

### 📁 Estrutura Modular por Features

```
src/features/
├── domain/
│   ├── entities/          # Entidades centralizadas (User, Client, Insurance)
│   └── interfaces/        # Contratos de Services (IUserService, IClientService, etc.)
├── application/
│   ├── services/         # Implementações dos Services
│   └── factories/        # Factories que retornam interfaces
├── infra/
│   └── repositories/     # Implementações concretas (Prisma)
└── interface/            # Componentes de UI
```

### 🎯 Princípios SOLID Implementados

- **S - Single Responsibility**: Cada Service tem sua exclusiva responsabilidade bem definida para que tenha apenas motivo específico para mudar
- **O - Open/Closed**: Services estão abertos para extensão, fechados para modificação.
- **L - Liskov Substitution**: Objetos de uma superclasse devem poder ser substituídos por objetos de suas subclasses sem afetar a funcionalidade do programa.​
- **I - Interface Segregation**: Interfaces pequenas e bem específicas para que não haja classe forçada a implementar comportamentos que não utilize.
- **D - Dependency Inversion**: Dependência da abstração e não da implementação.

### 🔧 Padrões Arquiteturais

- **Factory Pattern**: Para criação de instâncias de Services
- **Repository Pattern**: Para abstração de acesso a dados
- **Interface Segregation**: Contratos bem definidos para cada Service
- **Dependency Injection**: Diretamente ligada ao princípio “D” do SOLID (Dependency Inversion Principle), ajudando a aplicar a inversão de dependência ao código.

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd SmartTravelInsurance
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="seu-jwt-secret-aqui"
```

### 4. Execute as migrações do Prisma

```bash
# Gerar o cliente Prisma
npm run prisma:generate

# Executar as migrações
npm run prisma:migrate

# (Opcional) Popular o banco com dados iniciais
npm run prisma:seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 📋 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa migrações do banco
- `npm run prisma:seed` - Popula o banco com dados iniciais

## 🗂️ Estrutura do Projeto

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── api/               # API Routes
│   └── dashboard/         # Páginas do dashboard
├── prisma/                # Configuração do Prisma
│   ├── schema.prisma      # Schema do banco
│   └── seed.ts           # Dados iniciais
├── src/                   # Código fonte
│   ├── features/          # Módulos de negócio
│   └── shared/           # Recursos compartilhados
└── lib/                   # Utilitários e configurações
```

## 🔐 Funcionalidades

### 🚀 Core Features

- ✅ **Sistema de autenticação** com JWT e validação robusta
- ✅ **Gestão de usuários** (CRUD) com roles (ADMIN/STAFF)
- ✅ **Gestão de clientes** (CRUD) com validações de negócio
- ✅ **Gestão de seguros** (CRUD) com controle de status e datas
- ✅ **Dashboard administrativo** responsivo e intuitivo

### 🛡️ Qualidade & Segurança

- ✅ **Validação de dados** com Zod schemas
- ✅ **Hash de senhas** com bcrypt
- ✅ **TypeScript estrito** sem uso de `any`
- ✅ **Clean Architecture** com separação de responsabilidades
- ✅ **Princípios SOLID** aplicados rigorosamente
- ✅ **Inversão de dependências** através de interfaces
- ✅ **Transações de banco** para operações críticas

### 🎨 Interface & UX

- ✅ **Interface responsiva** com Tailwind CSS
- ✅ **Componentes reutilizáveis** e modulares
- ✅ **Validação em tempo real** nos formulários
- ✅ **Feedback visual** para ações do usuário

## 📝 Próximos Passos

### 🧪 Testes & Qualidade

- [ ] Implementar testes unitários para Services
- [ ] Adicionar testes de integração para APIs
- [ ] Implementar testes E2E com Playwright
- [ ] Adicionar cobertura de código com Jest

### 🔐 Segurança & Permissões

- [ ] Implementar sistema granular de permissões
- [ ] Adicionar auditoria de ações (logs)
- [ ] Implementar rate limiting
- [ ] Adicionar validação de CSRF

### 📊 Funcionalidades Avançadas

- [ ] Sistema de relatórios e dashboards
- [ ] Notificações em tempo real
- [ ] Exportação de dados (PDF/Excel)
- [ ] Sistema de backup automático

### 📚 Documentação & DevOps

- [ ] Documentação completa da API (Swagger)
- [ ] Guias de contribuição detalhados
- [ ] CI/CD pipeline com GitHub Actions
- [ ] Dockerização do projeto

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 🏆 Diferenciais Técnicos

### ✨ Arquitetura de Produção

- **Clean Architecture** implementada rigorosamente
- **Princípios SOLID** aplicados em toda a base de código
- **Inversão de dependências** através de interfaces
- **Separação clara** entre domínio, aplicação e infraestrutura

### 🔧 Qualidade de Código

- **TypeScript estrito** sem uso de `any`
- **ESLint + Prettier** para padronização
- **Imports organizados** e estruturados
- **Nomenclatura consistente** seguindo convenções

### 🚀 Performance & Escalabilidade

- **Factory Pattern** para criação eficiente de instâncias
- **Repository Pattern** para abstração de dados
- **Validações otimizadas** com Zod
- **Estrutura modular** facilitando manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
