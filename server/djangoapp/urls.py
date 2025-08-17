# Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'
urlpatterns = [
    # # path for registration
    path("register", views.registration, name="registration"),
    # path for login
    path("login", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    # path for dealer reviews view
    path(route='get_cars', view=views.get_cars, name ='getcars'),
    # path for add a review view

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
