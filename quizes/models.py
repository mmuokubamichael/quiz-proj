from django.db import models
import random

# Create your models here.

DIFF_CHOICES = (
    ('easy','easy'),
    ('meduim','meduim'),
    ('hard','hard'),
)

class Quiz(models.Model):
    name = models.CharField(max_length=120)
    topic = models.CharField(max_length=120)
    number_of_questions = models.IntegerField()
    time = models.IntegerField(help_text="durations in munites")
    required_score_to_pass = models.IntegerField(help_text="required score to pass")
    difficulty = models.CharField(max_length=6,choices=DIFF_CHOICES)

    def __str__(self):
        return f"{self.name} - {self.topic}"

    def get_questions(self):
        question=list(self.questions_set.all())
        random.shuffle(question)
        return question[:self.number_of_questions]

