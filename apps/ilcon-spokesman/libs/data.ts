import { Crown, Users, Target, Lightbulb, TrendingUp, Compass, Instagram, Globe, Linkedin, Twitter, Youtube } from 'lucide-react';

import { EventData } from "./types";


const eventData: EventData = {
  eventDetails: {
    name: "ILCON 2026",
    subtitle: "International Leadership Conference",
    date: "22nd - 26th July 2026",
    location: "Hope Auditorium, Ile-Ife, Nigeria",
    registrationLink: "/register",
    meetingLinks: {
      zoom: "https://us02web.zoom.us/j/2200715116?pwd=cERuRmZyZzlEaUNaa0gwaTlXaEMvQT09",
      youtube: "https://www.youtube.com/sanctuaryofhopechurch/live ",
      facebook: "https://facebook.com/your-page",
      mixlr: "https://mixlr.com/sanctuary-of-hope-church",
      // instagram: "https://instagram.com/your-profile",
      // tiktok: "https://tiktok.com/@your-handle"
    }

  },
  speakers: [
    {
      id: 1,
      slug: 'gregerhabor',
      name: "Rev. Prof. Greg Erhabor",
      role: "President, Spokesman Communication Ministries",
      type: "host",
      bio: "An internationally recognized leadership expert, life coach, and conference speaker. He serves as the Senior Pastor of Spokesman Sanctuary of Hope Church International and is a Professor of Medicine at Obafemi Awolowo University. He is the author of several books and the host of the 'Hope for the Nation' telecast.",
      image: "/images/gregerhabor-2.JPG",
      socials: {
        twitter: "https://x.com/gregerhabor",
        facebook: "https://facebook.com/gregerhabor",
        website: "https://gregerhabor.com"
      }
    },
    {
      id: 2,
      slug: 'rev-mrs-folakemi-ayodele-erhabor',
      name: "Rev. Mrs. Ayodele Erhabor",
      type: "host",
      role: "Co-Pastor & Coordinator, Gracious Women Fellowship",
      bio: "A seasoned marriage counselor, conference speaker, and retired nursing educator passionate about seeing homes established in unity and fulfilling God's divine purpose. She ministers alongside her husband, reaching out to young men and women with a message of hope.",
      image: "/images/ayodeleerhabor.jpeg",
      socials: {
        twitter: "https://x.com/FolakemiErhabor"
      }
    },
    {
      id: 3,
      slug: "rev-prof-mosy-madugba",
      name: "Rev. Prof. Mosy Madugba",
      type: "guest",
      role: "International Coordinator, Ministers’ Prayer Network | President, West Africa School of Missions",
      bio: "International Coordinator of the Ministers’ Prayer Network, Port Harcourt, Nigeria, and President of the West Africa School of Missions. He is a seasoned minister with a strong emphasis on prayer, missions, and spiritual formation across nations.\n\nTopic: Breaking forth in life and godliness and dealing with spiritual strongholds.",
      image: "/images/mosy-madugba.jpg",
      socials: {}
    },
    {
      id: 4,
      slug: "dr-samuel-ohiomokhare",
      name: "Dr. Samuel Ohiomokhare",
      type: "guest",
      role: "Chief Scientific Officer, Cheranna Group | Regional Overseer, Deeper Christian Life Ministry",
      bio: "Chief Scientific Officer at Cheranna Group, where he leads research and development in dermocosmetic and health solutions. He holds a PhD from Durham University and combines scientific innovation, entrepreneurship, and strategic partnerships. He also serves as Regional Overseer of Deeper Christian Life Ministry in the North East and Cumbria Region of England, UK, headquartered in Newcastle.\n\nTopic: Wisdom for all-round enlargement: Thriving across cultures.",
      image: "/images/samuel-ohiomokhare.png",
      socials: {}
    },
    {
      id: 5,
      slug: "engr-joshua-egube",
      name: "Engr. Joshua Egube",
      type: "guest",
      role: "Former Executive Secretary, Nigerian Society of Engineers | COREN Certified Engineer",
      bio: "COREN certified engineer and Fellow of the Nigerian Society of Engineers. He serves as the Executive Secretary of the Nigerian Society of Engineers, bringing strong leadership and professional insight to national engineering development.\n\nTopic: Prayer and ministration for all-round break forth.",
      image: "/images/engr_egube.jpg",
      socials: {}
    },
    {
      id: 6,
      slug: "rev-goddey-ikekhuah",
      name: "Rev. Goddey Ikekhuah",
      type: "guest",
      role: "Fellow, ICAN | Pastor, Church of God Missions International",
      bio: "Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) and Pastor at Church of God Missions International, Sapele, Nigeria. He brings a strong blend of financial expertise and pastoral insight to leadership and stewardship teachings.\n\nTopic: Financial principles for young leaders: Building wealth God’s way.",
      image: "/images/goddey-ikekhuah.jpg",
      socials: {}
    },
    {
      id: 7,
      slug: "pst-prof-akinlolu-agboola",
      name: "Pst. Prof. Akinlolu Agboola",
      type: "guest",
      role: "Professor of Management & Accounting, OAU | Executive Director, Sought Out College",
      bio: "Professor of Management and Accounting at Obafemi Awolowo University, Ile-Ife. Executive Director of Sought Out College, Ile-Ife, and Senior Pastor of Tabernacle of Grace and Favour, Ile-Ife. He teaches at the intersection of faith, leadership, business, and financial growth.\n\nTopic: Fervent in spirit and not lagging in business – Pathways to financial enlargement.",
      image: "/images/akinlolu-agboola.png",
      socials: {}
    }
  ],
  agenda: [
    {
      date: "Wednesday 22nd",
      time: "9:00 AM",
      title: "Teenagers' Conference",
      icon: Lightbulb,
      highlights: "Quiz, Drama & Inspirational talks"
    },
    {
      date: "Thursday 24th",
      time: "3:00 PM",
      title: "Youths' Conference",
      icon: Users,
      highlights: "Music, Prayer, Inspirational talks & Diverse ministrations"
    },
    {
      date: "Friday 25th",
      time: "9:00 AM",
      title: "Leadership Masterclass I",
      icon: Target,
      highlights: "Book review, Life-transforming messages & Interactive sessions"
    },
    {
      date: "Friday 25th",
      time: "4:30 PM",
      title: "Night of Breaking Forth",
      icon: TrendingUp,
      highlights: "Break forth prayers and diverse ministrations"
    },
    {
      date: "Saturday 26th",
      time: "9:00 AM",
      title: "Leadership Masterclass II",
      icon: Compass,
      highlights: "Health talk, Inspirational talks & Interactive sessions"
    },
    {
      date: "Saturday 26th",
      time: "4:30 PM",
      title: "Evening of Worship",
      icon: Users,
      highlights: "Music, Choreography & Diverse ministrations"
    },
    {
      date: "Sunday 27th",
      time: "9:00 AM",
      title: "Thanksgiving and Celebration Service",
      icon: Crown,
      highlights: "Testimonies, Prayers & Life-changing message"
    }
  ],
  pricing: [
    {
      id: "student",
      name: "Students Category",
      price: 1500,
      features: ["Full Conference Access", "Student Mentorship Session", "Digital Materials"],
      active: false
    },
    {
      id: "working-class",
      name: "Working Class Category",
      price: 15000,
      //   features: ["Full Conference Access", "Networking Mixer", "Conference Materials & Swag", "Priority Seating"],
      active: true
    },
    {
      id: "executive",
      name: "Executive Category",
      price: 25000,
      //   features: ["All Working Class Benefits", "Exclusive Executive Lounge", "1-on-1 Leadership Consult", "VIP Banquet Dinner"],
      active: false
    }
  ],
  faq: [
    {
      question: "Is accommodation provided for attendees?",
      answer: "Accommodation is not included in the ticket price, but we have partnered with nearby hotels for discounted rates. Details will be sent upon registration."
    },
    {
      question: "Can I upgrade my ticket category later?",
      answer: "Yes, you can upgrade your ticket subject to availability. Please contact the support desk at least 2 weeks before the conference."
    },
    {
      question: "Are the masterclasses strictly for executives?",
      answer: "No, the Leadership Masterclasses are designed for anyone looking to scale their impact, regardless of their current career stage or ticket category."
    }
  ],
};

export default eventData;