from services.imobiliaria_service import gerar_dados_mercado_ficticios
import json
import logging


logger = logging.getLogger()
logger.setLevel(logging.INFO)

def main(event, context):
    """
    Retorna uma lista de dados de mercado e uma simulação de financiamento.
    """
    
    try:
        logger.info("Iniciando a requisição para obter dados do mercado imobiliário.")
        
        NUM_REGISTROS = 10
        
        dados_mercado = gerar_dados_mercado_ficticios(num_registros=NUM_REGISTROS)
        
        logger.info(f"Sucesso. {NUM_REGISTROS} registros de imóveis gerados.")
        
        response_body = {
            "total_registros": len(dados_mercado),
            "data": dados_mercado
        }
        
        response = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" 
            },
            "body": json.dumps(response_body)
        }
        
        return response

    except Exception as e:
        logger.error(f"Erro inesperado durante o processamento: {e}", exc_info=True)
        
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"erro": "Ocorreu um erro interno no servidor.", "detalhe": str(e)})
        }