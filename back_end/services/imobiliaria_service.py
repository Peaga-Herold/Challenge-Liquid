from utils.utils import gerar_preco_m2_ficticio
import random
import math
from faker import Faker


fake = Faker('pt_BR')
def calcular_parcela_financiamento_sac(valor_imovel: float, taxa_anual: float, anos: int) -> dict:
    """
    Simula o cálculo de financiamento (simplificado) na Tabela SAC (Sistema de Amortização Constante).
    É uma 'operação interessante' para o Nível 2.
    """
    meses = anos * 12
    taxa_mensal = (taxa_anual / 100) / 12
    
    amortizacao_mensal = round(valor_imovel / meses, 2)
    
    juros_primeira_parcela = round(valor_imovel * taxa_mensal, 2)
    primeira_parcela = round(amortizacao_mensal + juros_primeira_parcela, 2)
    
    juros_ultima_parcela = round(amortizacao_mensal * taxa_mensal, 2)
    ultima_parcela = round(amortizacao_mensal + juros_ultima_parcela, 2)
    
    return {
        "sistema": "SAC Simplificado",
        "taxa_anual_aplicada": f"{taxa_anual}%",
        "anos": anos,
        "valor_imovel": valor_imovel,
        "primeira_parcela": primeira_parcela,
        "ultima_parcela": ultima_parcela,
    }

def gerar_dados_mercado_ficticios(num_registros: int = 5) -> list:
    """
    Gera uma lista de dados de mercado fictícios, incluindo simulação de financiamento.
    """
    resultados = []
    
    for _ in range(num_registros):
        # Gera dados básicos do imóvel
        preco_m2 = gerar_preco_m2_ficticio()
        tamanho_m2 = random.randint(50, 200)
        valor_total = round(preco_m2 * tamanho_m2, 2)
        
        financiamento = calcular_parcela_financiamento_sac(
            valor_imovel=valor_total,
            taxa_anual=random.uniform(7.0, 10.0),
            anos=random.choice([15, 20, 25, 30]) 
        )
        
        resultados.append({
            "id_imovel": fake.uuid4(),
            "cidade": fake.city(),
            "estado": fake.state_abbr(),
            "preco_m2": preco_m2,
            "tamanho_m2": tamanho_m2,
            "valor_total": valor_total,
            "simulacao_financiamento": financiamento
        })
        
    return resultados