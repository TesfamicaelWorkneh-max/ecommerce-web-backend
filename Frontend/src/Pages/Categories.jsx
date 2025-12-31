import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUtils";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which descriptions are expanded

  useEffect(() => {
    fetchWithAuth(`${BACKEND_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CATEGORIES DATA:", data);
        setCategories(data);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-full mx-auto px-4 py-10 bg-[#DCD7C9]">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Popular Categories
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const isExpanded = expanded[cat._id] || false;
          const shortDesc =
            cat.description?.length > 100
              ? cat.description.slice(0, 100) + "..."
              : cat.description;

          return (
            <Link
              key={cat._id}
              to={`/category/${cat.name}`}
              className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={getImageUrl(cat.image, { width: 600, height: 400 })}
                alt={cat.name}
                className="w-full h-60 object-contain group-hover:scale-105 transition-transform"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg">{cat.name}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {isExpanded ? cat.description : shortDesc}
                </p>
                {cat.description?.length > 100 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent Link navigation
                      toggleExpand(cat._id);
                    }}
                    className="text-green-600 font-medium text-sm mt-1 hover:underline"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
