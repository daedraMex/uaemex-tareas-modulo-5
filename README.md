# Dev Showcase

Crea una aplicación web moderna y responsive utilizando React, Tailwind CSS y Lucide Icons, estructurada bajo la metodología de Atomic Design (Atoms, Molecules, Organisms, Templates, Pages).

Objetivo de la aplicación: La app debe mostrar un listado de 9 tareas o ejercicios prácticos en una sola página principal (Dashboard / Showcase).

Requisitos funcionales y de datos:

Datos de las tareas:

Crea un archivo de datos mock (tasksData.ts) con 9 elementos.

Cada tarea debe incluir: id, title, description. Cada tarjeta debe mostrar el título, la descripción, sus etiquetas y dos acciones clave:

Ver Vista Previa (Live Preview): Una sección  que renderice de forma segura el código HTML embebido de la tarea.Estructura de Componentes (Atomic Design):

Atoms: Botones, Badges, Inputs, Íconos.

Molecules: Tarjeta individual de tarea (TaskCard), Barra de búsqueda, Visor de código/HTML.

Organisms: Header de la app, Grid de tareas (TaskGrid), Modal de vista previa.

Templates: Layout principal con Header, Main Content y Footer.

Pages: HomePage / TaskShowcasePage.

Optimización para Despliegue (GitHub Pages / Vercel):

Asegúrate de que las rutas sean relativas para evitar problemas de base path si se despliega en GitHub Pages (o listo para Vercel sin configuración adicional).

Diseña la interfaz limpia, minimalista y tipo 'Dashboard de Desarrollador'."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d1188c23-9682-483b-9daa-67f7cc6fcbf9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
