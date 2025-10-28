// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css'; 


const API_URL = 'https://x5axks3l52.execute-api.sa-east-1.amazonaws.com/precos';

function App() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }
        
        const result = await response.json();
        
        
        setData(result.data || []); 
      } catch (e) {
        
        console.error("Erro ao buscar dados:", e);
        setError("Não foi possível carregar os dados. Verifique o console ou o status da API.");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 



  if (loading) {
    return <div className="loading">Carregando dados do mercado...</div>;
  }

  if (error) {
    return <div className="error-message">Erro: {error}</div>;
  }
  

  return (
    <div className="container">
      <div className='title'>
        <h1>Análise de Mercado Imobiliário  </h1>
      <p>Dados simulados consumidos do endpoint AWS Lambda/API Gateway.</p> 
      </div>
      <div className="card-grid">
        {data.map((imovel, index) => (
          <div key={imovel.id_imovel || index} className="imovel-card">
            <div className="card-image-placeholder">
              🏠
            </div>
            
            <div className="card-content">
              <h2>{imovel.cidade} - {imovel.estado}</h2>
              <p className="bairro-cep">{imovel.simulacao_financiamento.sistema} | {imovel.simulacao_financiamento.anos} anos</p>
              
              <div className="info-row">
                <span className="info-label">Valor Total:</span>
                <span className="info-value price-highlight">
                  R$ {imovel.valor_total.toLocaleString('pt-BR')}
                </span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Preço por m²:</span>
                <span className="info-value">
                  R$ {imovel.preco_m2.toLocaleString('pt-BR')}
                </span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Tamanho:</span>
                <span className="info-value">{imovel.tamanho_m2} m²</span>
              </div>
              
              <div className="financiamento-info">
                <strong>1ª Parcela (SAC):</strong> R$ {imovel.simulacao_financiamento.primeira_parcela.toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;