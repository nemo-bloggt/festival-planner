/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3346940990",
        "help": "",
        "hidden": false,
        "id": "relation1841317061",
        "maxSelect": 0,
        "minSelect": 0,
        "name": "group",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_520427368",
        "help": "",
        "hidden": false,
        "id": "relation291929305",
        "maxSelect": 0,
        "minSelect": 0,
        "name": "driver",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "convertURLs": false,
        "help": "",
        "hidden": false,
        "id": "editor1558673899",
        "maxSize": 0,
        "name": "depature_location",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "editor"
      },
      {
        "help": "",
        "hidden": false,
        "id": "date850546935",
        "max": "",
        "min": "",
        "name": "departuer_time",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number2492022295",
        "max": null,
        "min": null,
        "name": "available_seats",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "convertURLs": false,
        "help": "",
        "hidden": false,
        "id": "editor18589324",
        "maxSize": 0,
        "name": "notes",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "editor"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_3380298777",
    "indexes": [],
    "listRule": null,
    "name": "carpools",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3380298777");

  return app.delete(collection);
})
