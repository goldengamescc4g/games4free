import ajaxConteudo from "./modules/ajaxConteudo.js";
import ajaxModal from "./modules/ajaxModal.js";
import filtroMobile from "./modules/filtroMobile.js";
import translateContent from "./modules/translateContent.js";

await ajaxConteudo();
await ajaxModal();
await filtroMobile();
// await translateContent();