import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from speech_ai import settings

SYSTEM_COMMAND = "You are a helpful assistant."

conversation_history = [
    {"role": "system", "content": SYSTEM_COMMAND},
]


@csrf_exempt
def chat(request):
    global conversation_history
    if request.method == "POST":
        request_body = json.loads(request.body)
        conversation_history.append(
            {"role": "user", "content": request_body["message"]}
        )
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        }
        data = {
            "messages": conversation_history,
            "model": "gpt-3.5-turbo",
            "max_tokens": 20,
            "temperature": 0.7,
        }
        response = requests.post(url, headers=headers, data=json.dumps(data))
        response_data = response.json()
        generated_text = response_data["choices"][0]["message"]
        conversation_history.append(generated_text)
        print("converation histour", conversation_history)
        return JsonResponse(generated_text)
