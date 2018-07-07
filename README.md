# Intro
Este backend usa la arquitectura en capas (DDD).
Esta dividido en 3 carpetas
- common
- base-usuarios
- base-app
# Prerequisitos
Asegurarse de tener instalado: postgres v9.6 minimamente, nodejs v8, sequelize-cli 
# Ejecucion
## 1. Instalar dependencias. 
Respetar orden de carpetas
```
$ cd common
$ npm install
$ cd ..
$ cd base-usuarios
$ npm install
$ cd ..
$ cd base-app
$ npm install
```
## 2. Configurar conexion a base de datos
```
$ cd common
$ nano src/config/db.js
```

## 3. Ejecucion del proyecto (modo desarrollo)
```
$ cd base-app
$ npm run dev
```
El servicio estara disponible en localhost:3000