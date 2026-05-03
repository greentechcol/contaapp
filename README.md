# 📒 ContaApp — Gestión de Negocios y Finanzas Personales

**ContaApp** es una aplicación web progresiva (PWA) diseñada para centralizar el control financiero tanto de emprendimientos como de finanzas personales. Ofrece una experiencia fluida, moderna y con capacidades offline.

## 🚀 Características Principales

-   **Doble Perfil**: Gestión separada para **Negocios** (ventas, compras, inventario) y **Personal** (gastos, ahorros, metas).
-   **Sistema de Diseño Moderno**: Interfaz limpia, responsiva y adaptativa basada en variables CSS.
-   **Arquitectura Modular**: Lógica de Firebase centralizada para facilitar el mantenimiento y la escalabilidad.
-   **Soporte Offline**: Gracias a Service Workers, la aplicación funciona incluso sin conexión a internet.
-   **Visualización de Datos**: Gráficos interactivos mediante Chart.js para un análisis rápido de ingresos y egresos.
-   **Sincronización en Tiempo Real**: Base de datos NoSQL con Firebase Firestore.

## 🛠️ Tecnologías Utilizadas

-   **Frontend**: HTML5, CSS3 (Custom Properties), JavaScript (ES6 Modules).
-   **Backend/BaaS**: Firebase (Auth & Firestore).
-   **Gráficos**: Chart.js.
-   **PWA**: Service Workers & Web App Manifest.
-   **Exportación**: SheetJS (XLSX).

## 📦 Instalación y Configuración

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/contaapp.git
    ```
2.  **Configurar Firebase**:
    Edita el archivo `firebase-config.js` y reemplaza las credenciales con las de tu proyecto en [Firebase Console](https://console.firebase.google.com/).

3.  **Despliegue**:
    Puedes usar GitHub Pages, Vercel o Firebase Hosting. Para Firebase Hosting:
    ```bash
    firebase deploy
    ```

## 🔒 Seguridad Recomendada

Asegúrate de configurar las reglas de seguridad en Firestore para proteger los datos de los usuarios:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---
Desarrollado con ❤️ para mejorar la salud financiera.
