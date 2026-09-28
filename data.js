const SUPABASE_URL = "https://gxpueubienpmoozlgkyu.supabase.co";
const SUPABASE_KEY = "sb_publishable_T-OsYgpjuMJCO6puzNyJCw_7ExcPZt8";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ===============================
// DEFAULT WEBSITE DATA
// ===============================

const DEFAULT_DATA = {
  contact: {
    name: "Sea Turtle Stay",
    location: "Gokarna, Karnataka",
    phone: "+91 95901 94284",
    whatsapp: "919590194284",
    email: "",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sea+Turtle+Stay+Gokarna"
  },

  rooms: [
    {
      id: "ac-coastal-1",
      name: "AC Room 01",
      price: 1800,
      capacity: "2 Guests",
      description: "A comfortable air-conditioned room designed for a relaxed and peaceful stay.",
      amenities: ["AC", "Attached Bathroom", "Wi-Fi"],
      image: "assets/room1.jpeg",
      available: true
    },

    {
      id: "ac-coastal-2",
      name: "AC Room 02",
      price: 2200,
      capacity: "3 Guests",
      description: "A spacious air-conditioned room with warm interiors and everyday comfort.",
      amenities: ["AC", "Attached Bathroom", "Wi-Fi"],
      image: "assets/room2.jpeg",
      available: true
    },

    {
      id: "standard-1",
      name: "Standard Room 01",
      price: 1800,
      capacity: "2 Guests",
      description: "A clean and comfortable room for guests who want a simple Gokarna escape.",
      amenities: ["Attached Bathroom", "Wi-Fi"],
      image: "assets/room3.jpeg",
      available: true
    },

    {
      id: "standard-2",
      name: "Standard Room 02",
      price: 1800,
      capacity: "2 Guests",
      description: "A peaceful, well-kept room with everything needed for a comfortable stay.",
      amenities: ["Attached Bathroom", "Wi-Fi"],
      image: "assets/room1.jpeg",
      available: true
    },

    {
      id: "standard-3",
      name: "Standard Room 03",
      price: 1800,
      capacity: "2 Guests",
      description: "A relaxed and practical room, ideal after a day exploring Gokarna's coast.",
      amenities: ["Attached Bathroom", "Wi-Fi"],
      image: "assets/room3.jpeg",
      available: true
    }
  ],
 scooty: [
    {
      id: "scooty-1",
      name: "Honda Activa",
      price: 400,
      available: true,
      image: "assets/WhatsApp Image 2026-09-22 at 18.33.59.jpeg"
    },
    {
      id: "scooty-2",
      name: "Honda Activa",
      price: 400,
      available: true,
      image: "assets/WhatsApp Image 2026-09-23 at 19.03.06.jpeg"
    }
  ],
  activities: [
    {
      id: "trekking",
      icon: "🥾",
      name: "Trekking & Trails",
      details: "Explore scenic trails and coastal surroundings.",
      duration: "Ask for route details",
      price: "On enquiry"
    },

    {
      id: "boating",
      icon: "🚤",
      name: "Boating",
      details: "Enjoy the coast from a different perspective.",
      duration: "Subject to availability",
      price: "On enquiry"
    },

    {
      id: "campfire",
      icon: "🔥",
      name: "Campfire",
      details: "Relax under the evening sky.",
      duration: "Evening experience",
      price: "On enquiry"
    },

    {
      id: "beach",
      icon: "🌊",
      name: "Beach Time",
      details: "Spend the day by Gokarna's beautiful coast.",
      duration: "Flexible",
      price: "Free to explore"
    },

    {
      id: "nature",
      icon: "🌿",
      name: "Nature Walks",
      details: "Slow walks through the natural surroundings.",
      duration: "Flexible",
      price: "Free"
    },

    {
      id: "sightseeing",
      icon: "📸",
      name: "Sightseeing",
      details: "Discover local viewpoints and experiences.",
      duration: "Half / full day",
      price: "On enquiry"
    }
  ],

  amenities: [
    {
      icon: "❄️",
      name: "Air Conditioning",
      text: "Comfortable rooms"
    },

    {
      icon: "🚿",
      name: "Attached Bathroom",
      text: "Private bathroom in every room"
    },

    {
      icon: "📶",
      name: "Wi-Fi",
      text: "Stay connected when needed"
    },

    {
      icon: "🚗",
      name: "Parking",
      text: "Convenient on-site parking"
    },

    {
      icon: "🏖️",
      name: "Near the Beach",
      text: "A short walk to the coast"
    }
  ],

  gallery: [
    {
      src: "assets/exterior-night.jpeg",
      alt: "Sea Turtle Stay at night"
    },

    {
      src: "assets/room1.jpeg",
      alt: "Comfortable room"
    },

    {
      src: "assets/room2.jpeg",
      alt: "Bedroom"
    },

    {
      src: "assets/room3.jpeg",
      alt: "Bedroom"
    },

    {
      src: "assets/balcony.jpeg",
      alt: "Stay exterior"
    },

    {
      src: "assets/corridor.jpeg",
      alt: "Coastal corridor"
    },

    {
      src: "assets/bathroom.jpeg",
      alt: "Private attached bathroom"
    },

    {
      src: "assets/bathroom2.jpeg",
      alt: "Clean bathroom interior"
    },

    {
      src: "assets/beach-sunset.jpeg",
      alt: "Gokarna sunset"
    },

    {
      src: "assets/parking.jpeg",
      alt: "On-site parking"
    }
  ]
};


// ===============================
// GET DATA FROM SUPABASE
// ===============================

async function getData() {
  try {
    const { data, error } = await supabaseClient
      .from("site_data")
      .select("id, data")
      .limit(1)
      .single();

    if (error) {
      console.error("Supabase read error:", error);
      return structuredClone(DEFAULT_DATA);
    }

    if (
      !data ||
      !data.data ||
      Object.keys(data.data).length === 0
    ) {
      return structuredClone(DEFAULT_DATA);
    }

    return {
      ...DEFAULT_DATA,
      ...data.data
    };

  } catch (error) {
    console.error("getData error:", error);
    return structuredClone(DEFAULT_DATA);
  }
}


// ===============================
// SAVE DATA TO SUPABASE
// ===============================

async function saveData(data) {
  try {
    const result = await supabaseClient
      .from("site_data")
      .select("id")
      .limit(1)
      .single();

    if (result.error) {
      console.error("Could not find site_data row:", result.error);
      return false;
    }

    const rowId = result.data.id;

    const updateResult = await supabaseClient
      .from("site_data")
      .update({
        data: data
      })
      .eq("id", rowId);

    if (updateResult.error) {
      console.error("Supabase save error:", updateResult.error);
      return false;
    }

    console.log("Data saved successfully to Supabase.");
    return true;

  } catch (error) {
    console.error("saveData error:", error);
    return false;
  }
}

// ===============================
// PRICE FORMATTER
// ===============================

function formatINR(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(n));
}
