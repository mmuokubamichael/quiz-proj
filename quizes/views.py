from result.models import Result
from django.shortcuts import render
from .models import Quiz
from questions.models import Questions,Answer

from django.views.generic import ListView
from django.http import JsonResponse
from django.shortcuts import HttpResponse

# Create your views here.

class QuizListView(ListView):
    model = Quiz
    template_name = 'quizes/main.html'

'''
def quiz_view(request,pk):
    quiz = Quiz.objects.get(pk=pk)
    return render(request,"quizes/quizs.html",{"obj":quiz})
'''
def test_view(request,pk):
    quiz = Quiz.objects.get(pk=pk)
    return render(request,"quizes/quizs.html",{"obj":quiz})

def quiz_view_test(request,pk,*args,**kwargs):
    print(kwargs)
    upper = kwargs.get('num_post')
    lower= upper - 3
    quiz = Quiz.objects.get(pk=pk)
    anwsers=list(quiz.questions_set.all().values()[lower:upper])
    return JsonResponse({"data": anwsers},safe=False)

def quiz_data_view(request,pk):
    quiz = Quiz.objects.get(pk=pk)
    question = []
    for q in quiz.get_questions():
        answer = []
        for a in q.get_answers():
            answer.append(a.text)
        question.append({str(q.text):answer})
    return JsonResponse({
        "data":question,
        "time": quiz.time
    })

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttprequest'

def save_quiz_view(request,pk):
    data=request.POST
    data_ = dict(data.lists())
    questions=[]
    data_.pop('csrfmiddlewaretoken')
    for k in data_.keys():
        question= Questions.objects.get(text=k)
        questions.append(question)
    user = request.user
    quiz = Quiz.objects.get(pk=pk)

    score = 0
    multiplier =100/quiz.number_of_questions
    results=[]
    correct_answer=None
    for q in questions:
        a_selected=request.POST.get(q.text)
        if a_selected != "":
            question_anwsers= Answer.objects.filter(question=q)
            for a in question_anwsers:
                if a_selected == a.text:
                    if a.correct:
                        score +=1
                        correct_answer =a.text
                else:
                    if a.correct:
                        correct_answer =a.text
            results.append({str(q):{'correct_answer':correct_answer,'anwsered':a_selected}})
        else:
            question_anwsers= Answer.objects.filter(question=q)
            for a in question_anwsers:
                if a.correct:
                    correct_answer =a.text
                    results.append({str(q):{'correct_answer':correct_answer,'anwsered':'not answered'}})

    score_ = multiplier * score
    Result.objects.create(quiz=quiz,user=user,score=score_)
    if score_ >= quiz.required_score_to_pass:
        return JsonResponse({'passed':True,'score':score_,'result': results})
    else:
        return JsonResponse({'passed':False,'score':score_,'result': results})