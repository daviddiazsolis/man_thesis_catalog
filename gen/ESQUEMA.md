# Esquema de metadata por tesis (catálogo MAN FEN)

Escribe UN archivo JSON válido (UTF-8) con exactamente esta estructura. No inventes datos: todo lo que no esté en el texto va como null o lista vacía. Lee el texto completo de la tesis antes de escribir.

```json
{
  "id": "<slug que te dan>",
  "titleEs": "Título oficial tal como aparece en la portada, en capitalización normal de oración (no en mayúsculas sostenidas)",
  "titleEn": "Traducción fiel al inglés del título",
  "abstractEs": "Resumen ejecutivo en español, 150 a 220 palabras, basado en el resumen/abstract de la tesis y sus conclusiones. Un solo párrafo. Debe decir: problema, contexto/empresa o sector, datos, método, resultado principal con cifras si existen, y utilidad práctica.",
  "abstractEn": "Traducción fiel del abstractEs al inglés, 150 a 220 palabras, un párrafo.",
  "highlightsEs": ["5 highlights en español, cada uno una oración completa de 12 a 25 palabras, con cifras concretas cuando existan (métricas, tamaño de datos, mejoras)."],
  "highlightsEn": ["Los mismos 5 highlights traducidos al inglés, mismo orden."],
  "keywordsEs": ["4 a 7 palabras clave en español"],
  "keywordsEn": ["las mismas en inglés"],
  "domain": ["uno o dos de: finanzas, banca, retail, e-commerce, marketing, recursos humanos, salud, educación, sector público, política, industria, minería, agroindustria, acuicultura, telecomunicaciones, energía, transporte, medio ambiente, ciencia y tecnología, juegos y casinos, alimentos, servicios"],
  "taskTypes": ["uno o más de: clasificación, regresión, series de tiempo / forecasting, clustering / segmentación, detección de anomalías, NLP / LLMs, sistemas de recomendación, uplift / causal, optimización, análisis descriptivo e inferencial, reducción de dimensionalidad, DEA"],
  "techniques": ["lista de técnicas y modelos concretos usados, en inglés técnico tal como se nombran habitualmente: p.ej. 'Logistic Regression', 'Random Forest', 'XGBoost', 'LightGBM', 'SHAP', 'K-Means', 'DBSCAN', 'Isolation Forest', 'Prophet', 'SARIMA', 'LSTM', 'BERT', 'GPT-4', 'Uplift Random Forest', 'Cox Proportional Hazards', 'DEA', 'PCA', 'Apriori'. Solo las que realmente se aplican, no las que solo se mencionan en el marco teórico. Entre 2 y 10."],
  "tools": ["lenguajes y librerías/plataformas usadas: p.ej. 'Python', 'scikit-learn', 'R', 'Power BI', 'SQL', 'OpenAI API', 'Google Colab'. Solo si el texto lo dice."],
  "datasets": [
    {
      "nameEs": "nombre corto del dataset en español",
      "nameEn": "nombre corto en inglés",
      "source": "institución u origen (p.ej. 'Olist (Kaggle)', 'CASEN 2022, Ministerio de Desarrollo Social', 'datos internos de la empresa X', 'SERVEL')",
      "public": true,
      "url": "URL si el texto la entrega, si no null",
      "sizeNote": "tamaño aproximado si el texto lo dice (p.ej. '100k pedidos, 2016-2018'), si no null"
    }
  ],
  "organization": "empresa u organización con la que se trabajó, o null si son datos públicos sin contraparte",
  "socialImpact": {
    "level": "direct | indirect | none",
    "es": "una o dos oraciones que justifican el nivel. direct = la tesis aborda directamente un problema social o de política pública (salud, educación, empleo, equidad, servicios públicos, medio ambiente); indirect = beneficio social derivado (eficiencia de una empresa, consumidores, fiscalización); none = aplicación puramente comercial sin externalidad social evidente.",
    "en": "lo mismo en inglés"
  },
  "wordCountApprox": 12345,
  "notes": "cualquier cosa rara que notes (p.ej. el texto no tiene resumen, hay dos versiones, etc.) o null"
}
```

Reglas de estilo (obligatorias):
- Nada de em dashes (—) ni en dashes como separador; usa coma, punto o dos puntos.
- Sin emojis, sin viñetas dentro de los strings, sin markdown dentro del JSON.
- Español neutro, formal pero directo; inglés académico claro.
- Cifras con el formato del idioma (español: 12,5 %; inglés: 12.5%).
- No incluyas notas de defensa ni datos personales del alumno más allá de lo que te doy.
