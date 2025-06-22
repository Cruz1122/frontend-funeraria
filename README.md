# Funeraria Web - Frontend

Este repositorio contiene el código fuente del *frontend* para el sistema de gestión de servicios funerarios. Ha sido desarrollado con **Angular 15** y actúa como la interfaz de usuario principal que consume los datos y la lógica de negocio expuesta por los diferentes microservicios del backend.

Este frontend se conecta con los siguientes microservicios para su funcionamiento:
* **Servicio de Lógica de Negocio**: `http://localhost:3000/`
* **Servicio de Seguridad**: `http://localhost:3001/`
* **Servicio de Chat**: `http://localhost:3002/`

## Descripción del Proyecto

El frontend ofrece una interfaz de usuario completa y modular para interactuar con todos los aspectos del sistema de la funeraria. Permite a los usuarios públicos, clientes y administradores acceder a diferentes funcionalidades según sus roles y permisos.

### Módulos Principales

El proyecto está organizado en módulos lazy-loaded para optimizar el rendimiento y la organización del código:

* **`SeguridadModule`**: Gestiona todo lo relacionado con la autenticación y autorización de usuarios.
* **`ParametrosModule`**: Permite a los administradores gestionar las entidades principales del sistema como Planes, Clientes y Beneficiarios.
* **`LogicaDeNegocioModule`**: Contiene las funcionalidades orientadas al cliente, como la solicitud de PQRS, la realización de pagos y la solicitud de servicios funerarios.
* **`ChatModule`**: Implementa la comunicación en tiempo real entre usuarios y asesores.
* **`VentasModule` y `ReportesModule`**: Módulos preparados para futuras implementaciones de funcionalidades de ventas y reportería.

## Características Principales

* **Arquitectura Modular**: El uso de módulos de Angular permite una clara separación de responsabilidades y la carga diferida (`lazy loading`) para mejorar los tiempos de carga iniciales.
* **Seguridad Robusta**:
    * Autenticación de usuarios mediante correo y contraseña cifrada (MD5 en el cliente antes de enviar).
    * Implementación de autenticación de dos factores (2FA) para mayor seguridad.
    * Sistema de recuperación de contraseñas.
    * Protección de rutas mediante guardias (`ValidarSesionActivaGuard` y `ValidarSesionInactivaGuard`) que controlan el acceso según el estado de la sesión del usuario.
    * Interceptores HTTP (`AuthInterceptor`) para adjuntar automáticamente tokens de autenticación a las solicitudes salientes.
* **Gestión de Datos (CRUD)**: Interfaces completas para crear, leer, actualizar y eliminar:
    * Planes Funerarios (incluyendo carga de imágenes).
    * Clientes.
    * Roles de usuario.
    * Beneficiarios asociados a un cliente.
* **Comunicación en Tiempo Real**: Módulo de chat que utiliza **Socket.IO** para la comunicación instantánea, permitiendo salas de chat y mensajería privada.
* **Interfaz de Usuario Amigable**:
    * Diseño responsivo basado en **Materialize CSS**.
    * Paginación en tablas de datos para una mejor navegación.
    * Uso de **Google reCAPTCHA** para proteger formularios públicos contra bots.

## Tecnologías Utilizadas

* **Framework**: Angular 15.2.0
* **Estilos**: Materialize CSS 1.0.0-rc.2
* **Comunicación en Tiempo Real**: Socket.IO Client 4.7.5
* **Paginación**: ngx-pagination 6.0.3
* **Seguridad en Formularios**: ngx-captcha 13.0.0
* **Hashing (lado del cliente)**: crypto-js 4.2.0

## Configuración y Despliegue

### Prerrequisitos

* Node.js (versión recomendada en `package.json`)
* Angular CLI (versión 15.2.4)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd frontend-funeraria
    ```
2.  Instala las dependencias de Node.js:
    ```bash
    npm install
    ```

### Configuración de Backend

Antes de iniciar la aplicación, es crucial configurar las URLs de los microservicios de backend.

1.  Abre el archivo `src/app/config/configuracion.rutas.backend.ts`.
2.  Modifica las variables `urlSeguridad`, `urlLogica` y `urlChat` para que apunten a las direcciones donde se están ejecutando tus microservicios.
3.  Configura la clave de Google reCAPTCHA en la variable `claveCaptcha` en el mismo archivo.

### Servidor de Desarrollo

Ejecuta el siguiente comando para iniciar el servidor de desarrollo. La aplicación estará disponible en `http://localhost:4200/`.
```bash
ng serve
```
La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

### Compilación
Para compilar el proyecto para producción, utiliza el siguiente comando. Los artefactos de la compilación se almacenarán en el directorio dist/.

```bash
ng build
```

### Uso
La aplicación cuenta con diferentes flujos de usuario:

1. Usuario Público: Puede navegar por la página de inicio, ver los planes, registrarse como nuevo cliente y enviar solicitudes de PQRS.
2. Cliente Registrado: Tras iniciar sesión (con 2FA), puede acceder a su perfil para gestionar beneficiarios y, en futuras implementaciones, consultar sus pagos y servicios contratados.
3. Administrador: Tiene acceso a un panel de control desde donde puede gestionar todos los parámetros del sistema (Usuarios, Roles, Planes, Clientes, etc.).
