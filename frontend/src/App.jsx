// src/App.jsx
import React, { useState, useEffect, } from 'react';
import './App.css'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Button, Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const API_URL = 'https://x5axks3l52.execute-api.sa-east-1.amazonaws.com/precos';

function App() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  
    const handleReload = () => {
    // Comando JavaScript nativo para forçar o recarregamento completo da página
    window.location.reload();
  };
  
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
  }, []); // O array vazio garante que a função só rode uma vez (ao montar o componente)

  // --- Lógica de Renderização (Requisitos Nível 1/2) ---

  if (loading) {
    return <div className="loading">Carregando dados do mercado...</div>;
  }

  if (error) {
    return <div className="error-message">Erro: {error}</div>;
  }
  
  // Se houver dados, exibe a tabela
  return (
    <div className="container">
      <Card variant="outlined" sx={{ maxWidth: 2000 , margin: 1}} >
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h2" component="div">
            Análise de Mercado Imobiliário
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Dados simulados consumidos do endpoint AWS Lambda/API Gateway.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleReload} 
        sx={{ 
          minWidth: 200,
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: '#1976d2', // Cor Secundária vibrante
          '&:hover': {
            backgroundColor: '#458cd3ff',
          },
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        Gerar simulações
      </Button>
      </Box>
    </Card>

      {/* Grid de Cards - Responsivo */}
      <Grid container spacing={3}>
      {data.map((imovel, index) => (
        <Grid item xs={12} sm={6} md={4} key={imovel.id_imovel || index}>
          <Card sx={{ minWidth: 300, width: 360, maxWidth: 600, borderRadius: 3, boxShadow: 3, marginLeft: 1 }}>
            
            {/* Imagem (pode ser placeholder ou URL real) */}
            <CardMedia
              component="img"
              height="180"
              
              image= 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/5d/08/fe/praia-de-ponta-verde.jpg?w=1000&h=-1&s=1'
              alt={`Imagem do imóvel em ${imovel.cidade}`}
            />

            <CardContent>
              {/* Cidade e Estado */}
              <Typography gutterBottom variant="h6" component="div">
                {imovel.cidade} - {imovel.estado}
              </Typography>

              {/* Sistema de financiamento e prazo */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {imovel.simulacao_financiamento.sistema} |{" "}
                {imovel.simulacao_financiamento.anos} anos
              </Typography>

              {/* Valor total */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Valor Total:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  R$ {imovel.valor_total.toLocaleString("pt-BR")}
                </Typography>
              </Box>

              {/* Preço por m² */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Preço por m²:
                </Typography>
                <Typography variant="body2">
                  R$ {imovel.preco_m2.toLocaleString("pt-BR")}
                </Typography>
              </Box>

              {/* Tamanho */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Tamanho:
                </Typography>
                <Typography variant="body2">{imovel.tamanho_m2} m²</Typography>
              </Box>

              {/* Financiamento */}
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>1ª Parcela (SAC):</strong>{" "}
                R$ {imovel.simulacao_financiamento.primeira_parcela.toLocaleString("pt-BR")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default App;