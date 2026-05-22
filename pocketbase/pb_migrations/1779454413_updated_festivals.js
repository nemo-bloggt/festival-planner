/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" &&\nfestival_members_via_festival.person = @request.auth.person",
    "viewRule": "@request.auth.id != \"\" &&\nfestival_members_via_festival.person = @request.auth.person"
  }, collection)

  return app.save(collection)
})
