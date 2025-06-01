from django.apps import AppConfig

class BackendApiConfig(AppConfig):
    name = 'backend_api'

    def ready(self):
        import backend_api.signals