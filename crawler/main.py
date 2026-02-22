from extractors.code_it import extract_codeit
from extractors.digital_pathsala import extract_digital_pathsala
from extractors.evolve import extract_evolve
from extractors.lets_learn import extract_letslearn
from extractors.nepal_training import extract_nepal_training

from parsers.normalize import normalize_all

if __name__ == "__main__":
    # Running crawlers
    extract_codeit()
    extract_digital_pathsala()
    extract_evolve()
    extract_letslearn()
    extract_nepal_training()

    # Running normalizer
    normalize_all()
