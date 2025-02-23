import VideoCard from '../components/videoCard.jsx'
import videos from "../data/videos.js";


const VideoPage = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Trending Videos</h1>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default VideoPage;
