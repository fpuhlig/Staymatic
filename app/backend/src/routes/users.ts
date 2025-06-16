import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Users endpoint' });
});

export default router; 