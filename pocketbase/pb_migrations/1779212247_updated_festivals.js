/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "deleteRule": "created_by = @request.auth.id || @request.auth.role = \"admin\"",
    "listRule": "created_by = @request.auth.id || @request.auth.role = \"admin\"",
    "updateRule": "created_by = @request.auth.id || @request.auth.role = \"admin\"",
    "viewRule": "created_by = @request.auth.id || @request.auth.role = \"admin\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "deleteRule": "created_by = @request.auth.id",
    "listRule": "created_by = @request.auth.id",
    "updateRule": "created_by = @request.auth.id",
    "viewRule": "created_by = @request.auth.id"
  }, collection)

  return app.save(collection)
})
