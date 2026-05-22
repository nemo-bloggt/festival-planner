/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "name": "festival_members"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4185819925")

  // update collection data
  unmarshal({
    "name": "festival_member"
  }, collection)

  return app.save(collection)
})
