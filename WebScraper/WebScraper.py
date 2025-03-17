#
#   WebScraper.py
#   Purpose: for scraping clothing items and then making a POST request to worker API
#   Author: Sebastian Tran
#   

from selenium import webdriver

from selenium_stealth import stealth

from selenium.webdriver.common.by import By

import codecs

import os

import json

import requests

# create ChromeOptions object

options = webdriver.ChromeOptions()

options.add_argument('--headless')


# Set up WebDriver

driver = webdriver.Chrome(options=options)

stealth(driver,

        languages=["en-US", "en"],

        vendor="Google Inc.",

        platform="Win32",

        webgl_vendor="Intel Inc.",

        renderer="Intel Iris OpenGL Engine",

        fix_hairline=True)

fits = [
    "loose",
    "oversized",
    "regular",
    "relaxed",
    "slim",
]

shirts = [
    "shirt",
    "top"
]

pants = [
    "shorts",
    "pants",
    "jeans",
    "joggers",
    "chinos"
]

jackets = [
    "hoodie",
    "sweatshirt",
    "jacket",
    "shacket",
    "coat"
]

# Open a webpage
for i in range (1):

    driver.get("https://www2.hm.com/en_us/men/new-arrivals/view-all.html?page=" + str(i+1) + "#")

    # n = os.path.join("Page.html")

    # file = codecs.open(n, "w", "utf−8")

    # file.write(driver.page_source)

    # path = os.path.join(os.path.dirname(__file__), "Page.html")

    # driver.get('file://' + path)
  
    elements = driver.find_elements(By.CLASS_NAME, "f0cf84")

    for element in elements:

        # For getting the images inside the noscript tag
        script = driver.execute_script("""
                    let noscript = arguments[0].querySelector('noscript');
                    if (noscript) {
                        let tempDiv = document.createElement('div');
                        tempDiv.innerHTML = noscript.innerHTML;
                        let img = tempDiv.querySelector('img');
                        return img ? img.src : null;
                    }
                    return null;
                """, element)

        # for finding links
        link = element.find_element(By.TAG_NAME, "a").get_attribute("href")
        image =  element.find_element(By.TAG_NAME, "a").find_element(By.TAG_NAME, "img").get_attribute("src") if script == None else script

        # for finding text
        name = element.find_element(By.TAG_NAME, "h2").text.lower()
        price = element.find_element(By.TAG_NAME, "p").text
        price = price[2:] if price.find("$", 1) == -1 else price[2:price.find("$", 1)]

        # for getting color
        colorElement = element.find_elements(By.TAG_NAME, "ul")     # an oddity that the first UL is empty!
        color = colorElement[1].find_element(By.TAG_NAME, "li").text.lower() if len(colorElement) >= 2 else "other"
        color = color[:color.find("/")] if "/" in color else color  # handling cases when there is extra information.
        
        # getting the fit
        clothingItemFit = next ((fit for fit in fits if fit in name), "other")

        # getting the type of clothing item
        clothingItemType = "other"
        if any (jacket in name for jacket in jackets):
            clothingItemType = "jacket" 
        elif any (pant in name for pant in pants):
            clothingItemType = "pants"
        elif any (shirt in name for shirt in shirts):
            clothingItemType = "shirt"

        # creating the JSON
        item = {
            "id": 0,
            "name": name,
            "price": price,
            "image": image,
            "link": link,
            "type": {
                "id": 0,
                "clothingItemType": clothingItemType
            },
            "style": {
                "id": 0,
                "clothingFit": clothingItemFit
            },
            "color": {
                "id": 0,
                "clothingColor": color
            }
        }

        print (name + "\n" + price + "\n" + clothingItemType + "\n" + clothingItemFit + "\n" + color + "\n")

        x = requests.post("http://localhost:8080/ClothingItem", json = item )

driver.quit()