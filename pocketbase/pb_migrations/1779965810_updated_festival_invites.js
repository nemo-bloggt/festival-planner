/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_821358072")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_821358072")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" && festival.festival_members_via_festival.person.user = @request.auth.id && festival.festival_members_via_festival.role = \"festival_admin\"",
    "viewRule": "@request.auth.id != \"\" && active = true"
  }, collection)

  return app.save(collection)
})
