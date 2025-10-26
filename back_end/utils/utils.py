
import random


def gerar_preco_m2_ficticio(min_val: float = 4000.0, max_val: float = 12000.0) -> float:
    """ Gera um preço médio do metro quadrado (m²) fictício. """
    return round(random.uniform(min_val, max_val), 2)

