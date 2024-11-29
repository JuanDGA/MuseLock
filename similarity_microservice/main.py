from fastapi import FastAPI
from pydantic import BaseModel
from image_manager import get_vector, get_similar_images, save_vector


app = FastAPI()

class MostSimilar(BaseModel):
    image_data: str

@app.get("/")
def hello():
    return "hello"

@app.post("/most_similar")
async def find_most_similar(most_similar: MostSimilar):
    vector = await get_vector(most_similar.image_data)
    ids = await get_similar_images(vector, 1)
    return ",".join(ids)

class SaveImage(BaseModel):
    image_data: str
    id: str

@app.post("/save")
async def save_image(to_save: SaveImage):
    vector = await get_vector(to_save.image_data)
    await save_vector(to_save.id, vector)
    return "ok"