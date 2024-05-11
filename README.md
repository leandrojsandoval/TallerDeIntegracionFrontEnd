# TPIntegracionFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Mini Documentación

Comandos Utilizados

## ng new <nombre_proyecto>: 

Este comando se utiliza para crear un nuevo proyecto Angular. Por ejemplo:
 
```console
ng new my-project
```

Crea una nueva carpeta con el nombre especificado y configura un nuevo proyecto Angular dentro de esa carpeta.

### ng generate component <nombre_componente>: 
Genera un nuevo componente Angular en la carpeta src/app. Por ejemplo:


```console
ng generate component components/home
```

Esto crea una carpeta home dentro de src/app/components con los archivos necesarios para el componente (archivo TypeScript, HTML, CSS, etc.).

### ng generate service <nombre_servicio>:
 Genera un nuevo servicio Angular en la carpeta src/app. Por ejemplo:


```console
ng generate service services/auth/auth --flat
```

Esto crea un archivo TypeScript para el servicio dentro de la carpeta src/app/services/auth y lo registra automáticamente en el módulo correspondiente.

# Estructura de Carpetas
## Componentes: 
Los componentes generados se guardarán en la carpeta **src/app/components** por defecto.


home
login
Otros componentes aquí...

## Servicios:
 Los servicios generados se guardarán en la carpeta **src/app/services** por defecto.

> auth

    > auth.service.ts

> data

    > data.service.ts

`Otros servicios aquí...`

Para una estructura más organizada, puedes crear subcarpetas dentro de la carpeta services para organizar tus servicios. 

Por ejemplo, una carpeta auth para el servicio de autenticación y una carpeta data para otros servicios relacionados con datos.

Siguiendo esta estructura, tus archivos estarán bien organizados y será más fácil mantener tu proyecto a medida que crezca.

