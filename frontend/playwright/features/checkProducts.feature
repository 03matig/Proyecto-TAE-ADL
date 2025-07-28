Feature: Consulta de productos

  Scenario: Acceso exitoso y visualización de listado de artículos
    Given que el usuario ha iniciado sesión con correo "testeradl@test.com" y contraseña "Tester@2025"
    When accede a la vista de lista de artículos
    Then debe visualizar el título "Listado de Artículos"
    And debe visualizar correctamente la información del primer artículo en la tabla
