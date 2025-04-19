# 🚀 To-Do List App

Bienvenido a **To-Do List**, una aplicación simple y eficiente para gestionar tus tareas. Construida utilizando **Next.js** para el frontend y **NestJS** para el backend, todo containerizado con **Docker** para facilitar la ejecución.

## 📝 Funcionalidades
La aplicación permite realizar operaciones CRUD sobre tareas:

- Crear una tarea
- Leer todas las tareas
- Actualizar una tarea
- Eliminar una tarea
- Cada acción realizada en la app se reflejará en tiempo real tanto en el frontend como en la base de datos por medio de websocket.


## 🔧 Requisitos previos

Antes de comenzar, asegúrate de tener instalado **Docker** en tu máquina. Si aún no lo tienes, puedes instalarlo desde la [guía oficial de Docker](https://docs.docker.com/get-docker/).

---

## 🏁 Guía de instalación y ejecución

Sigue estos pasos para levantar la aplicación y empezar a gestionar tus tareas:

### 1. Clona el repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/to-do-list.git
cd to-do-list
```
### 2. Copia el .env en la raíz del proyecto
### 3. Construye las imágenes y levanta los contenedores
```bash
docker compose up --build
```
### 4. Accede a la aplicación

Una vez que los contenedores estén en funcionamiento, podrás acceder a:

- Frontend (Interfaz de usuario): http://localhost:3000
- Documentación de la API (Swagger): http://[::1]:4000/documentacion
