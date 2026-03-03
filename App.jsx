import React, { useState } from 'react';
import { LayoutDashboard, BrainCircuit, Network, Lightbulb, Search, ArrowLeft, CheckCircle2, Clock, Wrench, Target, ChevronDown, ChevronUp } from 'lucide-react';

// --- DATOS EXTRAÍDOS DE LOS CSV ---
const data = {
    tabla1: [
        { area: "Contabilidad", paso: "Elaboración conciliaciones bancarias", proyecto: "Conciliaciones Bancarias con Inteligencia Artificial", estado: "Productivo" },
        { area: "Contabilidad", paso: "Comprobantes de nómina, provisión y pago", proyecto: "Distribucion de la Nomina quincenal", estado: "En_Desarrollo" },
        { area: "Contabilidad", paso: "Recepción y revisión de requisitos externos", proyecto: "Verificacion fletes transportadoras / Verificacion lista de precios", estado: "En_Desarrollo" },
        { area: "Tesorería", paso: "Conciliación bancaria", proyecto: "CONCILIACION BANCARIA A DIARIO", estado: "Productivo" },
        { area: "Créditos", paso: "Revisar cartera del cliente, estado y cupo", proyecto: "Estados Financieros Clientes / Revision de Clientes", estado: "Productivo" },
        { area: "Créditos", paso: "Revisión de devoluciones y solicitudes de notas crédito", proyecto: "Revisar liquidacion de Solicitudes de notas crédito", estado: "En_Investigación" },
        { area: "Ventas", paso: "Importación, Liberación De Ordenes De Compra", proyecto: "IOC - Importacion Ordenes de Compra", estado: "En_Desarrollo" },
        { area: "Ventas", paso: "Seguimiento Administrativo de Cartera", proyecto: "INFORME DE PAGOS CADENAS / Análisis Financiero y Control de la Operación Comercial", estado: "En_Desarrollo / Productivo" },
        { area: "Despachos", paso: "Alistamiento y separación de producto terminado", proyecto: "Relacionar facturas de Dollarcity / Cubicaje y peso de cajas / Alistamiento distribuidores", estado: "Productivo / En_Investigación" },
        { area: "Producción", paso: "Planeación de la Producción", proyecto: "Ajuste del presupuesto mensual de producción / Programación semanal por sección", estado: "En_Desarrollo / En_Investigación" },
        { area: "Producción", paso: "Control y optimización de Proceso", proyecto: "Análisis de paradas de maquinas / Reducción desperdicios / Asistente mejora continua", estado: "En_Investigación / Productivo / En_Desarrollo" },
        { area: "Mantenimiento", paso: "Actividades de Mejora y optimización", proyecto: "Asistente técnico/operativo cambios de formato / Atención a líneas urgentes", estado: "Productivo" },
        { area: "Mantenimiento", paso: "Actividades Mantenimiento Preventivo", proyecto: "Programa de mtto preventivo / Ventanas de Mantenimiento Preventivo", estado: "Repetido / En_Desarrollo" },
        { area: "Compras", paso: "Realización de Cotizaciones", proyecto: "Compras Inteligentes", estado: "En_Desarrollo" },
        { area: "Compras", paso: "Preparación de presupuestos", proyecto: "Análisis de Consumos / Análisis de corrugados para cubicaje", estado: "En_Desarrollo" },
        { area: "Control Calidad", paso: "Muestreo e inspección de material de empaque", proyecto: "Revision de material de empaque", estado: "Nuevo" },
        { area: "Control Calidad", paso: "Control de calidad producto terminado", proyecto: "TRAZABILIDAD EN PRODUCTO TERMINADO", estado: "Nuevo" },
        { area: "Inocuidad", paso: "Identificación y evaluación de requisitos legales", proyecto: "matriz de legal de inocuidad alimentaria", estado: "Productivo" },
        { area: "Inocuidad", paso: "Sensibilización y Formación", proyecto: "IFS 360 – Plataforma Integral de Cumplimiento Normativo", estado: "Productivo" },
        { area: "Ambiental", paso: "Identificación y evaluación de requisitos legales", proyecto: "Control de actualización Matriz Legal en Gestion ambiental", estado: "Productivo" },
        { area: "SST", paso: "Identificación y evaluación de requisitos legales", proyecto: "Control de actualización de Matriz Legal en SST", estado: "Productivo" },
        { area: "SST", paso: "Investigar e identificar incidentes y/o accidentes", proyecto: "INVESTIGACION Y DETERMINACION DE CAUSAS DE ACCIDENTES LABORALES", estado: "Nuevo" },
        { area: "RRHH", paso: "Reclutamiento y pre – selección", proyecto: "Reclutamiento Automatizado y Analisis de Hojas de Vida / Evaluacion Pruebas", estado: "En_Desarrollo" },
        { area: "RRHH", paso: "Inducción y re-inducción general", proyecto: "Reinduiccion Periodica SAGRILAFT - PTEE - DERECHOS / Digitalización de evaluaciones", estado: "Productivo / En_Desarrollo" },
        { area: "Tecnología", paso: "Finalización del entregable (Peer Review)", proyecto: "Revisor de programas (Peer review)", estado: "En_Desarrollo" },
        { area: "Tecnología", paso: "Compra (Selección de proveedores)", proyecto: "Selección inteligente de Compras", estado: "En_Desarrollo" },
        { area: "Tecnología", paso: "Gestión de Soporte", proyecto: "Proyecto Chatbot de Soporte Básico", estado: "En_Desarrollo" },
        { area: "Gerencia Técnica", paso: "Asuntos Regulatorios (INVIMA)", proyecto: "ROTULADO TEXTOS LEGALES / REGISTROS SANITARIOS VENCIMIENTO", estado: "Productivo / En_Desarrollo" },
        { area: "Gerencia Técnica", paso: "Control de formulación mediante pesaje", proyecto: "Requerimientos de Materia Prima / Ingredientes / BALANCE DE INVENTARIO", estado: "Nuevo / En_Desarrollo" },
        { area: "Gestión Documental", paso: "Control de Registros / Listado Maestro", proyecto: "Matriz legal Gestiòn documental / Administrador Documental", estado: "Productivo / En_Desarrollo" },
        { area: "Revisoría Fiscal", paso: "Revisión Declaraciones de Impuestos", proyecto: "ASISTENTE TRIBUTARIO / Revisión Facturación Proveedores para Retención", estado: "En_Desarrollo" },
        { area: "Gerencia Administrativa", paso: "Renta (Declaración de impuestos)", proyecto: "Declaración de Renta Personas Naturales", estado: "Productivo" },
        { area: "Gerencia Administrativa", paso: "Revisión de contratos", proyecto: "Estándar Acuerdo Confidencialidad / Fusion de Contratos de Maquila", estado: "Productivo" }
    ],
    tabla2: [
        { area: "Contabilidad", paso: "Recepción de documentos externos.", tarea: "Verificación visual de facturas vs OC.", herramienta: "Gemini for Workspace", beneficio: "Extracción OCR de facturas en PDF y cruce automatizado contra MIDAS/GENERO." },
        { area: "Contabilidad", paso: "Codificación gastos menores / Cajas menores.", tarea: "Digitación manual de recibos físicos.", herramienta: "Gemini for Workspace", beneficio: "Escaneo de tickets; la IA extrae valor, fecha y sugiere la cuenta PUC." },
        { area: "Contabilidad", paso: "Encuestas manufactureras DANE.", tarea: "Consolidación de datos contables para el DANE.", herramienta: "Gemini for Workspace", beneficio: "Gemini extrae saldos y consolida automáticamente la plantilla requerida por la plataforma del DANE." },
        { area: "Compras", paso: "Generación y envío de Ordenes de Compra.", tarea: "Impresión en papel para firmas físicas.", herramienta: "Gemini + Workspace", beneficio: "Flujo de aprobación digital desde MIDAS a correos accionables, eliminando papel." },
        { area: "Compras", paso: "Devoluciones a proveedores.", tarea: "Redacción y envío de No Conformidades.", herramienta: "Gemini for Workspace", beneficio: "Gemini redacta el correo de garantía al proveedor leyendo el dictamen técnico de Calidad." },
        { area: "Créditos", paso: "Elaborar cartas envío cartera al abogado.", tarea: "Redacción manual de oficios jurídicos.", herramienta: "NotebookLM + Gemini", beneficio: "Redacción automática de cartas extrayendo días de mora de Putty y aplicando el tono legal estandarizado." },
        { area: "Créditos", paso: "Consulta masiva listas restrictivas.", tarea: "Digitación manual en sistema SAGRILAFT.", herramienta: "Gemini for Workspace", beneficio: "Automatización de la extracción de RUTs para consulta masiva en la plataforma Inspektor." },
        { area: "Tesorería", paso: "Reporte de cheques devueltos.", tarea: "Digitación de notas débito.", herramienta: "Gemini Vision", beneficio: "Lectura de imágenes de cheques devueltos, extrayendo el motivo y notificando a Cartera." },
        { area: "Tesorería", paso: "Legalización de viáticos.", tarea: "Verificación manual de recibos de vendedores.", herramienta: "Gemini Vision", beneficio: "Lectura automática de facturas de restaurantes/hoteles cruzando contra las políticas de viáticos." },
        { area: "RRHH", paso: "Control disciplinario.", tarea: "Redacción de actas de descargos.", herramienta: "NotebookLM + Gemini", beneficio: "Agente experto entrenado con el Reglamento Interno que redacta imparcialmente las actas disciplinarias." },
        { area: "RRHH", paso: "Liquidación de nómina.", tarea: "Digitación de novedades médicas.", herramienta: "Gemini for Workspace", beneficio: "Lectura de los PDFs de incapacidades de las EPS y tabulación en Excel (días y código CIE-10)." },
        { area: "Gestión Ambiental", paso: "Investigar incidentes ambientales.", tarea: "Análisis de causas en campo.", herramienta: "NotebookLM", beneficio: "Carga de históricos de derrames para que la IA sugiera causas raíz (Ishikawa)." },
        { area: "Gestión Ambiental", paso: "Reportar gestión ante el IDEAM.", tarea: "Consolidación manual de consumos.", herramienta: "Gemini for Workspace", beneficio: "Consolidación automática de facturas (agua/luz) para generar el reporte exacto del IDEAM." },
        { area: "Inocuidad", paso: "Identificación de PCC.", tarea: "Análisis manual de diagramas de flujo.", herramienta: "NotebookLM", beneficio: "Análisis inteligente de diagramas cruzados con HACCP/IFS para sugerir Puntos Críticos." },
        { area: "Inocuidad", paso: "Controles de limpieza y desinfección (PMLD).", tarea: "Verificación visual de planillas físicas.", herramienta: "Gemini Vision", beneficio: "Operarios toman fotos de las máquinas limpias; la IA valida visualmente la higiene." },
        { area: "Procesos", paso: "Soporte a la gestión del cambio.", tarea: "Evaluación manual de impactos.", herramienta: "NotebookLM", beneficio: "Simulador de Impacto: al proponer un cambio, la IA cruza las 24 matrices y advierte riesgos colaterales." },
        { area: "Procesos", paso: "Control de ACPM.", tarea: "Revisión de planes de acción.", herramienta: "Gemini for Workspace", beneficio: "Análisis de hallazgos repetitivos para sugerir si corresponde acción correctiva, preventiva o mejora." },
        { area: "Gestión Documental", paso: "Préstamo de documentos.", tarea: "Búsqueda física y control manual (FR-PO-GD-004).", herramienta: "NotebookLM + Gemini", beneficio: "Interfaz de búsqueda semántica del inventario para localizar cajas y automatizar alertas a las 8 horas." },
        { area: "Gestión Documental", paso: "Conservación y disposición final.", tarea: "Revisión manual de Tiempos de Retención.", herramienta: "NotebookLM", beneficio: "Monitoreo del Listado Maestro para alertar cuando un lote cumple su ciclo legal de destrucción." },
        { area: "SST", paso: "Vigilancia epidemiológica.", tarea: "Cruce manual de restricciones médicas vs puesto.", herramienta: "Gemini for Workspace", beneficio: "Extracción de restricciones de las ARL/EPS y cruce automático contra el Profesiograma." },
        { area: "Revisoría Fiscal", paso: "Revisión Mayores/Menores Valores.", tarea: "Verificación visual de comprobantes.", herramienta: "Gemini for Workspace", beneficio: "Cruce algorítmico entre comprobantes escaneados y los registros de Putty, marcando inconsistencias." },
        { area: "Revisoría Fiscal", paso: "Acompañamiento Inventario Físico.", tarea: "Conteo visual y verificación de Kardex.", herramienta: "Gemini Vision", beneficio: "Auditores escanean estanterías con tablets; la IA concilia contra Putty en tiempo real." },
        { area: "Gerencia Admin.", paso: "Asuntos legales y regulatorios.", tarea: "Revisión de actas del INVIMA.", herramienta: "NotebookLM", beneficio: "Análisis instantáneo de inspecciones sanitarias contra normatividad legal para generar planes de acción." },
        { area: "Gerencia Proyectos", paso: "Diagnóstico situación actual.", tarea: "Evaluación de brechas de proyecto.", herramienta: "Gemini for Workspace", beneficio: "Asistente que analiza el 'Perfil simple del proyecto' y sugiere cuellos de botella." },
        { area: "Ventas", paso: "Solicitudes de Notas Crédito.", tarea: "Revisión manual de formatos (amarre, avería).", herramienta: "Gemini for Workspace", beneficio: "Extracción de datos (FR-PO-CV-119) para validar matemáticamente si cumplen la política comercial." },
        { area: "Control Calidad", paso: "Recepción y manejo de PQR.", tarea: "Trazabilidad manual y respuesta.", herramienta: "NotebookLM + Gemini", beneficio: "La IA busca el lote reclamado en históricos y redacta una respuesta corporativa y técnica para el cliente." },
        { area: "Mercadeo", paso: "Captura de productos Nuevos (Logyca).", tarea: "Homologación manual de especificaciones.", herramienta: "Gemini for Workspace", beneficio: "Lectura de la Ficha Técnica (PDF) para llenar automáticamente la plantilla de Logyca (dimensiones, EAN)." },
        { area: "Mercadeo", paso: "Estudio de mercados.", tarea: "Consolidación de encuestas.", herramienta: "NotebookLM", beneficio: "Generación de perfiles de consumidor cruzando encuestas y data de Nielsen." },
        { area: "Almacén PT", paso: "Inspección en recepción de Planta.", tarea: "Verificación visual del embalaje.", herramienta: "Gemini Vision", beneficio: "Detección automática de cajas abolladas mediante cámaras al momento de recibir el palet." },
        { area: "Almacén PT", paso: "Manejo de facturas anuladas.", tarea: "Comparación física vs factura anulada.", herramienta: "Gemini for Workspace", beneficio: "Escaneo rápido para dar de baja la factura en Genero y devolver la mercancía al inventario lógico." },
        { area: "Materias Primas", paso: "Recepción de pedidos proveedores.", tarea: "Verificación visual de Remisión vs OC.", herramienta: "Gemini Vision", beneficio: "Escaneo de la remisión del transportador para validarla algorítmicamente contra MIDAS." },
        { area: "Despachos", paso: "Vencimientos (SOAT, Tecnomecánica).", tarea: "Control manual en carpetas/Excel.", herramienta: "Gemini for Workspace", beneficio: "Monitoreo automático de la carpeta de la flota, extrayendo fechas para alertar a Tesorería." },
        { area: "Gerencia Técnica", paso: "Fichas técnicas de producto.", tarea: "Consolidación manual de análisis.", herramienta: "Gemini for Workspace", beneficio: "Consolidación de resultados de laboratorio (microbiológicos/fisicoquímicos) para redactar el PDF final." },
        { area: "Gerencia Técnica", paso: "Control desperdicios (Barreduras).", tarea: "Cuantificación manual por sección.", herramienta: "Gemini for Workspace", beneficio: "Sumatoria automática de los formatos de barreduras para generar el reporte de mermas gerencial." },
        { area: "Mantenimiento", paso: "Toma de datos SCADA.", tarea: "Transcripción de eficiencia de máquinas.", herramienta: "Gemini / Looker Studio", beneficio: "Extracción directa de parámetros de la plataforma SCADA para generar dashboards visuales." },
        { area: "Mantenimiento", paso: "Inventario de maquinas/equipos.", tarea: "Conteo físico contra activos.", herramienta: "Gemini Vision", beneficio: "Captura de placas técnicas; Gemini extrae el serial y concilia con el software del Plan Maestro." },
        { area: "Producción", paso: "Programar turnos al personal.", tarea: "Asignación manual en formatos.", herramienta: "Gemini for Workspace", beneficio: "Generación de mallas cruzando volúmenes exigidos, habilidades y límites de horas extras." },
        { area: "Producción", paso: "Capacitación y Entrenamiento.", tarea: "Seguimiento a inducciones en puesto.", herramienta: "NotebookLM", beneficio: "Conversión de manuales de máquina y BPM en Guías de Estudio interactivas y Quizzes para operarios." },
        { area: "Tecnología", paso: "2.10 Auditoria de revisiones de seguridad.", tarea: "Análisis manual de logs de Trellix.", herramienta: "Gemini for Workspace", beneficio: "Análisis diario automatizado de patrones de amenazas, filtrando falsos positivos." },
        { area: "Tecnología", paso: "3.4 Registro de los Backups.", tarea: "Digitación de respaldos en BD '5S - Inventario Backup'.", herramienta: "Gemini for Workspace", beneficio: "Extracción de datos desde los logs de Arcserve para registrar el estado del respaldo automáticamente." },
        { area: "Tecnología", paso: "5.5 Monitoreos de Equipos (Nagios).", tarea: "Revisión visual diaria de alertas de red.", herramienta: "Gemini + NotebookLM", beneficio: "Carga de históricos de Nagios para identificar tendencias y predecir caídas de servicio." },
        { area: "Tecnología", paso: "5.6 Reinicios de Data Center.", tarea: "Reporte manual en WhatsApp post-reinicio.", herramienta: "Gemini for Workspace", beneficio: "Tras reiniciar servidores, Gemini redacta y envía automáticamente el estado de los servicios." },
        { area: "Tecnología", paso: "6.3 Registro nacional de BD (SIC).", tarea: "Verificación manual de BD contra la SIC.", herramienta: "NotebookLM", beneficio: "Auditoría inteligente del inventario de BD frente a los requisitos legales de la SIC." },
        { area: "Tecnología", paso: "1.3 Levantamiento de información (Entregables).", tarea: "Generación manual de diagramas y cronogramas.", herramienta: "Gemini for Workspace", beneficio: "Generación automática de diagramas de flujo y cronogramas a partir de transcripciones." },
        { area: "Tecnología", paso: "8.6 Políticas de seguridad (Correo).", tarea: "Creación de listas blancas/negras.", herramienta: "NotebookLM", beneficio: "Base de conocimiento con políticas de seguridad para analizar dominios sospechosos antes del bloqueo." }
    ],
    tabla3: [
        {
            areas: "Calidad, Almacenes (MP/PT), Producción y Compras",
            tipo: "Tarea Duplicada (Reproceso operativo)",
            problema: "Tratamiento de No Conformes y Devoluciones: Producción aísla (MA-PO-PRO-001), Almacenes apartan y despachan (APT/AMP-001), Calidad emite dictámenes (FR-PO-GCC-008) y Compras notifica al proveedor. 5 áreas documentando y transcribiendo el mismo defecto aisladamente.",
            solucion: "1. Cargar las especificaciones de calidad y políticas de devoluciones en NotebookLM. 2. Implementar AppSheet + Gemini Vision. Cuando un operario detecta un defecto, toma una foto. Gemini consulta a NotebookLM, clasifica la gravedad y dispara simultáneamente: baja contable, alerta a Producción y redacción del reclamo al proveedor vía Compras."
        },
        {
            areas: "RRHH, SST, Ambiental, Inocuidad, Calidad, Tecnología y Producción",
            tipo: "Tarea Duplicada (Desgaste de horas hombre)",
            problema: "\"Universidad Corporativa\" Fragmentada: Siete áreas diseñan cronogramas, dictan inducciones presenciales (BPM, SST, HACCP), generan formatos de asistencia (FR-PA-GH-006) y evalúan al mismo operario de forma independiente.",
            solucion: "1. Consolidar los manuales de Inocuidad, SST, Políticas Ambientales y Reglamentos en un \"Cerebro Corporativo\" en NotebookLM. 2. Usar Audio Overviews para generar podcasts de entrenamiento dinámicos. 3. Emplear Gemini en Google Forms para hacer micro-evaluaciones unificadas, actualizando automáticamente la matriz de competencias del trabajador para las 7 áreas simultáneamente."
        },
        {
            areas: "Compras y Mantenimiento",
            tipo: "Tarea Duplicada (Doble evaluación al mismo tercero)",
            problema: "Evaluación y Selección de Proveedores: Mantenimiento evalúa a los contratistas bajo criterios técnicos (PR-PO-MI-036), mientras que Compras los re-evalúa bajo criterios comerciales y documentales de forma paralela y en formatos distintos (FR-PA-GDC-003).",
            solucion: "1. Alimentar NotebookLM con los Acuerdos de Nivel de Servicio (SLA) técnicos y el Manual de Proveedores. 2. Usar Gemini en Workspace para escanear y cruzar la factura (tiempo y costo - Compras) con el reporte de trabajo (Mantenimiento). Gemini calcula y actualiza automáticamente la calificación integral del proveedor en un solo formato unificado."
        },
        {
            areas: "Procesos y Gestión Documental",
            tipo: "Tarea Duplicada (Bases de datos paralelas)",
            problema: "Doble Control Documental: Gestión Documental administra el archivo físico y Tiempos de Retención (MA-PM-GD-001), mientras que Procesos aprueba los documentos del SGI (FR-PM-SGI-012). Ambos mantienen listados maestros paralelos que se desactualizan entre sí.",
            solucion: "1. Subir la Tabla de Retención Documental y la norma ISO a NotebookLM. 2. Automatizar con Gemini: cuando Procesos aprueba la creación/modificación de un documento, Gemini actualiza automáticamente los metadatos en el Listado Maestro y alerta a Gestión Documental sobre su fecha de destrucción legal, manteniendo una única fuente de verdad."
        },
        {
            areas: "Procesos, Ambiental, SST, Inocuidad y Mantenimiento",
            tipo: "Tarea Duplicada (Múltiples hallazgos sobre el mismo evento)",
            problema: "Inspecciones en Planta: Cada área realiza recorridos por las líneas de producción con listas de chequeo independientes (Ambiental, SST, Calidad, SGI), levantando múltiples planes de acción sobre las mismas máquinas (ej. una gotera afecta inocuidad, SST y ambiente).",
            solucion: "1. Unificar normativas (ISO 14001, 45001, IFS) en NotebookLM. 2. Desarrollar una \"Lista de Chequeo Maestra\" asistida por Gemini. Durante el recorrido, el auditor describe/fotografía un hallazgo; Gemini clasifica el riesgo simultáneamente para las normativas afectadas y abre un único ACPM (Acción Correctiva) centralizado para Mantenimiento."
        },
        {
            areas: "Mercadeo, Ventas, Cartera (Créditos) y Control de Calidad",
            tipo: "Conexión Oculta (Brecha de comunicación y flujo de datos)",
            problema: "Manejo de PQR y Conciliación de Descuentos en Cadenas: Ventas descarga el descuento/PQR del portal de la cadena (Éxito, Cencosud), Calidad investiga técnicamente la falla en planta, pero Cartera debe adivinar o rastrear manualemente los saldos y motivos técnicos para aprobar la nota crédito.",
            solucion: "1. Cargar políticas comerciales y Acuerdos de Cadenas (SLA) en NotebookLM. 2. Cuando Ventas recibe la queja, Gemini busca el lote en los registros de Producción, extrae el dictamen de Calidad, determina automáticamente si el fallo ampara el descuento comercial, y redacta el informe consolidado para que Cartera legalice el pago en el sistema."
        },
        {
            areas: "Contabilidad, Almacenes MP/PT, Mantenimiento, Revisoría Fiscal y Producción",
            tipo: "Conexión Oculta (Silos de información durante la ejecución)",
            problema: "Ejecución de Inventarios Físicos: Almacenes y Producción cuentan en planta a mano (palm/papel), Contabilidad hace el cruce lógico en su oficina, y Revisoría Fiscal hace el \"acompañamiento\" visual. La data no viaja en tiempo real, requiriendo re-digitación posterior para ajustes (IN-PO-APT-007).",
            solucion: "1. Cargar políticas de inventario y castigos contables en NotebookLM. 2. Dotar a auditores con tablets + Gemini Vision. Al escanear los productos físicos, Gemini concilia en tiempo real contra la base de datos (Putty/MIDAS). 3. Las diferencias alertan de inmediato a Revisoría y Contabilidad en un dashboard en Sheets, eliminando la transcripción de papel y el reproceso de validación."
        }
    ],
    tabla4: [
        { area: "Inteligencia de Negocios", paso: "Análisis Conversacional de Datos", tarea: "Exploración de bases de datos de ventas, márgenes de contribución o inventarios mediante preguntas en lenguaje natural, sin necesidad de saber programar fórmulas o SQL.", herramienta: "Gemini in Looker Studio", beneficio: "Democratiza el acceso a los datos. Un gerente puede preguntar simplemente: \"¿Cuál es la tendencia de ingresos totales por mes del producto X?\" y la IA genera visualizaciones y respuestas al instante para la toma de decisiones." },
        { area: "Comunicaciones y Marketing", paso: "Creación y Edición de Contenido en Video", tarea: "Producción de videos corporativos, de capacitación para operarios en planta o de campañas de mercadeo a partir de un documento de texto o guion.", herramienta: "Google Vids", beneficio: "Acelera la creación de material audiovisual con avatares de IA, locuciones (voz en off) y recortes automáticos, permitiendo contar historias corporativas de calidad sin necesidad de un equipo complejo de edición." },
        { area: "Ventas", paso: "Generación de Materiales de Presentación y Personalización", tarea: "Creación de materiales de ventas de alta calidad y redacción de correos de prospección adaptados al perfil del cliente para acortar el ciclo de ventas.", herramienta: "Gemini for Workspace (Docs / Slides)", beneficio: "Ayuda a resumir largos hilos de comunicación con clientes para identificar objeciones clave y generar propuestas comerciales a la medida en presentaciones (Slides) en segundos." },
        { area: "Tecnología", paso: "Asistencia y Optimización de Código", tarea: "Generación de código de alta calidad, depuración, automatización de pruebas y optimización de sistemas heredados (Legacy) que maneja el equipo de TI.", herramienta: "Gemini Code Assist", beneficio: "Reduce la deuda técnica del equipo de sistemas y libera a los desarrolladores de tareas rutinarias de programación para que se enfoquen en la innovación y mejora de los aplicativos internos." },
        { area: "Recursos Humanos", paso: "Aceleración del Reclutamiento Estratégico", tarea: "Redacción automática de descripciones de puestos de trabajo atractivas, generación de preguntas específicas para entrevistas técnicas y creación de manuales de onboarding.", herramienta: "Gemini for Workspace", beneficio: "Acelera el proceso de contratación y permite crear materiales de formación escalables para que los nuevos empleados se integren más rápido a sus funciones." },
        { area: "Gestión de Proyectos", paso: "Automatización de Flujos de Trabajo Agénticos", tarea: "Creación de un flujo continuo donde se centraliza la investigación, se razona y se automatiza la entrega de reportes sin intervención manual.", herramienta: "NotebookLM + Gemini + Workspace Studio", beneficio: "Permite crear sistemas automatizados. Por ejemplo: NotebookLM analiza datos semanales, Gemini redacta el resumen de tendencias y Workspace Studio construye un tablero que se actualiza automáticamente y se envía a los gerentes." },
        { area: "Marketing", paso: "Redacción de Respuestas y Contenido de Marca Multicanal", tarea: "Generación de respuestas personalizadas a consultas de clientes basadas en una base de conocimientos propia, y redacción de copys para redes sociales o boletines.", herramienta: "NotebookLM + Gemini for Workspace", beneficio: "Minimiza los tiempos de respuesta al cliente asegurando coherencia corporativa, y permite al equipo de mercadeo ejecutar campañas multicanal de forma ágil extrayendo ideas de las especificaciones del producto." }
    ]
};

