import axios from 'axios';

const API_BASE_URL = 'http://localhost:8501';
const FILE_SERVER_URL = 'http://localhost:3001';

export async function uploadFile(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${FILE_SERVER_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.filename;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(filename: string): Promise<void> {
  try {
    await axios.delete(`${FILE_SERVER_URL}/api/files/${filename}`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

export async function sendMessage(message: string, sessionId: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, {
      message,
      session_id: sessionId,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export function getFileUrl(filename: string): string {
  return `${FILE_SERVER_URL}/uploads/${filename}`;
}