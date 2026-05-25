# Modelos 3D / AR / VR

Carpeta preparada para publicar recursos inmersivos del portafolio.

## Estructura sugerida

- `siamp.glb` — prototipo del sistema SIAMP.
- `invernadero.glb` — modelo o escenario del invernadero inteligente.
- `pieza-accesible.glb` — pieza 3D inclusiva o patrimonial.
- `tour-360/` — imágenes panorámicas o recursos de recorrido VR.

## Uso con `<model-viewer>`

Ejemplo:

```html
<model-viewer
  src="../assets/models/siamp.glb"
  camera-controls
  auto-rotate
  ar
  alt="Modelo 3D del proyecto SIAMP">
</model-viewer>
```

Para GitHub Pages, los archivos deben quedar dentro del repositorio y las rutas deben ser relativas.
