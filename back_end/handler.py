import json
from services.imobiliaria_service import obter_preco_medio

def main(event, context):
    cidade = event.get("queryStringParameters", {}).get("cidade", "São Paulo")
    data = obter_preco_medio(cidade)
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(data)
    }