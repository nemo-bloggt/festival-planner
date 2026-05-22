/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" &&\nfestival_members_via_festival.person = @request.auth.person &&\nfestival_members_via_festival.role = \"admin\""
  }, collection)

  return app.save(collection)
})
