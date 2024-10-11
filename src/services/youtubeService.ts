import { google } from 'googleapis';
import fs from 'fs';

const youtube = google.youtube('v3');

export class YouTubeService {
  private auth: any;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/your/credentials.json',
      scopes: ['https://www.googleapis.com/auth/youtube.upload'],
    });
  }

  async uploadVideo(filePath: string, title: string, description: string): Promise<string> {
    const fileSize = fs.statSync(filePath).size;

    const res = await youtube.videos.insert(
      {
        auth: this.auth,
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title,
            description,
          },
          status: {
            privacyStatus: 'unlisted',
          },
        },
        media: {
          body: fs.createReadStream(filePath),
        },
      },
      {
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / fileSize) * 100;
          console.log(`${progress.toFixed(2)}% complete`);
        },
      }
    );

    return `https://www.youtube.com/watch?v=${res.data.id}`;
  }
}