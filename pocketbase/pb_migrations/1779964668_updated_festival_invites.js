/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_821358072")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_n8y1gsi02r` ON `festival_invites` (`token`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_821358072")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
