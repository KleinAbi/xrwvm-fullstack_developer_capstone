# djangoapp/populate.py

from django.utils.timezone import now
from djangoapp.models import CarMake, CarModel


def initiate():
    """
    Populate the database with 5 CarMakes and 15 CarModels (3 under each make).
    If called multiple times, it clears old data first to avoid duplicates.
    """

    # Clear existing data
    CarModel.objects.all().delete()
    CarMake.objects.all().delete()

    # Dictionary of makes and their models
    makes_and_models = {
        "Toyota": ["Corolla", "RAV4", "Camry"],
        "Ford": ["F-150", "Mustang", "Escape"],
        "BMW": ["X5", "3 Series", "i8"],
        "Honda": ["Civic", "Accord", "CR-V"],
        "Chevrolet": ["Silverado", "Equinox", "Malibu"],
    }

    # Create CarMakes and CarModels
    for make_name, models in makes_and_models.items():
        make = CarMake.objects.create(
            name=make_name,
            description=f"{make_name} cars"
        )
        for model_name in models:
            CarModel.objects.create(
                car_make=make,
                dealer_id=1,           # placeholder dealer_id
                name=model_name,
                type="SUV",            # default type
                year=now().year        # current year
            )

    print("✅ Database populated with 5 CarMakes and 15 CarModels")
