from selenium import webdriver

from selenium_stealth import stealth

from selenium.webdriver.common.by import By

import codecs

import os

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


# Open a webpage

# driver.get("https://www2.hm.com/en_us/men/new-arrivals/view-all.html")

# n = os.path.join("Page.html")

# file = codecs.open(n, "w", "utf−8")

# file.write(driver.page_source)

path = os.path.join(os.path.dirname(__file__), "Page.html")

driver.get('file://' + path)

fits = [
    "Loose",
    "Muscle",
    "Oversized",
    "Regular",
    "Relaxed",
    "Slim",
]

shirts = [
    "shirt",
    "top",
]

pants = [
    "shorts",
    "pants",
    "jeans",
]

elements = driver.find_elements(By.CLASS_NAME, "f0cf84")

for element in elements:

    text = element.get_attribute('innerHTML')

    # stuff to find links.
    imgPattern = "1536w\" src=\""
    imgStart = text.find(imgPattern) + len(imgPattern)

    hrefPattern = "href=\""
    hrefStart = text.find(hrefPattern) + len(hrefPattern)

    # parsing to find relavant data.
    data = element.text.split("\n")

    # getting the fit
    clothingItemFit = next ((fit for fit in fits if fit in data[3]), "other")
    print(data[3])
    print (clothingItemFit+"\n")
    

    item = {
        "id": 0,
        "name": data[3],
        "price": data[4][2 : data[4].index("$", 1)],
        "image": text[imgStart:text.find("\"", imgStart+1)],
        "link": text[hrefStart: text.find("\"", hrefStart+1)],
        "type": {
            "id": 0,
            "type": "string"
        },
        "style": {
            "id": 0,
            "clothingFit": clothingItemFit
        },
        "colors": [
            {
            "id": 0,
            "clothingColor": "string"
            }
        ]
    }

driver.quit()