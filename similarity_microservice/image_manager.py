import base64
from io import BytesIO
import voyageai
from PIL import Image
import os
from config import get_settings
from pinecone_utils import get_index

async def get_vector(image_data: str):
    client = voyageai.AsyncClient(api_key=get_settings().voyageai_api_key)

    image = Image.open(BytesIO(base64.b64decode(image_data)))

    vec = await client.multimodal_embed(inputs=[[image]], model="voyage-multimodal-3")

    return vec.embeddings[0]


async def save_vector(id: int, vector: list[float]):
    pinecone_idx = get_index()

    pinecone_idx.upsert(
        vectors=[{"id": id, "values": vector}],
        namespace="images"
    )

    print("saved")


async def get_similar_images(query_vector: list[float], amount: int):
    pincone_idx = get_index()

    results = pincone_idx.query(
        namespace="images",
        vector=query_vector,
        top_k=amount,
        include_values=False,
        include_metadata=False
    )
    return list(map(lambda x: f"{x['id']};{x['score']}", results["matches"]))
