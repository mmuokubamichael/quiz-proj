from django.contrib import admin
from .models import Answer,Questions

# Register your models here

class AnswerInline(admin.TabularInline):
    model = Answer

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]

admin.site.register(Questions,QuestionAdmin)
admin.site.register(Answer)