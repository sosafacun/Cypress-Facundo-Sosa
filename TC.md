# API

## TC-01 | Obtener catálogo de libros (API)
Objetivo: Verificar la disponibilidad del catálogo. Constituye la línea base para el funcionamiento del e-commerce al devolver la matriz de productos.
Precondiciones

1. Base de datos con al menos un libro registrado.
2. Endpoint `/api/Book` operativo.
Pasos de ejecución
3. Enviar petición GET al endpoint `/api/Book`.
4. Leer el código de estado HTTP de la respuesta.
5. Analizar el cuerpo de la respuesta.
Resultado esperado
El código de estado es 200 OK. El cuerpo de la respuesta es un arreglo de objetos no vacío.
Resultado obtenido
El endpoint retornó código 200 y una matriz con los libros del catálogo.
Estado: PASA

## TC-02 | Obtener libro individual por ID válido (API)
Objetivo: Validar que el sistema recupera la información específica de un producto existente para permitir la navegación de detalle.
Precondiciones

1. Base de datos con al menos un libro registrado.
2. Conocer el ID válido de un libro.
Pasos de ejecución
3. Enviar petición GET al endpoint `/api/Book/{id}` reemplazando `{id}` por el valor numérico válido.
4. Leer el código de estado HTTP.
5. Verificar el esquema de datos devuelto.
Resultado esperado
El código de estado HTTP es 200. El cuerpo de la respuesta contiene título, autor y precio del libro solicitado.
Resultado obtenido
La petición devolvió el código 200 y el esquema del objeto coincidió con los datos del libro.
Estado: PASA

## TC-03 | Obtener libro con ID inexistente (API)
Objetivo: Comprobar el manejo de errores ante la solicitud de recursos que no figuran en el sistema para evitar exposiciones del servidor.
Precondiciones

1. Endpoint `/api/Book/{id}` operativo.
Pasos de ejecución
2. Enviar petición GET al endpoint `/api/Book/99999`.
3. Leer el código de estado HTTP de la respuesta.
Resultado esperado
El código de estado HTTP es 404 Not Found.
Resultado obtenido
El sistema rechazó la solicitud con código 404 y no devolvió datos residuales.
Estado: PASA

## TC-04 | Autenticación con credenciales válidas (API)
Objetivo: Verificar que la validación de seguridad emite un token JWT para autorizar operaciones protegidas subsiguientes.
Precondiciones

1. Usuario registrado en la base de datos.
Pasos de ejecución
2. Estructurar carga útil (payload) con usuario y contraseña correctos.
3. Enviar petición POST al endpoint `/api/Login`.
4. Analizar la respuesta.
Resultado esperado
El código de estado HTTP es 200. Se incluye un token JWT válido en el cuerpo de la respuesta.
Resultado obtenido
La API generó código 200 y emitió el token de autorización.
Estado: PASA

## TC-05 | Autenticación con credenciales inválidas (API)
Objetivo: Validar la restricción del perímetro de seguridad impidiendo el acceso con contraseñas erróneas.
Precondiciones

1. Usuario registrado en la base de datos.
Pasos de ejecución
2. Estructurar carga útil con usuario válido y contraseña incorrecta.
3. Enviar petición POST al endpoint `/api/Login`.
Resultado esperado
El código de estado HTTP es 401 Unauthorized. No se emite token JWT.
Resultado obtenido
La API denegó el acceso con código 401 y protegió los recursos del sistema.
Estado: PASA

## TC-06 | Registro de nuevo usuario (API)
Objetivo: Comprobar el funcionamiento del canal de incorporación (onboarding) mediante la inserción de una nueva entidad de usuario en la base de datos.
Precondiciones

1. Datos de usuario únicos no registrados previamente.
Pasos de ejecución
2. Estructurar carga útil con datos obligatorios (nombre, apellido, usuario, contraseña, género).
3. Enviar petición POST al endpoint `/api/User`.
Resultado esperado
El código de estado HTTP es 200 OK.
Resultado obtenido
La API insertó el registro y devolvió código 200 exitosamente.
Estado: PASA

## TC-07 | Agregar producto al carrito (API)
Objetivo: Validar la lógica transaccional de asociar un producto específico a la sesión de un usuario autenticado.
Precondiciones

1. Usuario con sesión iniciada y token JWT capturado.
2. ID de usuario válido e ID de libro válido.
Pasos de ejecución
3. Incluir el token JWT en la cabecera (Header) de autorización.
4. Enviar petición POST a `/api/ShoppingCart/AddToCart/{userId}/{bookId}`.
Resultado esperado
El código de estado HTTP es 200 OK.
Resultado obtenido
La API vinculó el ítem a la cuenta del usuario retornando estado 200.
Estado: PASA

## TC-08 | Recuperar estado del carrito (API)
Objetivo: Confirmar la persistencia y correcta recuperación del estado (ítems y totales) de la canasta de compras en la base de datos.
Precondiciones

