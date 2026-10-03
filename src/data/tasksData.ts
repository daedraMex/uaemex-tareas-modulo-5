// BASE_URL es "/" en desarrollo y "/uaemex-tareas-modulo-5/" en GitHub Pages,
// por lo que todas las URLs de archivos se construyen a partir de aquí.
const base = import.meta.env.BASE_URL;

export interface Task {
  id: number;
  title: string;
  description: string;
  tags: string[];
  html: string;
  /** URL de un documento HTML externo (se usa en lugar de `html` cuando existe). */
  url?: string;
  fileName?: string;
  /** URL del notebook .ipynb de la tarea, cuando está disponible. */
  ipynbUrl?: string;
  ipynbFileName?: string;
  /** URL de una app en vivo (p. ej. servidor de Panel), cuando está disponible. */
  liveUrl?: string;
}

export const tasksData: Task[] = [
  {
    id: 1,
    title: "Tarea 1 — Red Neuronal: Gastos Médicos",
    description:
      "Red neuronal con PyTorch para predecir los gastos médicos anuales de asegurados a partir de edad, IMC, tabaquismo, región e hijos. Se comparan dos técnicas de escalamiento —StandardScaler y MinMaxScaler— midiendo MSE, MAE y R² en el conjunto de prueba, verificando que el modelo no esté sobreentrenado. Entrenado con MPS (GPU del chip de Apple).",
    tags: ["PyTorch", "Python", "Notebook", "Deep Learning"],
    url: `${base}gastos_medicos_NN.html`,
    fileName: "gastos_medicos_NN.html",
    ipynbUrl: `${base}gastos_medicos_NN.ipynb`,
    ipynbFileName: "gastos_medicos_NN.ipynb",
    html: "",
  },

  {
    id: 2,
    title: "Tarea 2 — Red Neuronal: Personalidad",
    description:
      "Red neuronal con PyTorch y 2 capas ocultas (64 y 32 neuronas) para predecir la personalidad (Extrovert/Introvert) a partir de tiempo a solas, miedo escénico, asistencia a eventos sociales, salidas y otros atributos del dataset personality_dataset.csv. Incluye limpieza de datos, preprocesamiento, entrenamiento con MPS y evaluación con matriz de confusión y reporte de clasificación (accuracy 91.43% en prueba).",
    tags: ["PyTorch", "Python", "Notebook", "Deep Learning"],
    url: `${base}tarea_2_personalidad_NN.html`,
    fileName: "tarea_2_personalidad_NN.html",
    ipynbUrl: `${base}tarea_2_personalidad_NN.ipynb`,
    ipynbFileName: "tarea_2_personalidad_NN.ipynb",
    html: "",
  },
  {
    id: 3,
    title: "Tarea 3 — Pronósticos de Series de Tiempo: RNN y LSTM",
    description:
      "Predicción de los precios de cierre de GOOGL y NVDA con redes RNN y LSTM (PyTorch) a 1 y 5 pasos hacia adelante, usando las series en niveles (no estacionarias). Incluye el ejemplo de clase (CEMEX con LSTM sobre la variación porcentual) y los 8 experimentos de la tarea, con tabla comparativa de MSE, MAE y R², gráficas de evolución del entrenamiento y de predicción vs valor real. Datos descargados de Yahoo Finance con yfinance; entrenado con MPS.",
    tags: ["PyTorch", "Python", "Notebook", "Series de Tiempo", "Deep Learning"],
    url: `${base}tarea_3_series_tiempo_LSTM.html`,
    fileName: "tarea_3_series_tiempo_LSTM.html",
    ipynbUrl: `${base}tarea_3_series_tiempo_LSTM.ipynb`,
    ipynbFileName: "tarea_3_series_tiempo_LSTM.ipynb",
    html: "",
  },
  {
    id: 4,
    title: "Extra — App Panel: Calculadora de Personalidades",
    description:
      "Aplicación visual construida con Panel que predice si una persona es Introvertida o Extrovertida a partir de sus hábitos (tiempo a solas, miedo escénico, eventos sociales, salidas, agotamiento, amigos y publicaciones), usando un árbol de decisión entrenado (personalidades.pkl) con su preprocesador. Incluye widgets interactivos, plantilla FastListTemplate y despliegue con panel serve. Se corrigió la app original: nombre del transformador, etiquetas invertidas y rangos de los widgets.",
    tags: ["Panel", "Python", "Notebook", "Machine Learning", "App"],
    url: `${base}app_panel_personalidades.html`,
    fileName: "app_panel_personalidades.html",
    ipynbUrl: `${base}app_personalidades.ipynb`,
    ipynbFileName: "app_personalidades.ipynb",
    // En desarrollo y en GitHub Pages la app (versión WASM) vive en public/app_personalidades/
    liveUrl: `${import.meta.env.BASE_URL}app_personalidades/`,
    html: "",
  },
];
