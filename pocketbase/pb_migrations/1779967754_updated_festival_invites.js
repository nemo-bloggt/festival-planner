/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_821358072")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_821358072")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" &&\nfestival.festival_members_via_festival.person.user = @request.auth.id &&\nfestival.festival_members_via_festival.role = \"festival_admin\""
  }, collection)

  return app.save(collection)
})
