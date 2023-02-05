import { sql } from "../database/database.js";

const addItemToList = async (listId, item) => {
   await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${ listId }, ${ item })`;
}

const countShoppingListItems = async () => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;
     if (rows[0].count == null) {
        return 0;
     } else {
        return rows[0].count;
     }
}

const findItems = async (listId, collected) => {
   return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ listId } AND collected = ${ collected } ORDER BY name`;
}

const collectById = async (itemId) => {
   return await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ itemId }`;
}

export { addItemToList, countShoppingListItems, findItems, collectById }