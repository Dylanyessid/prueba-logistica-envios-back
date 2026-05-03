# Prueba Logistica Envios - Backend

API REST para gestión de logística y envíos con soporte para envíos terrestres y marítimos.

## Tecnologías

- **Framework**: Express.js, por su simplicidad de creación de API REST
- **ORM**: TypeORM, por su integración con TypeScript
- **Base de datos**: PostgreSQL. Se escogió esta DB ya que es open source, extensible, y dado el problema que tiene un sentido relacional, es recomendado usar PostgreSQL. También se pudo usar MySQL, pero Postgres tiene mejor soporte para ciertos tipos de datos
- **Validación**: class-validator + class-transformer, por su simpleza para hacer validaciones de DTOs de entrada a las peticiones HTTP
- **Autenticación**: JWT (jsonwebtoken). Ya que es un estándar para la autenticación web
- **Documentación**: Swagger

## Arquitectura

```
src/
├── config/           # Configuraciones (DB, swagger, envs)
├── controllers/    # Controladores (lógica de negocio)
├── dto/request/    # DTOs para validación de requests
├── interfaces/      # TypeScript interfaces
├── middlewares/    # Middlewares (auth, roles, validación)
├── models/         # Entidades TypeORM
├── routes/         # Rutas API
├── services/       # Servicios (lógica de datos)
└── utils/          # Utilidades (errors, jwt, passwords)
```

### Patrones utilizados

- **Controllers y Services**: Separación entre controladores (HTTP) y lógica de negocio (services)
- **DTOs**: Validación de entrada con class-validator
- **Middleware chain**: Validación JWT → Roles → DTO → Controller
- **Result Pattern**: Servicios retornan `{ success, value/error, errorType }`
- **Error Handler**: Middleware centralizado para manejo de errores

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env con las variables necesarias
```

## Configuración

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=logistica_envios

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

PORT=3000
```

## Uso

```bash
# Desarrollo (con hot reload)
npm run dev
```

## Documentación API

Una vez ejecutando, acceder a: `http://localhost:3000/api-docs`

## Autenticación

1. Login: `POST /api/v1/users/login` con email y password
2. Obtener token JWT en la respuesta
3. Agregar header `Authorization: Bearer <token>` a las requests protegidas

### Roles

- **admin**: Acceso completo a todos los recursos
- **client**: Acceso solo a sus propios envíos

## Decisiones de diseño

- **Soft deletes**: Los registros no se eliminan físicamente sino que se marcan con `deletedAt`
- **TypeORM**: Abstracción de SQL permite cambiar de motor si es necesario
- **DTOs separados**: Create y Update tienen validaciones distintas
- **Descuentos automáticos**: Los shipments calculan descuento y precio final automáticamente