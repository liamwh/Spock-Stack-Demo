migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k0sxy0j9pdmnd4l")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k0sxy0j9pdmnd4l")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
