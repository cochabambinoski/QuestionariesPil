## Módulo de supervisión y segmentación 
- Supervisión - CRUD y asignación de encuestas 
- Segmentación - Segmentación de clientes por tipo negocio en un determinado periodo, aplicando la distribución normal y agrupando en tres grupos en cada nivel.

#### Requisitos para ejecutar en el servidor
- Tener nodejs instalado
- El proyecto debe estar copiado en el servidor

#### Pasos para levantar el proyecto en modo producción
1. **npm install** para instalar las dependencias
2. **npm run build** para correr el entorno de producción
3. **npm install -g serve** para instalar el servidor
4. **serve -s build** para correr el servidor

#### IPs del archivo Constants

- ROUTE_WEB_SERVICES - Dirección de los webservices 
- ROUTE_WEB_BI - Dirección de los webservices del bi (segmentación)
- ROUTE_SVM - Link de svm para la redirección una vez caducada la sesión

#### Links adicionales
- Entrada sobre cómo definir la estructura de los archivos en React: https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1
- Documentación del proyecto base CreateReactApp: https://github.com/facebook/create-react-app?files=1