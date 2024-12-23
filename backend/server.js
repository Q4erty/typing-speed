import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routers/authRouter.js';
import resultsRouter from './routers/resultsRouter.js'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/profile', resultsRouter);

async function main() {
	try {
    await mongoose.connect(process.env.DATABASE_URL);
    
    app.listen(PORT, () => {
      console.log(`Server is running`);
    });
  } catch (error) {
    console.error(error);
  };
};

main();