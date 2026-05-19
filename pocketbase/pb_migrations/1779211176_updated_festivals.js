/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "created_by = @request.auth.id",
    "listRule": "created_by = @request.auth.id",
    "updateRule": "created_by = @request.auth.id",
    "viewRule": "created_by = @request.auth.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "relation3725765462",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "created_by",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": "",
    "updateRule": null,
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("relation3725765462")

  return app.save(collection)
})
