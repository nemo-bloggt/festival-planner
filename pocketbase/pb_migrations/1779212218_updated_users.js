/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "select2375276105",
    "maxSelect": 0,
    "name": "user",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "user",
      "admin"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("select2375276105")

  return app.save(collection)
})
