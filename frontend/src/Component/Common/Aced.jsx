import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Jason Ogasian",
    location: "Manaslu Circuit Trek",

    embedUrl: "https://www.youtube.com/embed/bFy6jTEHlzQ?autoplay=1",
    thumbnail: "https://i.ytimg.com/vi/bFy6jTEHlzQ/maxresdefault.jpg",
  },
  {
    id: 2,
    name: "Simon & Group",
    location: "Annapurna Base Camp Trek",
    embedUrl: "https://www.youtube.com/embed/bFy6jTEHlzQ?autoplay=1",
    thumbnail: "https://i.ytimg.com/vi/bFy6jTEHlzQ/maxresdefault.jpg",
  },
  {
    id: 3,
    name: "Daroga Lal Yadav",
    location: "Everest Base Camp Trek",
    embedUrl: "https://www.youtube.com/embed/bFy6jTEHlzQ?autoplay=1",
    thumbnail: "https://i.ytimg.com/vi/bFy6jTEHlzQ/maxresdefault.jpg",
  },
  {
    id: 4,
    name: "Kaitlyn, Alexander, Miller, Aje...",
    location: "Everest Base Camp Trek",
    embedUrl: "https://www.youtube.com/embed/bFy6jTEHlzQ?autoplay=1",
    thumbnail: "https://i.ytimg.com/vi/bFy6jTEHlzQ/maxresdefault.jpg",
  },
];

const Aced = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="py-12 bg-white font-sans">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
          They Aced It!
          <span className="block w-16 h-1 bg-yellow-500 mx-auto mt-2"></span>
        </h2>
        <p className="text-gray-600 mt-4">
          Hear what our travelers have to say about their experience with Ace
          the Himalaya.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(item.embedUrl)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="bg-white/90 p-3 rounded-full shadow-lg">
                    <svg
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-bold text-gray-900 text-lg truncate px-2">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              className="absolute -top-10 right-0 text-white text-xl font-bold hover:text-gray-300"
              onClick={() => setSelectedVideo(null)}
            >
              Close ✕
            </button>
            <iframe
              src={selectedVideo}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aced;
