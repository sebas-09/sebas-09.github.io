const email = "sebas.tian5@live.com";
const cases = {
  tesis: {
    category: "Proyecto de titulación · Desarrollo individual",
    title: "Tutor virtual con IA en Second Life",
    lead: "Un mismo entorno para consultar información y aprender con acompañamiento.",
    image: "assets/arquitectura-tutor.svg",
    alt: "Arquitectura del proyecto de titulación.",
    sections: [
      ["El problema", "Una conversación informativa y una sesión de aprendizaje tienen necesidades diferentes. El proyecto reúne ambos modos dentro de un mundo virtual."],
      ["Mi aporte", "Desarrollé los cuatro componentes: el puente C#/.NET que interactúa con Second Life, el orquestador Python, el tutor informativo con RAG y el tutor de clases con persistencia."],
      ["Cómo funciona", "El orquestador dirige cada conversación al tutor correspondiente. El modo informativo recupera contexto con FAISS y genera respuestas con Gemini. El modo de clases recoge nivel y objetivo, organiza la tutoría y conserva su estado con SQLAlchemy y MySQL."],
      ["Decisiones técnicas", "Separación de responsabilidades, control de reintentos y tiempos de espera, límites por sesión y adaptación de mensajes a las restricciones del chat de Second Life."],
    ],
    tech: "Python · Flask · Gemini · FAISS · MySQL · SQLAlchemy · C# · .NET 8 · LibreMetaverse",
    note: "El esquema muestra la arquitectura; no es una captura del mundo virtual. El código de la tesis no está publicado."
  },
  chat: {
    category: "Aplicación web · Desarrollo individual",
    title: "Conversaciones en tiempo real",
    lead: "Mensajes y presencia compartida entre usuarios, con comunicación bidireccional.",
    image: "assets/chat-real.png",
    alt: "Captura real del chat desarrollado.",
    sections: [
      ["Mi aporte", "Desarrollé el cliente React y el backend Spring Boot para una aplicación de mensajería grupal mediante WebSockets/STOMP."],
      ["Cómo funciona", "Cada conexión registra un alias. El servidor distribuye los mensajes y actualiza la presencia al entrar, salir o cerrar la pestaña."],
      ["Qué está comprobado", "Entrega de mensajes entre dos usuarios, rechazo de nombres duplicados y liberación del alias al cerrar la conexión. La preparación incluye pruebas del ciclo de conexión y validación en escritorio y móvil."],
      ["Alcance", "Chat grupal con estado en memoria. Esta versión no incorpora cuentas, historial persistente ni salas privadas."]
    ],
    tech: "Java · Spring Boot · React · STOMP · SockJS",
    code: "https://github.com/sebas-09/chat-tiempo-real"
  },
  ecovida: {
    category: "E-commerce · Adaptación individual de una base abierta",
    title: "ECOVIDA",
    lead: "Una plataforma de comercio electrónico organizada en servicios independientes.",
    image: "assets/ecovida-real.png",
    alt: "Interfaz real de ECOVIDA; API de catalogo simulada para la captura.",
    sections: [
      ["Mi aporte", "Adapté una base de referencia para ECOVIDA y realicé modificaciones e integración de ejecución con Docker. La arquitectura y el código base mantienen su autoría original."],
      ["Cómo está organizado", "React para la interfaz, API Gateway y Eureka para el acceso y descubrimiento, servicios Spring Boot por dominio y MongoDB para persistencia."],
      ["Qué está comprobado", "La copia de preparación compila sus nueve componentes Java y el frontend. Se comprobaron la carga de formularios, sus validaciones y la navegación entre ingreso y registro."],
      ["Origen y alcance", "La base identificada es Fullstack-E-commerce-web-application, de Dharshi Balasubramaniyam, con licencia Apache 2.0. La compra completa y el despliegue integral actual no se presentan como verificados."]
    ],
    tech: "Java · Spring Boot · React · MongoDB · Eureka · Docker",
    code: "https://github.com/sebas-09/e-commerce-microservicios",
    reference: "https://github.com/DharshiBalasubramaniyam/Fullstack-E-commerce-web-application",
    note: "La captura muestra la interfaz real con la API de catálogo simulada. El repositorio público conserva la versión histórica; las mejoras de la copia local aún no están incorporadas allí."
  }
};
const dialog = document.querySelector("#project-dialog");
const content = document.querySelector("#dialog-content");
const category = document.querySelector("#dialog-category");
function openCase(id) {
  const item = cases[id];
  if (!item) return;
  category.textContent = item.category;
  content.replaceChildren();
  const heading = document.createElement("h2"); heading.id = "dialog-title"; heading.textContent = item.title;
  const lead = document.createElement("p"); lead.className = "case-lead"; lead.textContent = item.lead;
  const image = document.createElement("img"); image.className = "case-visual"; image.src = item.image; image.alt = item.alt;
  content.append(heading, lead, image);
  for (const [title, text] of item.sections) {
    const section = document.createElement("section"); section.className = "case-section";
    const h3 = document.createElement("h3"); h3.textContent = title;
    const p = document.createElement("p"); p.textContent = text; section.append(h3, p); content.append(section);
  }
  const tech = document.createElement("p"); tech.className = "case-note"; tech.textContent = item.tech; content.append(tech);
  const actions = document.createElement("div"); actions.className = "case-actions";
  if (item.code) {
    const link = document.createElement("a"); link.href = item.code; link.target = "_blank"; link.rel = "noopener noreferrer";
    link.className = "button button-primary"; link.textContent = "Ver código ↗"; actions.append(link);
  }
  if (item.reference) {
    const link = document.createElement("a"); link.href = item.reference; link.target = "_blank"; link.rel = "noopener noreferrer";
    link.className = "text-link"; link.textContent = "Proyecto de referencia ↗"; actions.append(link);
  }
  if (actions.childElementCount) content.append(actions);
  if (item.note) { const note = document.createElement("p"); note.className = "case-note"; note.textContent = item.note; content.append(note); }
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("dialog-open");
}
document.querySelectorAll(".project-open").forEach(button => button.addEventListener("click", () => openCase(button.dataset.project)));
document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
const menu = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".navigation");
function closeMenu() { menu.setAttribute("aria-expanded", "false"); navigation.dataset.open = "false"; menu.querySelector("span").textContent = "+"; }
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open)); navigation.dataset.open = String(open);
  menu.querySelector("span").textContent = open ? "−" : "+";
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
document.querySelector("#copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try { await navigator.clipboard.writeText(email); status.textContent = "Correo copiado"; }
  catch { status.textContent = email; }
});
