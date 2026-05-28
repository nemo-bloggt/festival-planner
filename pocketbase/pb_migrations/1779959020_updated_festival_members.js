/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "listRule": "festival.festival_members_via_festival.person = @request.auth.person\n&&\nfestival.festival_members_via_festival.role = \"festival_admin\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" &&\nperson = @request.auth.person"
  }, collection)

  return app.save(collection)
})
