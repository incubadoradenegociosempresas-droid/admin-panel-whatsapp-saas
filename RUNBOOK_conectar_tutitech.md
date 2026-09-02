# Runbook — Cerrar la conexión de TutiTech (WhatsApp SaaS)

## Estado actual (todo esto YA está listo ✅)

| Componente | Estado |
|---|---|
| Base de datos Supabase (tenant TutiTech) | ✅ activo, límite 1000, modelo Sonnet |
| Tablas `saas_tenants`, `saas_leads`, `saas_conversaciones` | ✅ existen |
| Función de límite `saas_registrar_conversacion()` | ✅ existe y funciona |
| Token permanente (System User) en la fila de TutiTech | ✅ guardado, puede ENVIAR |
| Número TutiTech +52 477 264 9836 (Phone Number ID 1166328209905355) | ✅ conectado a la Cloud API |
| WABA TutiTech (ID 973650508547193) | ✅ creada, número registrado |
| Agente multi-tenant en n8n | ✅ publicado (webhook `/webhook/agente-clientes`) |
| Webhook Meta (app Incubadora Clientes) | ✅ URL y campo `messages` configurados |

## El ÚNICO pendiente ❌

**La WABA de TutiTech no está vinculada a ningún app de Meta**, por eso Meta no entrega sus mensajes al webhook. (Se creó directo en el portafolio, no vía un app.)

Evidencia: `POST /973650508547193/subscribed_apps` da error subcode 33 ("sin acceso") con dos tokens distintos → ningún app tiene acceso a esa WABA.

## Cómo cerrarlo — Método principal: Embedded Signup

El Embedded Signup permite **seleccionar una WABA existente** y conectarla al app. Como el número ya está registrado, **normalmente NO pide re-verificar** (no necesitarías el chip). Si por alguna razón lo pidiera, coordina con Jesús para el código.

1. developers.facebook.com → app **Incubadora Clientes**.
2. Busca el botón de conexión de WhatsApp (Embedded Signup). Suele aparecer como **"Conectar cuenta de WhatsApp Business"** / **"Iniciar sesión con Facebook"** en el flujo de WhatsApp. Si no lo ves en el caso de uso, entra por: **Documentos → WhatsApp → Primeros pasos**, o el botón azul de "Conectar" en la configuración de la API.
3. En la ventana emergente: elige el portafolio **Incubadora de Empresas** → selecciona la **WABA TutiTech existente** → el número **+52 477 264 9836** → finaliza.
4. Esto conecta la WABA al app **Incubadora Clientes**.

## Paso final (después de conectar): suscribir el webhook

Ya conectada la WABA al app, corre esto en **Graph API Explorer** (Herramientas → Explorador de la API de Graph):

- App: **Incubadora Clientes** → **Generar token de acceso** con permiso `whatsapp_business_management`.
- Método: **POST**
- Ruta:
```
973650508547193/subscribed_apps
```
- Envía. Respuesta esperada: `{ "success": true }`

(Ahora sí funcionará, porque el app ya tiene acceso a la WABA.)

## Verificar

1. Confirma que el workflow **"Agente Clientes SaaS (multi-tenant)"** esté **Activo** en n8n.
2. Manda un WhatsApp a **+52 477 264 9836** desde otro celular.
3. Revisa en Supabase: debe aparecer una fila en `saas_conversaciones` con `tenant_id = 0c9994e9-0439-4142-80cb-d6b47187f6eb`.
4. El agente (Valeria, Sonnet) responde.

## Mejora pendiente (no bloquea)
Aplicar los 2 fixes de la v2 al workflow de clientes (etiquetas [ESCALAR]/[CALIENTE] + modelo por tenant). Archivo: "Agente SaaS Multi-Tenant v2 (CORREGIDO).json".

## Datos clave
- WABA TutiTech ID: `973650508547193`
- Phone Number ID: `1166328209905355`
- Número: `+52 477 264 9836`
- Webhook n8n: `https://incubadoraempresas2026.app.n8n.cloud/webhook/agente-clientes`
- tenant_id (Supabase): `0c9994e9-0439-4142-80cb-d6b47187f6eb`
- Proyecto Supabase: `ytxnmscxyjttqftmznqj`
