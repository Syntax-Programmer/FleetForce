/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3935567112")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_JSHzqr8zo9` ON `vehicles` (`vechicleNumber`)"
    ],
    "name": "vehicles"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3935567112")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_JSHzqr8zo9` ON `vechicles` (`vechicleNumber`)"
    ],
    "name": "vechicles"
  }, collection)

  return app.save(collection)
})