const categorias = [
    { id: 'tabla1', title: "Estado Actual de Proyectos", subtitle: "Mapeados y Trabajando", icon: <LayoutDashboard size={32} />, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { id: 'tabla2', title: "Nuevas Oportunidades IA", subtitle: "Escenario 3 - Análisis Exhaustivo", icon: <BrainCircuit size={32} />, color: "bg-purple-50 text-purple-600 border-purple-200" },
    { id: 'tabla3', title: "Conexiones Ocultas", subtitle: "Arquitectura de Solución Técnica", icon: <Network size={32} />, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { id: 'tabla4', title: "Procesos Adicionales", subtitle: "Mejorables con IA (No Mapeados)", icon: <Lightbulb size={32} />, color: "bg-orange-50 text-orange-600 border-orange-200" }
];

export default function App() {
    const [activeTab, setActiveTab] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    // Estado para controlar qué áreas están expandidas (solo aplica para tablas agrupadas)
    const [expandedAreas, setExpandedAreas] = useState({});

    // Función para abrir/cerrar un área
    const toggleArea = (area) => {
        setExpandedAreas(prev => ({
            ...prev,
            [area]: !prev[area]
        }));
    };

    // Funciones de ayuda para estilos visuales
    const getStatusColor = (rawEstado) => {
        const estado = rawEstado ? rawEstado.split('/')[0].trim() : '';

        switch (estado) {
            case 'Productivo': return 'bg-green-100 text-green-700 border-green-200';
            case 'En_Desarrollo': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'En_Investigación': return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'Nuevo': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const formatText = (text) => text ? text.replace(/_/g, ' ') : '';

    // Filtro de búsqueda
    const getFilteredData = () => {
        if (!activeTab) return [];
        const currentData = data[activeTab];
        if (!searchTerm) return currentData;

        const lowerTerm = searchTerm.toLowerCase();
        return currentData.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(lowerTerm)
            )
        );
    };

    // Renderizador de Tarjetas
    const renderCardContent = (item, index) => {
        if (activeTab === 'tabla1') {
            return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full uppercase tracking-wider">{item.area}</span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.estado)}`}>
                            {formatText(item.estado)}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{item.proyecto}</h3>
                    <div className="flex items-start text-sm text-gray-600 mt-4">
                        <Target size={16} className="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                        <p><strong>Paso Matriz:</strong> {item.paso}</p>
                    </div>
                </div>
            );
        }

        if (activeTab === 'tabla2' || activeTab === 'tabla4') {
            return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col h-full">
                    <div className="mb-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full uppercase tracking-wider">{item.area}</span>
                    </div>
                    <h3 className="text-md font-bold text-gray-800 mb-3">{item.paso}</h3>

                    <div className="space-y-3 flex-grow">
                        <div className="bg-gray-50 p-3 rounded-lg text-sm border border-gray-100">
                            <span className="text-gray-500 text-xs uppercase font-bold block mb-1">
                                {activeTab === 'tabla4' ? 'Caso de Uso' : 'Tarea Actual'}
                            </span>
                            {item.tarea}
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-sm border border-purple-100">
                            <span className="text-purple-500 text-xs uppercase font-bold block mb-1">Beneficio con IA</span>
                            {item.beneficio}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
                        <Wrench size={16} className="text-indigo-500 mr-2" />
                        <span className="text-sm font-medium text-indigo-700">{item.herramienta}</span>
                    </div>
                </div>
            );
        }

        if (activeTab === 'tabla3') {
            // Extraemos el título negrita si está presente (antes de los dos puntos)
            const hasTitle = item.problema.includes(':');
            const title = hasTitle ? item.problema.split(':')[0] : "Conexión Oculta";
            const description = hasTitle ? item.problema.substring(item.problema.indexOf(':') + 1).trim() : item.problema;

            return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-indigo-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 border-b border-gray-100 pb-4 gap-3">
                        <div className="text-indigo-600 font-bold tracking-wider text-xs flex items-center flex-wrap gap-2">
                            <Network size={16} className="flex-shrink-0" />
                            <span>{item.areas}</span>
                        </div>
                        <span className="bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
                            {item.tipo}
                        </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>

                    <div className="bg-indigo-50/80 p-5 rounded-xl border border-indigo-100">
                        <span className="text-indigo-800 text-xs uppercase font-bold block mb-3 flex items-center">
                            <BrainCircuit size={18} className="mr-2" />
                            Arquitectura de Solución (Gemini + NotebookLM)
                        </span>
                        <p className="text-sm font-medium text-indigo-900 leading-relaxed">
                            {item.solucion}
                        </p>
                    </div>
                </div>
            );
        }
    };

    // --- VISTA PRINCIPAL (DASHBOARD) ---
    if (!activeTab) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Centro de Inteligencia de Procesos</h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Selecciona una matriz para explorar las iniciativas, herramientas y oportunidades de automatización con IA mapeadas en la organización.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {categorias.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveTab(cat.id);
                                    setExpandedAreas({}); // Resetear acordeones al cambiar de matriz
                                }}
                                className={`text-left flex items-start p-8 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl bg-white ${cat.color.replace('bg-', 'hover:bg-').replace('text-', 'border-transparent hover:border-')}`}
                                style={{ borderColor: 'transparent' }}
                            >
                                <div className={`p-4 rounded-xl mr-6 flex-shrink-0 ${cat.color.split(' ')[0]} ${cat.color.split(' ')[1]}`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{cat.title}</h2>
                                    <p className="text-slate-500">{cat.subtitle}</p>
                                    <div className="mt-4 text-sm font-semibold flex items-center text-slate-400 group-hover:text-slate-700 transition-colors">
                                        Explorar <ArrowLeft size={16} className="ml-1 rotate-180" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- VISTA DE DETALLE (TARJETAS) ---
    const activeCategory = categorias.find(c => c.id === activeTab);
    const filteredData = getFilteredData();

    // Agrupar datos por área (solo lo usaremos si NO es la tabla 3)
    const groupedData = filteredData.reduce((acc, item) => {
        const area = item.area || 'General';
        if (!acc[area]) acc[area] = [];
        acc[area].push(item);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Cabecera de la vista de detalle */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => { setActiveTab(null); setSearchTerm(""); setExpandedAreas({}); }}
                            className="p-2 mr-4 bg-white border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                            title="Volver al menú principal"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                                {activeCategory.icon} <span className="ml-3">{activeCategory.title}</span>
                            </h1>
                            <p className="text-gray-500 mt-1">{activeCategory.subtitle}</p>
                        </div>
                    </div>

                    {/* Buscador */}
                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por área, herramienta..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Lógica de Renderizado según la Matriz Seleccionada */}
                {filteredData.length > 0 ? (

                    activeTab === 'tabla3' ? (
                        // --- VISTA PLANA PARA TABLA 3 (Conexiones Ocultas) ---
                        <div className="grid grid-cols-1 gap-6">
                            {filteredData.map((item, index) => renderCardContent(item, index))}
                        </div>
                    ) : (
                        // --- VISTA ACORDEONES PARA EL RESTO DE TABLAS ---
                        <div className="space-y-6">
                            {Object.entries(groupedData).map(([area, items]) => {
                                // Si hay texto en el buscador, forzamos a que el acordeón esté abierto.
                                // De lo contrario, leemos el estado (por defecto cerrado/falso).
                                const isExpanded = searchTerm.length > 0 ? true : !!expandedAreas[area];

                                return (
                                    <div key={area} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                        <button
                                            onClick={() => toggleArea(area)}
                                            className="w-full text-left px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center mr-4 text-sm font-bold">
                                                    {items.length}
                                                </span>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    {area}
                                                </h2>
                                            </div>
                                            <div className="text-slate-400">
                                                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                            </div>
                                        </button>

                                        {isExpanded && (
                                            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                                                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                                    {items.map((item, index) => renderCardContent(item, `${area}-${index}`))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )

                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <Search size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron resultados</h3>
                        <p className="text-gray-500">Intenta con otros términos de búsqueda.</p>
                    </div>
                )}

            </div>
        </div>
    );
}