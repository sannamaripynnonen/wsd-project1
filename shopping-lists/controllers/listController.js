import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get('name');

    await listService.create(name);
    console.log(`Added shopping list ${ name }`);

    return requestUtils.redirectTo('/lists');
}

 const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split('/');
    const listId = urlParts[2];

    await listService.deactivateById(listId);
    console.log('Shopping list deactivated.');

    return await requestUtils.redirectTo('/lists');
}

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split('/');

    const listId = urlParts[2]

    const data = {
        list: await listService.findById(listId),
        itemsUncollected: await itemService.findItems(listId, false),
        itemsCollected: await itemService.findItems(listId, true),
    };
    console.log(`Viewing list ${data.list.name}`);

    return new Response(await renderFile('list.eta', data), responseDetails);
}

const viewLists = async () => {
    const data = {
        lists: await listService.findAllActive(),
    };
    console.log('Viewing all active shopping lists');

    return new Response(await renderFile("lists.eta", data), responseDetails);
}

export { addList, deactivateList, viewList, viewLists }