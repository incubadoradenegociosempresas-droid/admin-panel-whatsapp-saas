# Panel Admin WhatsApp SaaS - Setup

## Estructura del Proyecto

```
admin-panel/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClientForm.jsx
│   │   │   ├── ClientTable.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── hooks/
│   │   │   └── useSupabase.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env.example
└── backend/
    ├── create-client.js (n8n endpoint)
    └── README.md
```

## Datos Configuración

- **WABA_ID**: 1581567013537402
- **META_TOKEN**: [guardado en .env]
- **SUPABASE_PROJECT**: ytxnmscxyjttqftmznqj
- **SUPABASE_KEY**: [guardado en .env]

## Funcionalidades

1. **Formulario de Cliente**
   - Nombre negocio
   - Correo
   - Descripción
   - Productos/servicios
   - FAQ
   - Tono de voz
   - Horario
   - Teléfono dueño

2. **Integración Meta**
   - Crear número WhatsApp automático
   - Guardar phone_number_id en Supabase

3. **Gestión en Supabase**
   - Crear tenant
   - Activar/desactivar
   - Ver histórico

