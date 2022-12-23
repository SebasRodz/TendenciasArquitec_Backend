# ClinicaArquiBackend

Clone el repositorio
Y ejecute `npm install` previamente debe tener instalado Node

## Development server

Ejecute `npm run start` para empezar ejecutar el codigo.

## Build

Para builear la app use `npm run build`

## Running unit tests

Para ejecutar los test `npm run test`

## Coverage

Ejecute `npm run coverage`

## Monitoreo

Debe instalar globalmente `npm install pm2 -g`
NOTA: Es necesario a veces establecer las variables de entorno para node y pm2
Ejecute `pm2 start ecosystem.config.js`
Para ver el estado del despliegue, ejecute `pm2 logs`