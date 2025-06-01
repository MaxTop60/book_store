from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_migrate, post_save, m2m_changed
from django.dispatch import receiver
from .models import Book, BookReview, Basket, User

@receiver(post_migrate)
def create_groups_and_permissions(sender, **kwargs):
    # Ваш код здесь

    # Создаем группы
    admin_group, created = Group.objects.get_or_create(name='Администратор')
    manager_group, created = Group.objects.get_or_create(name='Менеджер')
    user_group, created = Group.objects.get_or_create(name='Пользователь')

    # Получаем контент типы для моделей Book, BookReview и Basket
    book_content_type = ContentType.objects.get_for_model(Book)
    book_review_content_type = ContentType.objects.get_for_model(BookReview)
    basket_content_type = ContentType.objects.get_for_model(Basket)

    # Создаем разрешения для групп
    admin_permissions = Permission.objects.filter(content_type__in=[book_content_type, book_review_content_type, basket_content_type])
    manager_permissions = Permission.objects.filter(content_type=book_content_type)
    user_permissions = Permission.objects.filter(content_type__in=[book_review_content_type, basket_content_type])

    # Назначаем разрешения группам
    admin_group.permissions.set(admin_permissions)
    manager_group.permissions.set(manager_permissions)
    user_group.permissions.set(user_permissions)


@receiver(post_save, sender=User)
def update_user_permissions(sender, instance, created, **kwargs):
    if created:
        # Получаем контент типы для моделей Book, BookReview и Basket
        book_content_type = ContentType.objects.get_for_model(Book)
        book_review_content_type = ContentType.objects.get_for_model(BookReview)
        basket_content_type = ContentType.objects.get_for_model(Basket)

        # Получаем группу "Пользователь"
        user_group, created = Group.objects.get_or_create(name='Пользователь')

        # Добавляем пользователя в группу "Пользователь"
        instance.groups.add(user_group)

        # Создаем разрешения для группы "Пользователь"
        user_permissions = Permission.objects.filter(content_type__in=[book_review_content_type, basket_content_type])

        # Назначаем разрешения пользователю
        instance.user_permissions.set(user_permissions)
