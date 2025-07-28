Feature: Registrar nuevo producto

  Como usuario registrado,
  Quiero poder acceder al sistema
  Para registrar un nuevo producto con nombre "Iphone 16" y sus datos complementarios

  Scenario: Agregar un nuevo producto con datos válidos
    Given que el usuario ha iniciado sesión con correo "testeradl@test.com" y contraseña "Tester@2025"
    When accede a la página de artículos
    And inicia el registro de un nuevo artículo
    And completa los datos del artículo:
      | sku        | IP-16-6       |
      | nombre     | Iphone 16     |
      | stock      | 50            |
      | costo      | 800           |
      | precio     | 1200          |
      | unidad     | Unidad        |
    And guarda el artículo
    Then el artículo "Iphone 16" debe aparecer en el listado o en la confirmación
