from selenium import webdriver
import time

TITLE_GOAL = "What-Flix"

def test_render_service():
  driver = webdriver.Chrome()
  driver.get("https://what-flix.onrender.com/")

  if driver.title == TITLE_GOAL:
    assert True
  else:
    print("\nRender may be asleep due to inactivity. Waiting 60 seconds then trying again.")
    time.sleep(60)
    assert (driver.title == TITLE_GOAL)