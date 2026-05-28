/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "viewRule": "@request.auth.id != \"\" &&\n@collection.festival_members.festival ?= festival &&\n@collection.festival_members.person ?= @request.auth.person &&\n@collection.festival_members.role ?= \"festival_admin\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "viewRule": "@request.auth.id != \"\" &&\nperson = @request.auth.person"
  }, collection)

  return app.save(collection)
})