1. Usuario con token válido.
2. Al menos un producto agregado previamente al carrito.
Pasos de ejecución
3. Incluir token JWT.
4. Enviar petición GET a `/api/ShoppingCart/{userId}`.
Resultado esperado
El código de estado HTTP es 200 OK. La respuesta incluye el arreglo de libros agregados y el monto total calculado.
Resultado obtenido
La API devolvió los artículos correctos y calculó el subtotal con precisión.
Estado: PASA

## TC-09 | Actualizar cantidad de producto en el carrito (API)
Objetivo: Evaluar la mutación de estado del carrito al incrementar las unidades de un artículo existente.
Precondiciones

1. Producto presente en el carrito del usuario.
2. Token JWT válido.
Pasos de ejecución
3. Estructurar carga útil con la nueva cantidad deseada.
4. Enviar petición PUT a `/api/ShoppingCart/{userId}/{bookId}`.
Resultado esperado
El código de estado HTTP es 200 OK.
Resultado obtenido
La cantidad del producto se modificó y el cálculo de la API fue correcto retornando estado 200.
Estado: PASA

## TC-10 | Eliminar producto del carrito (API)
Objetivo: Comprobar la destrucción del estado relacional entre un ítem y el carrito, asegurando que se borra de la sesión del usuario.
Precondiciones

1. Producto presente en el carrito.
2. Token JWT válido.
Pasos de ejecución
3. Enviar petición DELETE a `/api/ShoppingCart/{userId}/{bookId}`.
4. Enviar petición GET para recuperar el estado del carrito.
Resultado esperado
La petición DELETE devuelve 200 OK. La petición GET posterior no incluye el libro eliminado en su respuesta.
Resultado obtenido
El registro fue suprimido. El endpoint DELETE retornó 200 y el libro desapareció del GET subsiguiente.
Estado: PASA

# Frontend

## TC-11 | Renderizado inicial del catálogo (UI / Frontend)
Objetivo: Validar que el árbol DOM principal se instancia correctamente y el motor de renderizado muestra los componentes visuales de productos.
Precondiciones

1. Conexión a Internet activa.
2. Navegador compatible.
3. Aplicación disponible.
Pasos de ejecución
4. Ingresar a la URL raíz de la aplicación.
5. Esperar la carga del DOM.
6. Inspeccionar la presencia de elementos de tarjeta de libro (book cards).
Resultado esperado
Se visualiza en la interfaz al menos una tarjeta correspondiente a un libro del catálogo.
Resultado obtenido
El DOM se renderizó sin errores y las tarjetas de productos resultaron visibles.
Estado: PASA

## TC-12 | Búsqueda de libros por título (UI / Frontend)
Objetivo: Confirmar que el filtro de cliente acota los elementos visuales de acuerdo con la cadena de texto ingresada.
Precondiciones

1. Estar en la página de inicio.
2. Catálogo cargado en pantalla.
Pasos de ejecución
3. Localizar la barra de búsqueda en la parte superior.
4. Escribir el título exacto de un libro conocido.
5. Examinar las tarjetas resultantes.
Resultado esperado
La grilla de resultados muestra exclusivamente tarjetas cuyos títulos coinciden con el texto ingresado.
Resultado obtenido
La interfaz filtró el DOM eliminando elementos irrelevantes y mostrando el libro buscado.
Estado: PASA

## TC-13 | Filtrar libros por categoría (UI / Frontend)
Objetivo: Verificar que al seleccionar la categoría Fantasy desde el panel lateral, el catálogo se actualiza mostrando únicamente los libros correspondientes a dicha categoría.
Precondiciones

1. Tener una cuenta registrada.
2. Disponer de credenciales válidas.
3. Conexión a Internet activa.
4. Navegador compatible.
Pasos de ejecución
5. Ingresar a la pantalla de login.
6. Completar usuario y contraseña.
7. Presionar Login.
8. Verificar redirección correcta.
9. Verificar que existan libros visibles.
10. Seleccionar la categoría Fantasy.
11. Validar que continúan mostrándose libros.
12. Confirmar que Fantasy permanece seleccionada.
Resultado esperado
El catálogo muestra únicamente libros pertenecientes a la categoría Fantasy.
Resultado obtenido
La aplicación filtró correctamente el catálogo y mostró resultados válidos para la categoría seleccionada.
Estado: PASA

## TC-14 | Reflejo del estado de autenticación en la interfaz (UI / Frontend)
Objetivo: Asegurar que el cambio en el estado global (autenticación) transmuta el árbol DOM de invitado a usuario autorizado de forma reactiva.
Precondiciones

1. Navegador compatible.
2. Usuario con credenciales válidas.
Pasos de ejecución
3. Hacer clic en el botón de Login en la barra de navegación.
4. Completar el formulario con datos válidos.
5. Enviar el formulario.
Resultado esperado
El botón de Login desaparece. Aparece el botón de perfil del usuario y la opción de Logout. El ruteo redirige a la página principal.
Resultado obtenido
La interfaz reaccionó al evento de autenticación modificando la barra de navegación superior correctamente.
Estado: PASA

