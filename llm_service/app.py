from random import randint
import time

import requests
import markdown

def make_request_to_the_llm(prompt):

    response: ChatResponse = requests.post("http://localhost:11435/api/generate", json = {
            "model": "deepseek-r1:latest",
            "prompt": prompt
        })
    return response["message"]["content"]

themes = ["Backend", "Frontend", "DevOps", "UI/UX", "Learning"]

current_theme = themes[randint(0, len(themes)-1)]
post_theme_request = f"""SSID={randint(10000000, 99999999)}
Задача: Придумай одну случайную тему для статьи-поста на тему: {current_theme}.  

Дополнительные параметры:  
1. Добавь одно случайное слово из списка: [например, "автоматизация", "интеграция", "микросервисы", "безопасность", "надежность"]  
2. Измени структуру темы: например, "Оптимизация развертываний через GitOps" → "Оптимизация развертываний через GitOps + [случайное слово]".  
3. Выводи только полностью сформулированную тему, без комментариев, форматирования и одной цельной фразой.

Тема должна быть уникальной и не повторяться при одинаковых SSID.
После формулирования темы, переформулируй ее, чтобы она выглядела цельной и реалистичной, без плюсика
И выведи только итоговую переформулированную тему, переведенную на английский язык
"""

post_theme_response = make_request_to_the_llm(post_theme_request)

post_request = f"Ты эксперт в {current_theme}. Напиши подробный пост про {post_theme_response} на английском языке"

post_response = make_request_to_the_llm(post_request)

print(post_theme_response)
print("------------------------------------------------------")
print(markdown.markdown(post_response))
post = {
    "postname": post_theme_response,
    "posttext": post_response,
    "postcategory": current_theme
}

while True:
    sendpost_request = requests.post("http://localhost:3000/sendpost", json = post)
    time.sleep(3600)