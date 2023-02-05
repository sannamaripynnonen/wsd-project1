import { serve } from "./deps.js";
import { renderFile } from "./deps.js";
import { configure } from "./deps.js";
import * as listService from "./services/listService.js";
import * as itemService from "./services/itemService.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
}); 

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  const url = new URL(request.url);

  const data = {
  lists: await listService.countShoppingLists(),
  items: await itemService.countShoppingListItems(),
  }
  
  if (url.pathname == '/' && request.method === 'GET') {
    return new Response(await renderFile("main.eta", data), responseDetails);
  } else if (url.pathname == '/lists' && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname == '/lists' && request.method === "GET") {
    return await listController.viewLists();
  } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemController.markCollected(request);
  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.addItemToList(request);
  } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
