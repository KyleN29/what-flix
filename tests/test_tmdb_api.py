import requests
import os

def test_tmdb_api():
  api_key = os.getenv('TMDB_API_KEY')
  print(str(api_key)[:3])
  url = f"https://api.themoviedb.org/3/movie/26963?api_key={api_key}"
  data = requests.get(url).json()
  print(data)

  assert True