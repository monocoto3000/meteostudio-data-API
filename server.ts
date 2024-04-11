import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './src/infrastructure/routes';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use('/data', routes);
app.use('*', (req: Request, res: Response) => {
  res.status(404).send('not found');
});



app.listen(3001, () => {
  console.log('Server running on port 3001');
});