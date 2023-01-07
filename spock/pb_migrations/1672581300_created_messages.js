migrate((db) => {
  const collection = new Collection({
    "id": "k0sxy0j9pdmnd4l",
    "created": "2023-01-01 13:55:00.986Z",
    "updated": "2023-01-01 13:55:00.986Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "m2ygetqf",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 250,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ampuvnhb",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k0sxy0j9pdmnd4l");

  return dao.deleteCollection(collection);
})
