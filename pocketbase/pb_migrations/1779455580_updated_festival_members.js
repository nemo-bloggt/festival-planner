/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id &&\n@collection.festival_members.person ?= @request.auth.person",
    "viewRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id &&\n@collection.festival_members.person ?= @request.auth.person"
  }, collection)

  return app.save(collection)
})
