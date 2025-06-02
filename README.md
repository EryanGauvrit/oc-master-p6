# P6-Full-Stack-reseau-dev

## Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Where to start

As you may have seen if you already started the app, a simple home page containing a logo, a title and a button is available. If you take a look at its code (in the `home.component.html`) you will see that an external UI library is already configured in the project.

This library is `@angular/material`, it's one of the most famous in the angular ecosystem. As you can see on their docs (https://material.angular.io/), it contains a lot of highly customizable components that will help you design your interfaces quickly.


## Back

This project run with Spring Boot version 3.3.5

### Development server

- Run Spring Boot application
- The default port used is `http://localhost:3001/`

### Database

- You need to have a MySQL database running on your machine.
- Create and import database with .sql file located in `./db/mdd-project.sql`.
- The default database url is: `jdbc:mysql://localhost:3306/mdd_project?serverTimezone=UTC`

---

### ⚠️ Don't forget to show `./back/src/main/ressources/application.properties` to adapt your configuration.
