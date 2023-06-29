from django.urls import path
from .views import ( QuizListView,quiz_data_view,save_quiz_view,quiz_view_test,test_view)

app_name = "quizes"

urlpatterns = [
    path('', QuizListView.as_view(), name="main-view"),
    path('<pk>/', test_view, name="quiz-view"),
    path('<pk>/test/<int:num_post>/', quiz_view_test, name="quiz-view-test"),
    path('<pk>/data/', quiz_data_view, name="quiz-data-view"),
    path('<pk>/save/', save_quiz_view, name="quiz-save-view"),
]