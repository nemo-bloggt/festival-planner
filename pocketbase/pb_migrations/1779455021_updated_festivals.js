/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id &&\n@collection.festival_members.person ?= @request.auth.person &&\n@collection.festival_members.role ?= \"admin\""
  }, collection)

  return app.save(collection)
})
