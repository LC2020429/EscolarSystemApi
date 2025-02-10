# API del Sistema Escolar

Esta API está diseñada para gestionar el registro de usuarios dentro del sistema escolar. Incluye funcionalidades para registrar estudiantes y profesores, asegurando restricciones en los roles según la ruta utilizada.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Autenticación

- **Registrar Estudiante**

  - **URL:** `/scholarSystem/v1/auth/regist`
  - **Método:** `POST`
  - **Descripción:** Este endpoint registra a un usuario con rol "Estudiante" automáticamente. No permite enviar el campo `role`.
  - **Cuerpo:**
    ```json
    {
      "nombreUser": "string",
      "apellidoUser": "string",
      "correo": "string",
      "username": "string",
      "password": "string"
    }
    ```

- **Registrar Profesor**

  - **URL:** `/scholarSystem/v1/auth/registerTeacher`
  - **Método:** `POST`
  - **Descripción:** Este endpoint permite el registro de un usuario con rol "Profesor". Solo los administradores pueden utilizarlo.
  - **Cuerpo:**
    ```json
    {
      "nombreUser": "string",
      "apellidoUser": "string",
      "correo": "string",
      "username": "string",
      "password": "string",
      "role": "Profesor"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/scholarSystem/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "correo": "string",
      "password": "string"
    }
    ```

### Usuarios

- **Obtener Usuario por ID**

  - **URL:** `/scholarSystem/v1/user/findUser/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**

  - **URL:** `/scholarSystem/v1/user/deleteUser/:uid`
  - **Método:** `DELETE`

- **Listar Usuarios**

  - **URL:** `/scholarSystem/v1/user/`
  - **Método:** `GET`

- **Actualizar Información del Usuario**
  - **URL:** `/scholarSystem/v1/user/updateUser/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "nombreUser": "string",
      "apellidoUser": "string"
    }
    ```

### Matrículas

- **Registrar Matrícula**

  - **URL:** `/scholarSystem/v1/matri/register`
  - **Método:** `POST`
  - **Descripción:** Permite registrar la matrícula de un estudiante en un curso.
  - **Cuerpo:**
    ```json
    {
      "userId": "string",
      "courseId": "string"
    }
    ```

- **Listar Matrículas**
  - **URL:** `/scholarSystem/v1/matri/`
  - **Método:** `GET`

### Cursos

- **Registrar Curso**

  - **URL:** `/scholarSystem/v1/curse/register`
  - **Método:** `POST`
  - **Descripción:** Permite a un administrador registrar un nuevo curso.
  - **Cuerpo:**
    ```json
    {
      "nombreCurso": "string",
      "descripcion": "string"
    }
    ```

- **Listar Cursos**
  - **URL:** `/scholarSystem/v1/curse/`
  - **Método:** `GET`

## Restricciones y Validaciones

1. **Registro de Estudiantes:**

   - La ruta `/scholarSystem/v1/auth/regist` no permite que el usuario envíe el campo `role`.
   - Automáticamente se asigna el rol "Estudiante".

2. **Registro de Profesores:**

   - Solo los administradores pueden registrar profesores en la ruta `/scholarSystem/v1/auth/registerTeacher`.

3. **Validaciones de Contraseña:**

   - La contraseña debe contener al menos:
     - 8 caracteres
     - 1 mayúscula
     - 1 número
     - 1 carácter especial

4. **Correos y Usernames Únicos:**
   - Se valida que el `correo` y `username` no existan en la base de datos antes del registro.
