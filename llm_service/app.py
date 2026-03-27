from random import randint
import time

import requests
from bs4 import BeautifulSoup
from ollama import Client
import markdown

# news_api_url: https://newsapi.org

access_token = "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"
news_api_key = "e7ee4184d30a42338c7ea1cb1e2c9a72"


used_titles = []

themes = ["Backend", "Frontend", "DevOps", "UI/UX", "Learning"]

client = Client(host = 'http://ollama:11434')

while True:
    theme= themes[randint(0, len(themes)-1)]
    url = f"https://newsapi.org/v2/everything?q={theme}&apiKey={news_api_key}"

    news = requests.get(url).json()
    articles = news["articles"]
    current_article = {}

    while True:
        current_article = articles[randint(0, len(articles)-1)]
        if current_article["title"] in used_titles:
            continue
        break

    soup = BeautifulSoup(requests.get(current_article["url"]).text, 'html.parser')
        
    response = client.chat(model='deepseek-r1:8b', messages=[
    {
        'role': 'user',
            'content': f"""Write post based on this news page using language, that used in title of the post: {current_article["title"]}. News page:
            {soup.body.text[:6400]}
            Don't write title of post. Write without comments from you. Write only post itself.
            If you cannot write post based on this information or post isn't interesting and just an advertisement, just write "no" without any other information
            """
            ,
        },
    ])
    post_text = markdown.markdown(response['message']['content'])
    if post_text=="<p>no</p>":
        continue
    used_titles.append(current_article["title"])
    sending_response = requests.post("http:backend:3000/sendpost", data={
        "postname": current_article["title"],
        "posttext": post_text,
        "postcategory": theme
    })
    time.sleep(3600*4)