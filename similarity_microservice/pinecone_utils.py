import time
from functools import lru_cache
from pinecone import Pinecone, ServerlessSpec, Index
import os

@lru_cache
def get_index() -> Index:
    pc = Pinecone(os.getenv("PINECONE_API_KEY"))

    if not pc.has_index("muselock"):
        pc.create_index(
            name="muselock",
            dimension=1024,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )

    while not pc.describe_index("muselock").status["ready"]:
        time.sleep(0.3)

    print("Index ready")

    return pc.Index("muselock")