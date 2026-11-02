# tp-09-salas-crud-mongodb
Este proyecto es una copia el TP8, se realizo una copia de todo las archivos expto de la carpeta node, package-lock.jons y .env
# Preparaicon de altas, entorno y DNS
Para este TP se creo una nueva base de datos llamada reservas_salas_u9 que contiene la colleccion reservas  y completar 
MONGODB_URI localmente.
en le archivo .env se define variables de entono como:
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>/<base>?retryWrites=true&w=majority 
# Comandos de inicio y para la instalacion
lugo de la copia se ejecuto los siguientes comandos:
a) npm instalar: para recostruir el proyecto, se instalan todos las dependecias.
b) npm run format :
c) npm check: verificar la sintaxios del index.js
D) npm comprobardb : para comprobar la conexion con la base de datos.

# Endpoints y pruebas: Matriz de pruebas.

| Caso                                                                      |Evidencia esperada                                                   | Resultado |
|---------------------------------------------------------------------------|---------------------------------------------------------------------|-----------|
| POST válido                                                               |`201`, encabezado `Location` y reserva creada con estado `pendiente` | Aprobado  |
| PUT completo                                                              | `200`, mismo ID y reemplazo de los siete campos                     | Aprobado  |
| PUT incompleto                                                            | `400`; el recurso permanece intacto                                 | Aprobado  |
| PATCH de `personas` o `estado`                                            | `200`; los campos omitidos conservan su valor                       | Aprobado  |
| PATCH vacío, con campo extra, `_id` o `$set`                              | `400`; el recurso permanece intacto                                 | Aprobado  |
| `personas` con valor inválido (`0`, `7`, `2.5`, `true`, arreglo u objeto) | `400`; el recurso permanece intacto                                 | Aprobado  |
| `estado` o valor de enumeración inválido                                  | `400`; el recurso permanece intacto                                 | Aprobado  |
| ID mal formado                                                            | `400`                                                               | Aprobado  |
| ID válido pero inexistente en PUT/PATCH                                   | `404`; no se crea ningún recurso                                    | Aprobado  |
| JSON mal formado o cuerpo ausente                                         | `400` con respuesta JSON                                            | Aprobado  |
| DELETE de una reserva existente                                           | `204`, sin cuerpo; el listado contiene una reserva menos            | Aprobado  |
| Repetir DELETE y consultar con GET después de eliminar                    | Ambas solicitudes responden `404`                                   | Aprobado  |
| Reiniciar después de actualizar y eliminar                                | La actualización persiste y la reserva eliminada no reaparece       | Aprobado  |
| Sitio, formulario y `/estado`                                             | Sus contratos existentes se mantienen                               | Aprobado  |
| Fallo inesperado simulado en una prueba aislada                           | `500`, sin exponer secretos                                         | Aprobado  |

# Endpoints y Postman
La API está separada de las páginas web: las rutas están en src/rutas/reservas-api.js, mientras que el formulario usa src/rutas/reservas.js.

Método          URL                                     Uso
GET	        /reservas	                        Ver la lista en HTML
GET	        /reservas/nueva	                        Mostrar el formulario
GET	        /reservas/:id	                        Ver el detalle en HTML
GET	        /api/reservas	                        Obtener reservas en JSON
GET	        /api/reservas?sala=Sala%20Norte	        Filtrar por sala
GET	        /api/reservas/:id	                Obtener una reserva por ID
POST	        /api/reservas	                        Crear una reserva vía API
POST	        /reservas	                        Crear desde el formulario y redirigir a la lista
PUT             /reservas/[ID]                          Modifica los 7 campos de una reserva
PATCH           /reservas/[ID]                          Modicacion parcial solo los campos personas y estado
DELETE          /reservas/[ID]                          Elimina fisicamente una reserva a partir de su id.

Para modificar una reserva en Postman:

Método: PUT
URL: http://localhost:3500/api/reservas/ID
Cabecera: Content-Type: application/json
Body: tipo raw → JSON, por ejemplo:

{
  "estudiante": "Lucía Fernández",
  "email": "lucia.fernandez@example.com",
  "sala": "Sala Norte",
  "fecha": "2026-10-06",
  "turno": "Mañana",
  "personas": 2,
  "estado": "pendiente"
}

Respuesta esperada: estado 201 y el objeto JSON actualizado, incluyendo id.
