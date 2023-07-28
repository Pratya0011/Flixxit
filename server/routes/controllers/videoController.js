import axios from 'axios'
import rangeParser from 'range-parser';
import content from '../../model/contentList.js';


export const videoStream = async (req,res)=>{
    const {contentId} = req.params
    try{
        const video = await content.findById(contentId)
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
          }
          const videoUrl = video.media_url
          const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });
          const videoSize = parseInt(videoResponse.headers['content-length']);
          const videoRange = req.headers.range;
          const positions = rangeParser(videoSize, videoRange, { combine: true });
          const start = positions[0].start;
          const end = positions[0].end;
          const contentLength = end - start + 1;

          const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
          };

          res.writeHead(206, headers);

          videoResponse.data.pipe(res);
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch video' })
    }
}