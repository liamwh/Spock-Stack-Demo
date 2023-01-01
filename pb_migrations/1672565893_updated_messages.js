migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m26oz6j80nvil53")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gizicpii",
    "name": "text",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 255,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m26oz6j80nvil53")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gizicpii",
    "name": "text",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 255,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
