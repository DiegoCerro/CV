# Diego Cerro — Currículum digital

Mi currículum personal en formato web. Una sola página, **HTML + CSS + JavaScript puro**,
sin dependencias ni paso de build: se abre `index.html` y funciona.

🔗 **En vivo:** https://diegocerro.github.io/CV/

---

## Características

- Diseño editorial cálido con modo claro/oscuro (recuerda la preferencia).
- Tipografía con carácter: **Fraunces**, **Space Grotesk** y **JetBrains Mono**.
- Animaciones con propósito: rotador tipo bobina, reveals al hacer scroll,
  botones magnéticos, marquee de stack y micro-interacciones cuidadas.
- Accesible y responsive, con `prefers-reduced-motion` respetado.
- Saludo en la consola del navegador para quien inspeccione el código.
- Cero dependencias, cero frameworks.

## Estructura

```
.
├── index.html   — contenido y estructura
├── styles.css   — estilos y temas (variables en :root)
├── script.js    — interacciones
├── matchpoint-logo.svg
└── .gitignore
```

## Desarrollo local

No hay nada que instalar. Clona el repo y abre `index.html` en el navegador
(doble clic o arrastrarlo a una pestaña).

---

## Personalización

### Colores
Viven en `styles.css`, arriba del todo, en `:root` (tema claro) y
`[data-theme="dark"]` (tema oscuro). Cambiando `--accent` se reescala la identidad visual.


### Que no aparezca en buscadores (opcional)
Añadir dentro del `<head>` de `index.html`:
```html
<meta name="robots" content="noindex, nofollow">
```

---

## Despliegue (GitHub Pages)

La web está publicada con **GitHub Pages** desde la rama `main`, carpeta raíz.
El repo usa una identidad de git **local** (Diego Cerro · email privado `noreply` de GitHub),
sin tocar la configuración global del equipo.

### Cómo subir cambios

1. Editar los archivos en local.
2. Crear un **fine-grained Personal Access Token** (Settings → Developer settings →
   Personal access tokens → Fine-grained tokens):
   - Repository access: *Only select repositories* → **CV**
   - Permissions → Repository → **Contents: Read and write**
   - Caducidad corta (p. ej. 7 días).
3. Hacer commit y push (el token va en línea, no se guarda):
   ```bash
   git add .
   git commit -m "Actualizo el currículum"
   git -c credential.helper= push \
     "https://DiegoCerro:TU_TOKEN@github.com/DiegoCerro/CV.git" main
   ```
4. GitHub Pages se actualiza solo en ~1 minuto.
5. **Revocar el token** cuando ya no se use (Settings → Developer settings → el token → Delete).

> Pages ya está activado (Settings → Pages → Deploy from a branch · `main` · `/root`).
> Solo hay que repetirlo si alguna vez se desactiva.

Cualquier hosting de estáticos sirve igual (Netlify, Vercel, Cloudflare Pages):
no necesita servidor ni base de datos.
