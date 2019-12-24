const express = require('express');
const {
  findAllEvents,
  addEvent,
  updateEvent,
  deleteEvent
} = require('./event.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.debug('Fetching all events...');
    const result = await findAllEvents();
    console.debug('Fetch successful', result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const {
    title,
    description,
    date
  } = req.body;

  try {
    console.debug(`Adding new event...`);
    const result = await addEvent(title, description, date);
    console.debug('Event successfully added', result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const options = req.body;
  try {
    console.debug(`Updating event ${id}...`);
    const result = await updateEvent(id, options);
    console.debug(`Event ${id} updated successfully.`);
    res.json(result);
  } catch (err) {
    console.error(`Event ${id} update failed!`);
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.debug(`delete event with id ${id}`);
    const result = await deleteEvent(id);
    console.debug(`delete successful`, result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;
