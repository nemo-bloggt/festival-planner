/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id &&\n@collection.festival_members.person ?= @request.auth.person &&\n@collection.festival_members.role ?= \"festival_admin\"",
    "listRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id &&\n@collection.festival_members.person ?= @request.auth.person",
    "updateRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id &&\n@collection.festival_members.person ?= @request.auth.person &&\n@collection.festival_members.role ?= \"festival_admin\"",
    "viewRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= id &&\n@collection.festival_members.person ?= @request.auth.person"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\"",
    "listRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
})
