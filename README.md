# 📊 Serviço de Análise e Simulação Imobiliária - Liquid Challenge

## Descrição do Projeto

Este projeto Fullstack implementa um serviço de consulta de dados do mercado imobiliário, simulando uma API de alto valor que fornece informações e cálculos financeiros complexos sob demanda.

O objetivo principal foi construir uma solução **Serverless completa** seguindo práticas de arquitetura, qualidade de código e experiência do usuário.

### Arquitetura e Funcionalidades Chave

* **Backend (Python/AWS Lambda):** Implementado como um microsserviço *serverless* na AWS Lambda e API Gateway, gerenciado pelo Serverless Framework (v4).

    * **Operação de Negócio :** O endpoint não apenas retorna dados fictícios (gerados com o pacote `faker`), mas realiza um **cálculo de simulação de financiamento imobiliário (Tabela SAC)** para cada registro, agregando valor à chamada.

    * **Qualidade e Robustez :** Utilização de código limpo com separação de responsabilidades (serviços e utilitários), acompanhado de **testes automatizados (Pytest)**, tratamento de erros e logging estruturado.

* **Frontend (React):** Uma aplicação moderna construída em React para consumir a API.
    * **Experiência do Usuário:** Os dados são apresentados em um layout de **Cards**, garantindo **responsividade total** para telas desktop e mobile.


# 🏠 Estrutura de Retorno do Endpoint `/precos`

O endpoint `/precos` retorna um **array JSON** com informações de mercado e uma **simulação de financiamento** para múltiplos imóveis.  
O formato foi projetado para ser consumido diretamente pelo **frontend em React**, facilitando a integração.

---

## 📄 Exemplo de Estrutura JSON

```json
[
  {
    "id_imovel": "f1a2b3c4-d5e6",
    "cidade": "Porto Alegre",
    "estado": "RS",
    "bairro": "Moinhos de Vento",
    "valor_total": 950000.00,
    "preco_m2": 7916.67,
    "tamanho_m2": 120,
    "simulacao_financiamento": {
      "sistema": "SAC",
      "primeira_parcela": 8031.25,
      "taxa_anual_aplicada": "10.0%",
      "anos": 30
    }
  }
]
```
**URL do Endpoint:**
`GET - https://x5axks3l52.execute-api.sa-east-1.amazonaws.com/precos` 

**Chamada via cURL:**
```bash 
curl -X GET https://x5axks3l52.execute-api.sa-east-1.amazonaws.com/precos
```


# 🧱 Estrutura dos Dados

Os campos do retorno são divididos em duas categorias principais:

### 1. Dados de Mercado 

Campos gerados dinamicamente com a biblioteca **faker**, simulando informações básicas do imóvel.


| Campo   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id_imovel` | `string` | ID único do imóvel  |
| `cidade` | `string` | Nome da cidade simulada. |
| `estado` | `string` | Sigla do estado (UF).  |
| `tamanho_m2` | `Number` | Área total do imóvel em metros quadrados. |
| `preco_m2` | `Number` | 	Preço simulado por metro quadrado. |
| `valor_total` | `Number` |Valor total do imóvel (tamanho_m2 * preco_m2)  |



### 2. Análise de Negócio 

Objeto que representa a **simulação** de financiamento 

| Campo   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `simulacao_financiamento` | `Object` | Contém as informações financeiras da simulação.  |
| `simulacao_financiamento.sistema` | `string` | Sistema de amortização utilizado (SAC). |
| `simulacao_financiamento.primeira_parcela` | `Number` | Valor da primeira parcela do financiamento (amortização + juros iniciais).  |
| `simulacao_financiamento.taxa_anual_aplicada` | `String` | Taxa de juros anual aplicada (valor fictício). |
| `simulacao_financiamento.anos` | `Number` | 	Prazo total do financiamento em anos. |


## ⚙️ Configuração e Execução Local (Backend)

1.  **Pré-requisitos:** Python 3.9+, pip, Node.js, Serverless Framework (`npm install -g serverless`).
2.  **Clonar Repositório:**
    ```bash
    git clone https://github.com/Peaga-Herold/Challenge-Liquid.git
    cd Challenge-Liquid/back_end
 
3.  **Instalar Dependências:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Executar Testes :** Para validar a lógica de cálculo (SAC) e geração de dados:
    ```bash
    python -m pytest
    ```

## 🚀 Deploy para AWS

O deploy é gerenciado pelo Serverless Framework.

1.  **Configurar Credenciais AWS:** Certifique-se de que o AWS CLI esteja configurado com as credenciais com permissão para criar recursos em `sa-east-1` (IAM User, etc.).
    ```bash
    aws configure
    ```
2.  **Comando de Deploy:** Execute o deploy na pasta `back_end`. O Framework empacotará o código e as dependências.
    ```bash
    serverless deploy
    ```

## 💻 Configuração e Execução Local (Frontend - React)

O frontend foi desenvolvido em React para um ambiente de desenvolvimento rápido e eficiente. Ele consome diretamente o endpoint público da AWS criado na parte do Backend.

1. **Pré-requisitos para o Frontend**
Para rodar este projeto localmente, você precisa ter o Node.js e o npm instalado no seu sistema.

2.  **Clonar Repositório:**
    ```bash
    git clone https://github.com/Peaga-Herold/Challenge-Liquid.git
    ```


3. **Instruções de Execução**
  Acesse a Pasta do Projeto: Navegue para o diretório frontend/ na raiz do repositório.

```bash
cd frontend 
```
Instale as Dependências: Utilize o npm para baixar todos os pacotes Node.js necessários (React, Vite, etc.).

```bash
npm install
```

Inicie o Servidor Local: Este comando iniciará a aplicação em modo de desenvolvimento.

```bash
npm run dev
```
