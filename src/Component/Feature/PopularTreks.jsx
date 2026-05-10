import TrekCard from "./TrekCard";

const PopularTreks = () => {
  const treks = [
    {
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
      category: "Standard",
      categoryColor: "bg-blue-400",
      duration: "14 Days",
      title: "Everest Base Camp Trek",
      price: "1,550",
      badge: true,
      features: [
        "Scenic flight to Lukla",
        "Helicopter Return not Included",
        "Standard accommodation in Kathmandu",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80",
      category: "Comfort",
      categoryColor: "bg-green-500",
      duration: "12 Days",
      title: "Everest Base Camp Trek with Helicopter Return",
      price: "2,350",
      features: [
        "Scenic flight to Lukla",
        "Helicopter Return Included",
        "3-star hotel accommodation in Kathmandu",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1585054148474-0672e811f95a?auto=format&fit=crop&q=80",
      category: "Luxury",
      categoryColor: "bg-yellow-500",
      duration: "14 Days",
      title: "Everest Base Camp Luxury Trek",
      price: "3,150",
      features: [
        "Scenic flight to Lukla",
        "Helicopter Return not Included",
        "5-star hotel accommodation in Kathmandu",
        "Luxury lodge accommodation in the mountains",
      ],
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Popular Everest Base Camp Options
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore most popular Everest Base Camp Trek options and choose one
            that matches your pace, comfort, and adventure goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treks.map((trek, index) => (
            <TrekCard key={index} {...trek} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTreks;