## TC-15 | Actualización del contador del carrito (UI / Frontend)
Objetivo: Comprobar el manejo del estado local demostrando que la interacción con el componente de producto altera asíncronamente el componente del carrito.
Precondiciones

1. Sesión de usuario iniciada.
2. Catálogo visible en pantalla.
Pasos de ejecución
3. Identificar el botón Add to Cart en una tarjeta de producto.
4. Leer el valor numérico actual en el icono del carrito.
5. Presionar el botón Add to Cart.
Resultado esperado
El distintivo numérico (badge) sobre el icono del carrito se incrementa en 1 unidad sin requerir recarga de la página.
Resultado obtenido
El estado local se actualizó y el contador del carrito sumó la unidad visualmente en el DOM.
Estado: PASA

## TC-16 | Cálculo de precio total en el carrito (UI / Frontend)
Objetivo: Validar la precisión matemática de la interfaz gráfica respecto a la multiplicación del precio unitario por la cantidad en la pantalla del carrito.
Precondiciones

1. Usuario con sesión iniciada.
2. Al menos un ítem ingresado al carrito.
Pasos de ejecución
3. Navegar a la página del carrito.
4. Identificar el precio unitario del ítem.
5. Identificar la cantidad del ítem.
6. Verificar el precio total mostrado.
Resultado esperado
El valor renderizado como Total es exactamente igual a la multiplicación del precio unitario por la cantidad visible en el DOM.
Resultado obtenido
El cálculo renderizado en el frontend fue preciso respecto a la fórmula matemática de precio base y cantidad.
Estado: PASA

## TC-17 | Modificación de cantidad de ítems en la interfaz del carrito (UI / Frontend)
Objetivo: Comprobar que los botones de incremento y decremento de cantidad desencadenan eventos que alteran los subtotales en tiempo real.
Precondiciones

1. Usuario con sesión activa.
2. Estar dentro de la vista del carrito con un ítem presente.
Pasos de ejecución
3. Localizar el botón `+` que incrementa la cantidad del ítem.
4. Presionar el botón `+`.
5. Observar el subtotal de ese artículo y el total global del carrito.
Resultado esperado
El número en la celda de cantidad suma 1. Los precios subtotal y total global del carrito se recalculan dinámicamente y se muestran de forma inmediata.
Resultado obtenido
La reactividad funcionó; el DOM actualizó la cantidad y recalculó los valores de manera correcta al presionar el botón.
Estado: PASA

## TC-18 | Happy path de cliente autenticado (UI / Frontend)
Objetivo: Garantizar el happy path del usuario hacia la compra.
Precondiciones

1. Usuario autenticado.
2. Carrito con productos y total superior a 0.
Pasos de ejecución
3. En la pantalla del carrito, presionar CheckOut.
4. Completar los campos obligatorios del formulario de envío.
5. Presionar el botón para confirmar el pedido.
Resultado esperado
Redirección a la ruta de confirmación. Se muestra el número de orden. El carrito se vacía automáticamente.
Resultado obtenido
El flujo de ruteo avanzó sin bloqueos. El formulario se envió correctamente y el usuario alcanzó la pantalla de confirmación.
Estado: PASA

## TC-19 | Visualización del estado de carrito vacío (UI / Frontend)
Objetivo: Verificar el manejo de la experiencia de usuario (UX) en los casos límite donde la colección de datos a renderizar carece de elementos.
Precondiciones

1. Sesión activa sin ítems agregados al carrito de compras.
Pasos de ejecución
2. Hacer clic en el icono del carrito en el panel de navegación.
3. Observar el contenido central de la vista.
4. Verificar el estado del botón de checkout.
Resultado esperado
Se renderiza un texto indicando que el carrito está vacío. El botón CheckOut no existe o se encuentra inhabilitado.
Resultado obtenido
El DOM reflejó correctamente el estado de ausencia de ítems y bloqueó el avance en el embudo de conversión.
Estado: PASA

## TC-20 | Cambio de tema visual oscuro/claro (UI / Frontend)
Objetivo: Asegurar que el evento de alternancia inyecta y remueve las clases CSS globales responsables del esquema de colores de la interfaz.
Precondiciones

1. Interfaz renderizada en el navegador.
Pasos de ejecución
2. Localizar el interruptor (toggle) de cambio de tema en la barra superior.
3. Presionar el control.
4. Inspeccionar los atributos del elemento `<body>` o contenedor raíz.
Resultado esperado
Se adjunta una clase CSS del tipo tema oscuro al elemento raíz. El color de fondo y el esquema de texto cambian visiblemente.
Resultado obtenido
El evento inyectó correctamente la clase en el DOM provocando la re-pintura de la pantalla con la paleta de colores alternativa.
Estado: PASA