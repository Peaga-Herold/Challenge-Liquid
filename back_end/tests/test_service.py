from services.imobiliaria_service import *

# Teste 1: Garantir que a geração de dados retorne o número correto de registros
def test_geracao_de_dados_retorna_o_numero_correto():
    """ Testa se a função retorna o número exato de registros solicitados. """
    registros = gerar_dados_mercado_ficticios(num_registros=3)
    assert len(registros) == 3
    
    assert isinstance(registros[0], dict)

# Teste 2: Garantir que o cálculo SAC funcione com valores conhecidos
def test_calculo_financiamento_sac_basico():
    """ Testa se o cálculo de financiamento retorna os valores esperados. """
    
    valor_imovel = 100000.00
    taxa_anual = 12.0
    anos = 1
    
    resultado = calcular_parcela_financiamento_sac(
        valor_imovel=valor_imovel,
        taxa_anual=taxa_anual,
        anos=anos
    )
    
    # Cálculo Manual Esperado:
    # Amortização Mensal (A): 100.000 / 12 = 8.333,33
    # Juros Mês 1 (J1): 100.000 * 0.01 = 1.000,00
    # Parcela Mês 1 (P1): 8.333,33 + 1.000,00 = 9.333,33
    
    
    # Assert 1: Verifica se a primeira parcela é o valor esperado
    assert round(resultado['primeira_parcela'], 2) == 9333.33
    
    # Assert 2: Verifica se a taxa anual foi registrada corretamente
    assert resultado['taxa_anual_aplicada'] == "12.0%"