# Tests if the render service is working properly.

from selenium import webdriver
import time

TITLE_GOAL = "What-Flix"
TITLE_LOADING = "Render - Application Loading"

def test_render_service():
  driver = webdriver.Chrome()
  driver.get("https://what-flix.onrender.com/")

  if driver.title == TITLE_GOAL:
    assert True
  elif driver.title == TITLE_LOADING:
    print("\nRender application was asleep due to inactivity. Waiting 60 seconds then trying again.")
    time.sleep(60)
    driver.get("https://what-flix.onrender.com/")
    assert driver.title == TITLE_GOAL, f"Webpage title \"{driver.title}\" does not match TITLE_GOAL of \"{TITLE_GOAL}\"."
  else:
    assert False, f"Webpage title \"{driver.title}\" does not match TITLE_GOAL of \"{TITLE_GOAL}\" or TITLE_LOADING of \"{TITLE_LOADING}\"."