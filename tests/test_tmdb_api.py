import requests
import os

def test_tmdb_api():
  url = f"https://api.themoviedb.org/3/movie/26963?api_key={os.getenv('TMDB_API_KEY')}"
  data = requests.get(url).json()
  print(data)

  assert True