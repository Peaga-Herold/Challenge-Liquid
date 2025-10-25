from utils.utils import preco_medio_m2

def obter_preco_medio(cidade: str):
    return {
        "cidade": cidade,
        "preco_medio_m2": preco_medio_m2,
        "moeda": "BRL"
    }