import type { GlobalConfig } from "payload";

import { ColorField, Group, Toggle } from "./fieldHelpers";
import { footerNavField, footerSocialField } from "./sectionOrderFields";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Ajustes del sitio",
  admin: {
    description:
      "Marca, logo, colores, contacto, imágenes y visibilidad de páginas/menús. El orden de secciones de cada página está en Colecciones.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Marca y logo",
          fields: [
            {
              name: "brandName",
              type: "text",
              label: "Nombre de marca",
              required: true,
              defaultValue: "Blau Yoga",
              admin: {
                description: "Usado en textos con {brandName}.",
              },
            },
            {
              name: "teacherName",
              type: "text",
              label: "Nombre de la profesora",
              required: true,
              defaultValue: "Cyane",
              admin: {
                description:
                  "Nombre usado en toda la web: metas, WhatsApp, tagline, «Hola, soy…», etc. Usa {teacherName} en los textos.",
              },
            },
            {
              name: "logoText",
              type: "text",
              label: "Texto del logo",
              required: true,
              defaultValue: "BLAU YOGA",
              admin: { description: "Normalmente en mayúsculas, como aparece junto al símbolo." },
            },
            {
              name: "tagline",
              type: "text",
              label: "Tagline bajo el logo",
              localized: true,
              defaultValue: "Yoga con {teacherName} · RYT 220H",
              admin: {
                description: "Puedes usar {teacherName} y {brandName}.",
              },
            },
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Logo personalizado (imagen)",
              admin: {
                description: "Si subes una imagen, sustituye el símbolo SVG por defecto.",
              },
            },
            {
              name: "logoUrl",
              type: "text",
              label: "URL del logo (alternativa)",
              admin: { description: "Solo si no hay imagen subida." },
            },
            Toggle("showLogoMark", "Mostrar símbolo / imagen del logo", true),
            Toggle("showLogoText", "Mostrar texto del logo", true),
            Toggle("showTagline", "Mostrar tagline bajo el logo", true),
          ],
        },
        {
          label: "Colores",
          description: "Paleta de la web. Usa valores HEX.",
          fields: [
            Group("colors", "Paleta", [
              ColorField("deep", "Azul profundo (principal)", "#0F4C5C"),
              ColorField("deepDark", "Azul profundo oscuro (hover)", "#0A3A47"),
              ColorField("teal", "Turquesa (acento)", "#2FA7A6"),
              ColorField("tealDark", "Turquesa oscuro (hover)", "#248F8E"),
              ColorField("aqua", "Agua clara", "#A8D5D1"),
              ColorField("sky", "Azul cielo", "#DCEEF0"),
              ColorField("sand", "Arena (fondo)", "#F4F1EA"),
              ColorField("linen", "Lino", "#E6DED1"),
              ColorField("wood", "Madera", "#D7C2A4"),
              ColorField("ink", "Texto cuerpo", "#35565F"),
            ]),
          ],
        },
        {
          label: "Contacto y redes",
          description:
            "Fuente única para toda la web: WhatsApp, email, ciudad y redes. Si cambias el teléfono aquí, se actualizan todos los botones y enlaces de WhatsApp.",
          fields: [
            Group("contact", "Contacto centralizado", [
              {
                name: "whatsappPhone",
                type: "text",
                label: "WhatsApp (número para enlaces)",
                required: true,
                defaultValue: "34610429326",
                admin: {
                  description:
                    "Solo dígitos con prefijo país, sin + ni espacios. Ej. 34610429326. Usado en TODOS los WhatsApp de la web.",
                },
              },
              {
                name: "whatsappDisplay",
                type: "text",
                label: "WhatsApp (cómo se muestra)",
                required: true,
                defaultValue: "+34 610 42 93 26",
                admin: {
                  description: "Texto visible junto al icono de teléfono en Contacto.",
                },
              },
              {
                name: "email",
                type: "email",
                label: "Email",
                required: true,
                defaultValue: "cyaneyoga@gmail.com",
                admin: {
                  description: "Correo mostrado en Contacto y en el footer.",
                },
              },
              {
                name: "address",
                type: "text",
                label: "Dirección / ciudad",
                localized: true,
                defaultValue: "Barcelona",
              },
              {
                name: "instagram",
                type: "text",
                label: "Instagram (URL completa)",
                defaultValue: "https://www.instagram.com/cyaneyoga/",
              },
              {
                name: "facebook",
                type: "text",
                label: "Facebook (URL completa)",
                defaultValue:
                  "https://www.facebook.com/profile.php?id=100056892065471",
              },
              {
                name: "spotify",
                type: "text",
                label: "Playlist Spotify (URL completa)",
                defaultValue: "https://open.spotify.com/playlist/6Fp8AowBrbG9r7M02z19JN",
              },
            ]),
          ],
        },
        {
          label: "Imágenes",
          fields: [
            Group("images", "Imágenes principales", [
              {
                name: "hero",
                type: "upload",
                relationTo: "media",
                label: "Hero (inicio)",
              },
              {
                name: "heroUrl",
                type: "text",
                label: "Hero URL alternativa",
                defaultValue: "/images/hero.png",
              },
              {
                name: "studio",
                type: "upload",
                relationTo: "media",
                label: "Estudio (portada / landing)",
              },
              {
                name: "studioUrl",
                type: "text",
                label: "Estudio URL alternativa",
                defaultValue: "/images/estudio.png",
              },
              {
                name: "contact",
                type: "upload",
                relationTo: "media",
                label: "Contacto",
              },
              {
                name: "contactUrl",
                type: "text",
                label: "Contacto URL alternativa",
                defaultValue: "/images/contacto-orilla-3.png",
              },
            ]),
            {
              name: "studioGallery",
              type: "array",
              label: "Galería del estudio (/estudio)",
              labels: { singular: "Imagen", plural: "Imágenes" },
              maxRows: 8,
              admin: {
                description:
                  "Fotos de la página /estudio. La primera marcada como «Destacada» ocupa más espacio.",
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  label: "Imagen",
                },
                {
                  name: "imageUrl",
                  type: "text",
                  label: "URL alternativa",
                },
                {
                  name: "alt",
                  type: "text",
                  label: "Texto alternativo",
                  localized: true,
                },
                {
                  name: "featured",
                  type: "checkbox",
                  label: "Destacada (más grande)",
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: "Páginas visibles",
          description:
            "Interruptor maestro: si una página está oculta, no es accesible (404) y no aparece en header ni footer, aunque sus toggles de menú estén activos.",
          fields: [
            Group("pages", "Páginas", [
              Toggle("classes", "Clases (/clases)", true),
              Toggle("schedule", "Horarios (/horarios)", true),
              Toggle("studio", "Estudio (/estudio)", true),
              Toggle("about", "Sobre mí (/sobre-mi)", true),
              Toggle("blog", "Blog (/blog)", true),
              Toggle("pricing", "Precios (/precios)", true),
              Toggle("contact", "Contacto (/contacto)", true),
            ]),
          ],
        },
        {
          label: "Menú header",
          description:
            "Muestra u oculta cada enlace del header. Las páginas desactivadas en «Páginas visibles» nunca aparecen.",
          fields: [
            Group("headerNav", "Enlaces del header", [
              Toggle("home", "Inicio", true),
              Toggle("classes", "Clases", true),
              Toggle("schedule", "Horarios", true),
              Toggle(
                "studio",
                "Estudio",
                false,
                "Oculto en el header por defecto. La página sigue accesible si está activa en «Páginas visibles».",
              ),
              Toggle("about", "Sobre mí", true),
              Toggle("blog", "Blog", true),
              Toggle("pricing", "Precios", true),
              Toggle("contact", "Contacto", true),
              Toggle("cta", "Botón «Reservar clase»", true),
            ]),
          ],
        },
        {
          label: "Menú footer",
          description:
            "Arrastra para reordenar enlaces y redes. Desactiva «Visible» para ocultar. Las páginas desactivadas en «Páginas visibles» no aparecen aunque el enlace esté activo.",
          fields: [footerNavField, footerSocialField],
        },
      ],
    },
  ],
};
