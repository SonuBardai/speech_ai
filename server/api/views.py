from django.http import HttpResponse, JsonResponse

def home(request):
    return HttpResponse("Hello, World!")

def chat(request):
    test_response = {
        "id":"chatcmpl-abc123",
        "object":"chat.completion",
        "created":1677858242,
        "model":"gpt-3.5-turbo-0301",
        "usage":{
            "prompt_tokens":13,
            "completion_tokens":7,
            "total_tokens":20
        },
        "choices":[
            {
                "message":{
                    "role":"assistant",
                    "content":"\n\nThis is a test!"
                },
                "finish_reason":"stop",
                "index":0
            }
        ]
    }
    return JsonResponse(test_response)