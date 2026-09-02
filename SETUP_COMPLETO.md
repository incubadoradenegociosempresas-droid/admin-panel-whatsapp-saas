# 🚀 Panel Admin WhatsApp SaaS - Setup Completo

## 1️⃣ Prerequisitos

- Node.js 16+ instalado
- Git
- Cuenta en GitHub
- Cuenta en Vercel (para deployar)

## 2️⃣ Crear el Repo en GitHub

```bash
# 1. Crea un nuevo repo en GitHub vacío
# Nombre sugerido: admin-panel-whatsapp-saas

# 2. En tu computadora
git clone https://github.com/TU_USUARIO/admin-panel-whatsapp-saas.git
cd admin-panel-whatsapp-saas

# 3. Copia los archivos que creamos:
# - src/components/Dashboard.jsx
# - src/components/ClientForm.jsx
# - src/components/ClientTable.jsx
# - src/App.jsx
# - src/App.css
# - src/Dashboard.css
# - package.json
# - .env.example

# 4. Crea la estructura
mkdir -p src/components
cp Dashboard.jsx src/components/
cp ClientForm.jsx src/components/
cp ClientTable.jsx src/components/
cp App.jsx src/
cp *.css src/
cp package.json .
cp .env.example .env.local
```

## 3️⃣ Configurar Variables de Entorno

Edita `.env.local` con tus valores:

```env
VITE_SUPABASE_URL=https://ytxnmscxyjttqftmznqj.supabase.co
VITE_SUPABASE_KEY=tu_supabase_api_key_aqui
VITE_META_TOKEN=EAAOvyjQUZAicBSdljgoXCTJ9ysPWl7eHj6DFJNVOPwh2bLjcz1QuaZAjSj0qZB6f7p8jbvTS0AxtASyLRcTHdr39K42EwHcSOnBoIjhZA4KlCjpLeyKLhncxl8fGRd2cHa4BmreuZCJW1rl8zV7m8ZCDklJvKM4kWtXOjTgsJrpiMVAZC8gx0xzQUbqrxnA97itBgZDZD
VITE_WABA_ID=1581567013537402
VITE_N8N_ENDPOINT=https://incubadoraempresas2026.app.n8n.cloud/webhook/crear-numero-meta
```

## 4️⃣ Instalar Dependencias

```bash
npm install
```

## 5️⃣ Crear Endpoint en n8n

1. **Ve a tu n8n**
2. **Crea un nuevo workflow**
3. **Importa**: `n8n-crear-numero-meta.json`
4. **Configura:**
   - En el nodo "Crear Número en Meta", agrega tu TOKEN de Meta como variable de entorno
   - Webhook path: `/webhook/crear-numero-meta`
5. **Publica el workflow**

## 6️⃣ Testear Localmente

```bash
npm run dev
```

Abre `http://localhost:5173` y prueba agregar un cliente.

## 7️⃣ Deployar en Vercel

### Opción A: Desde CLI

```bash
npm install -g vercel
vercel
# Sigue las instrucciones interactivas
```

### Opción B: Desde Web

1. Ve a https://vercel.com/dashboard
2. Click en "Add New..." → "Project"
3. Importa tu repo de GitHub
4. En "Environment Variables", agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`
   - `VITE_META_TOKEN`
   - `VITE_WABA_ID`
   - `VITE_N8N_ENDPOINT`
5. Click "Deploy"

## 8️⃣ Configurar en tu Aplicación

Una vez desplegado, tienes:

- **URL del Panel**: `https://tu-app.vercel.app`
- **API Endpoint n8n**: Crea cliente → llama n8n → crea número en Meta

## 9️⃣ Flujo Completo

```
1. Usuario agrega cliente en el panel
2. Panel crea tenant en Supabase
3. Panel llama n8n para crear número en Meta
4. n8n llama Meta API → genera número
5. Panel guarda phone_number_id en Supabase
6. Cliente listo en 30 segundos
```

## 🔟 Solucionar Problemas

### Error: "No puede crear número"
- Verifica que el token de Meta es válido
- Verifica que WABA_ID es correcto
- Verifica que n8n endpoint está activo

### Error: "Supabase connection failed"
- Verifica URL y KEY de Supabase en `.env.local`
- Confirma que la tabla `saas_tenants` existe

### No se ve el cliente en la tabla
- Recarga la página (F5)
- Verifica que Supabase connection es correcta

## 📋 Checklist Final

- [ ] Repo en GitHub creado
- [ ] Variables de entorno configuradas
- [ ] `npm install` ejecutado
- [ ] Workflow n8n importado y publicado
- [ ] `npm run dev` funciona localmente
- [ ] Panel deployado en Vercel
- [ ] Test: Agregar cliente funciona
- [ ] Test: Número se crea automáticamente
- [ ] Test: Supabase se actualiza

## 🎉 ¡Listo!

Ya tienes un panel admin profesional para gestionar clientes WhatsApp SaaS.

Próximos pasos:
- Agregar más campos según necesidad
- Personalizar diseño con tu branding
- Agregar autenticación (login)
- Integrar pagos con Stripe
