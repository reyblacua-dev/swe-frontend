# 1. Instrucciones para ejecutar el proyecto.
Requisitos:
- Instalar o tener instalado node.js (versión usada: 11.6.2).

Para ejecutar el proyecto se deben seguir los siguientes pasos:

En la terminal ejecutar:
- `npm install` -> Para instalar todos los paquetes necesarios.
- `npm run dev` -> Para ejecutar la aplicación en modo desarrollador.
- Acceder a la url http://localhost:5173/

# 2. Breve descripción de la arquitectura y decisiones técnicas tomadas.

En la carpeta src encontramos la estructura del proyecto. En esta encontramos las siguientes carpetas:

**src/**
- **api/** : Se encuentra la definición de las rutas y las peticiones a la API.
- **assets/** : Se encuentran los archivos estáticos, en este caso se encuentra vacío porque no se han necesitado imágenes adicionales.
- **components/** : Se encuentran los componentes reutilizables como pueden ser las fichas de usuarios, la sección de comentarios, la búsqueda o la ficha de un comentario.
- **context/**: Se encuentran las definiciones de contexto para gestionar el estado global de la aplicación. En este caso solo ha sido necesario para la gestión de los comentarios de los personajes guardando la información en el localstorage.
- **interfaces/**: Definiciones de las interfaces de los distintos objetos que se van a tratar en la aplicación.
- **views/**: Definiciones de las vistas de la aplicación, en este caso el listado de personajes y el detalle de uno.
- **App.tsx** : En este archivo se encuentra el enrutador con las direcciones correspondientes a cada vista.

Se ha dividido forma de representar los personajes y comentarios en componentes para facilitar la integración de esta información en otras vistas. En el caso del card de personaje se usa tanto en la vista de listado como en el listado de residentes del mismo planeta en el detalle de personaje individual.

Para el caso del comentario, se usa tanto en el detalle del personaje como en cada card individual del listado general y de residentes.

Para la búsqueda se ha usado el mismo criterio. En el caso actual solo se usa dentro del listado general pero también se podría añadir al listado de residentes.

Para la definición de las llamadas de la API se ha optado por definirlas en un mismo fichero para simplificar y reutilizar la definición de las llamadas lo máximo posible.

Dentro de cada carpeta de componente y vista se encuentra la definición del tsx como un archivos css con las clases implicadas en cada componente.

# 3. Indica qué mejoras o extensiones implementarías con más tiempo (tanto funcionales como técnicas /arquitecturales).

**Algunas mejoras funcionales serían:**
- Añadir paginación a los listados.
- Añadir listado de capítulos de la serie.
- Añadir vista de un capítulo concreto.
- Cuando se acceda a un capítulo añadir el listado de personajes que aparecen en el capítulo.
- Añadir autenticación a la aplicación.
- Limitar el acceso a ciertas vistas según el rol del usuario si así se requiere.
- Añadir los estilos para permitir activar un modo claro (actualmente la web está solo en modo oscuro).
- Mejorar el web responsive de la página.
- Añadir personajes a favoritos.
- Añadir página de redirección de 404 con una página estática "La dirección a la que está intentando acceder no existe".
- Añadir animaciones de carga (Actualmente solo aparece un texto "Cargando..." cuando se realiza una búsqueda por los tres parámetros establecidos: nombre, especie, planeta).

**En cuanto a mejoras técnicas y arquitecturales:**
- Tratar mensajes de error, ahora mismo solo se muestra con console.log en la consola del navegador. Sería conveniente que si se produce un error en la petición el usuario esté informado.
- Crear hooks para realizar el tratamiento de los datos obtenidos a través de la api y simplificar el código.
- Mejorar el rendimiento de las peticiones a la API añadiendo páginación.
