import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Upload directory path
const uploadDir = join(__dirname, 'uploads');

// Cleanup function
async function cleanupUploads() {
  try {
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      return;
    }

    // Read and delete all files in the uploads directory
    const files = await fs.promises.readdir(uploadDir);
    const deletePromises = files.map(file =>
      fs.promises.unlink(join(uploadDir, file))
    );
    
    await Promise.all(deletePromises);
    console.log('Upload directory cleaned successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    path: req.file.path,
    filename: req.file.filename
  });
});

// Delete file endpoint
app.delete('/api/files/:filename', (req, res) => {
  const filePath = join(uploadDir, req.params.filename);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file' });
  }
});

// Cleanup endpoint for page unload/reload
app.post('/api/cleanup', async (req, res) => {
  try {
    await cleanupUploads();
    res.json({ message: 'Cleanup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error during cleanup' });
  }
});

// Initial cleanup when server starts
cleanupUploads().then(() => {
  app.listen(port, () => {
    console.log(`File server running at http://localhost:${port}`);
  });
});

