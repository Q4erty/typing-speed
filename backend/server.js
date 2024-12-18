import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routers/authRouter.js';
import resultsRouter from './routers/resultsRouter.js'
import cors from 'cors';

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors());
app.use(express.json())
app.use('/auth', authRouter)
app.use('/profile', resultsRouter)

async function main() {
	try {
    await mongoose.connect('mongodb+srv://nurtas:nurtas05@final-project.sj4v4.mongodb.net/final-project?retryWrites=true&w=majority&appName=final-project');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();