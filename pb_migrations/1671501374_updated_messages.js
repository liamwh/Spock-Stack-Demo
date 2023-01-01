migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m26oz6j80nvil53")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m26oz6j80nvil53")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
