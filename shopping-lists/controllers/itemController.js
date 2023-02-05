import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addItemToList =  async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split('/');

    const listId = urlParts[2];

    const formData = await request.formData();
    const item = formData.get('item');

    await itemService.addItemToList(listId, item);
    console.log(`Added ${item} to shopping list`);

    return requestUtils.redirectTo(`/lists/${ listId }`);
}

const markCollected = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split('/');
    
    const listId = urlParts[2];
    const itemId = urlParts[4];
    
    await itemService.collectById(itemId);
    console.log('Item collected');

    return requestUtils.redirectTo(`/lists/${ listId }`);

}

export { addItemToList, markCollected }