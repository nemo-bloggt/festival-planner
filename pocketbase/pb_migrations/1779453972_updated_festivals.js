/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" &&\nfestival_members_via_festival.person.user = @request.auth.id &&\nfestival_members_via_festival.role = \"admin\"",
    "listRule": "@request.auth.id != \"\" &&\nfestival_members_via_festival.person.user = @request.auth.id &&\nfestival_members_via_festival.role = \"admin\"",
    "updateRule": "@request.auth.id != \"\" &&\nfestival_members_via_festival.person.user = @request.auth.id &&\nfestival_members_via_festival.role = \"admin\"",
    "viewRule": "@request.auth.id != \"\" &&\nfestival_members_via_festival.person.user = @request.auth.id &&\nfestival_members_via_festival.role = \"admin\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947130592")

  // update collection data
  unmarshal({
    "deleteRule": "created_by = @request.auth.id || @request.auth.role = \"admin\"",
    "listRule": "@request.auth.id != \"\"",
    "updateRule": "created_by = @request.auth.id || @request.auth.role = \"admin\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
})
