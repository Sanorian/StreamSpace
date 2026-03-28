from random import randint
import time
import sys

import requests
from bs4 import BeautifulSoup
from ollama import Client
import markdown

print("Starting llm_service...", flush=True)
sys.stdout.flush()

# news_api_url: https://newsapi.org

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
            Don't write title of post. Write without comments from you. Write only post itself. Don`t use markdown for writing post
            If you cannot write post based on this information or post isn't interesting and just an advertisement, just write "no" without any other information
            """
            ,
        },
    ])
    # post_text = markdown.markdown(response['message']['content'])
    post_text = response['message']['content']

    if post_text == "no<":
        continue
    used_titles.append(current_article["title"])

    sending_response = requests.put("http://backend:3000/sendpost", data={
        "postname": current_article["title"],
        "posttext": post_text,
        "postcategory": theme
    })

    print(f"Processing theme: {theme}", flush=True)
    print(f"Article title: {current_article['title']}", flush=True)
    print(f"Response from model: {response['message']['content'][:100]}", flush=True)
    print(f"Sending to backend: {sending_response.status_code} {sending_response.text}", flush=True)

    time.sleep(3600*4)