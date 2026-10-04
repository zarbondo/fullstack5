from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg2://study_cards:study_cards@localhost:5432/study_cards"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="")


settings = Settings()
