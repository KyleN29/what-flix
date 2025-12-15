# Tests if the render service is working properly.

import requests
from bs4 import BeautifulSoup as bs

TITLE_GOAL = "What-Flix"
RENDER_URL = "https://what-flix.onrender.com/"

def test_render_service():
  soup = bs(requests.get(RENDER_URL).text, 'html.parser')
  
  assert f"<title>{TITLE_GOAL}</title>" == str(soup.find_all('title')[0])