var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var RoomService = require("../services/RoomService");
var db = require("../models");
var roomService = new RoomService(db);

/* GET room listing. */
router.get("/:hotelId", async function (req, res, next) {
  const rooms = await roomService.getHotelRooms(req.params.hotelId);
  rooms.map(
    (room) =>
      (room.Users = room.Users.filter((user) => user.id == 1).length > 0)
  );
  res.render("rooms", { rooms: rooms });
});

/* GET rooms listing. */
router.get("/", async function (req, res, next) {
  const rooms = await roomService.get();
  rooms.map(
    (room) =>
      (room.Users = room.Users.filter((user) => user.id == 1).length > 0)
  );
  res.render("rooms", { rooms: rooms });
});

/* POST rooms listing. */
router.post("/", jsonParser, async function (req, res, next) {
  let Capacity = req.body.Capacity;
  let PricePerDay = req.body.PricePerDay;
  let HotelId = req.body.HotelId;
  await roomService.create(Capacity, PricePerDay, HotelId);
  res.end();
});

/* POST reservations listing. */
router.post("/reservation", jsonParser, async function (req, res, next) {
  let userId = req.body.UserId;
  let roomId = req.body.RoomId;
  let startDate = req.body.StartDate;
  let endDate = req.body.EndDate;
  await roomService.rentARoom(userId, roomId, startDate, endDate);
  res.end();
});

/* DELETE rooms listing. */
router.delete("/", jsonParser, async function (req, res, next) {
  let id = req.body.id;
  await roomService.deleteRoom(id);
  res.end();
});

module.exports = router;
