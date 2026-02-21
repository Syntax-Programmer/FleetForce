/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3935567112")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2455960015",
    "max": null,
    "min": null,
    "name": "totalKm",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3935567112")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2455960015",
    "max": null,
    "min": null,
    "name": "totalKm",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
