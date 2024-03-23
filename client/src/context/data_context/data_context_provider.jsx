/* eslint-disable react/prop-types */
import { useState } from "react";
import data_context from "./data_context";

// {
//   "name": "Satwik Roy",
//   "email": "satwikroy2004@gmail.com",
//   "department": "ECE",
//   "year": "1st",
//   "role": "Fast bowler",
//   "base_price": 500,
//   "image": "https://drive.google.com/open?id=1m_lhZyc6h5D3Zwt5yU4plxzGthxBg94z"
// }

function Data_context_provider({ children }) {
  const [data, setData] = useState([
    {
      name: "Ghazanfar Alam",
      email: "ghazanfaralam0208@gmail.com",
      department: "IT",
      year: "2nd",
      role: "All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1iJ-XwUmK9gUkyUh6cpIf26Q3e1LQeGct",
      position: "player",
    },
    {
      name: "Monu kumar ",
      email: "monusingh05104@gmail.com",
      department: "IT",
      year: "1st",
      role: "Batsman",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1CquIw1couua3yCN75M2awZqb1TaCkLju",
      sold: true,
      position: "player",
    },
    {
      name: "Harsh Kumar",
      email: "hk9538509@gmail.com",
      department: "IT",
      year: "2nd",
      role: "All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=15OiT3n5JlIN1WFr1-4J-hDwujQWTES2_",
      sold: true,
      position: "player",
    },
    {
      name: "Dron singh",
      email: "flydron1148@gmail.com",
      department: "It",
      year: "2nd",
      role: "All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1RRFJF0dIZpHocalm-DiRnawS0bMOALmt",
      position: "player",
    },
    {
      name: "Sachin Sharma",
      email: "sachinsharma27012004@gmail.com",
      department: "IT",
      year: "2nd",
      role: "Wicket keeper batsman",
      base_price: 500,
      image:
        "https://drive.google.com/open?id=1jc1Xt76hKu3DUJHTEsXYCJk3nTq2HfVF",
      sold: true,
      position: "leader",
    },
    {
      name: "Rittam Nandy",
      email: "rittamnani@gmail.com",
      department: "BCA",
      year: "1st",
      role: "Wk All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=13XlfVQ1laxQmQOCuIV2n1Ks1YnJpQI9E",
      position: "player",
    },
    {
      name: "Ayushmaan Mishra ",
      email: "mishraayushmaan3@gmail.com",
      department: "IT",
      year: "2nd",
      role: "All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1cHucji6Ym9CQQAVxA1qCTevUk6A49A_Y",
      position: "player",
    },
    {
      name: "Gourove Kumar",
      email: "gouravkumar82105@gmail.com",
      department: "IT",
      year: "1st",
      role: "Batsman",
      base_price: 500,
      image:
        "https://drive.google.com/open?id=1APvhUdc1hdSD2HUWR7wet6w2T-40bs-G",
      position: "player",
    },
    {
      name: "Saurabh Kumar jha ",
      email: "saurabhkashyap12588@gmail.com",
      department: "Cse",
      year: "2nd",
      role: "Batsman",
      base_price: 500,
      image:
        "https://drive.google.com/open?id=1ENFljHUbocytKUDfzr1QK4RgXBBmsDba",
      position: "player",
    },
    {
      name: "Rakshit Pathak",
      email: "rakshitclub@gmail.com",
      department: "BCom",
      year: "1st",
      role: "All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1bcQ2bZfGxLchS-aaOVPhZ8oQSzk-bCGO",
      position: "leader",
    },
    {
      name: "Ankit Raj",
      email: "muchi08967@gmail.com ",
      department: "Electrical Engineering ",
      year: "2nd",
      role: "All rounder",
      base_price: 500,
      image:
        "https://drive.google.com/open?id=1XhbKoDvtygHpl285AQ4RGuxxh_h6Mvn3",
      position: "player",
    },
    {
      name: "Suyash Anand ",
      email: "Suyasanand@gmail.com ",
      department: "ECE",
      year: "2nd",
      role: "All rounder",
      base_price: 500,
      image:
        "https://drive.google.com/open?id=1wmRLvWOFpvQ3GaHPSZq5SFP85tGHZIt2",
      position: "player",
    },
    {
      name: "Joydip Mondal",
      email: "joydip2003mondal@gmail.com",
      department: "IT",
      year: "2nd",
      role: "Batsman",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1WcJztmJUBcWmca4c3cEXlqzhX8WyO4HJ",
      position: "player",
    },
    {
      name: "Satwik Roy",
      email: "satwikroy2004@gmail.com",
      department: "ECE",
      year: "1st",
      role: "Fast bowler",
      base_price: 500,

      image:
        "https://drive.google.com/open?id=1m_lhZyc6h5D3Zwt5yU4plxzGthxBg94z",
      position: "player",
    },
    {
      name: "Roushan kumar ",
      email: "roushankr0205@gmail.com",
      department: "EE",
      year: "2nd",
      role: "Batsman",
      base_price: 500,
      image:
        "https://drive.google.com/open?id=1vhpHDlKwjoqLobLbXvWowhnLpNkmDPov",
      position: "player",
    },
    {
      name: "Aman verma ",
      email: "amanjavc@gmail.com",
      department: "ECE",
      year: "2nd",
      role: "Medium fast bowler ",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1ve5WAFp5vqFQBSugJ2AkSuJppza66ZUi",
      position: "player",
    },
    {
      name: "Ankit anand",
      email: "ayushanand6565@gmail.com",
      department: "ECE",
      year: "2nd",
      role: "All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=1bwOGuHDbiqekkfpBy1LJrB8RrDeExdWZ",
      position: "player",
    },
    {
      name: "Ashish singh parmar ",
      email: "ashishalways45@gmail.com",
      department: "AIML",
      year: "1st",
      role: "All rounder",
      base_price: 1000,
      image:
        "https://drive.google.com/open?id=13Yxqq0_M4jL9vjmkM8sucztaB17pHocj",
      position: "player",
    },
  ]);
  const [team, setTeam] = useState([
    {
      name: "aglo",
      players: [
        {
          name: "Rohit Kumar",
          email: "rohitt@gmail.com",
          department: "CSE",
          year: "2nd",
          role: "Fast Bowler",
          base_price: "500",
        },
        {
          name: "Sara Smith",
          email: "sara.smith@example.com",
          department: "ECE",
          year: "3rd",
          role: "Batsman",
          base_price: "700",
        },
        {
          name: "John Doe",
          email: "john.doe@example.com",
          department: "ME",
          year: "4th",
          role: "All-Rounder",
          base_price: "600",
        },
        {
          name: "Rohit Kumar",
          email: "rohitt@gmail.com",
          department: "CSE",
          year: "2nd",
          role: "Fast Bowler",
          base_price: "500",
        },
        {
          name: "Sara Smith",
          email: "sara.smith@example.com",
          department: "ECE",
          year: "3rd",
          role: "Batsman",
          base_price: "700",
        },
        {
          name: "John Doe",
          email: "john.doe@example.com",
          department: "ME",
          year: "4th",
          role: "All-Rounder",
          base_price: "600",
        },
      ],
    },
    {
      name: "blaze",
      players: [
        {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          department: "IT",
          year: "2nd",
          role: "Spinner",
          base_price: "550",
        },
        {
          name: "David Brown",
          email: "david.brown@example.com",
          department: "EE",
          year: "3rd",
          role: "Batsman",
          base_price: "650",
        },
        {
          name: "Emma Wilson",
          email: "emma.wilson@example.com",
          department: "CSE",
          year: "4th",
          role: "Wicketkeeper",
          base_price: "600",
        },
      ],
    },
    {
      name: "crusaders",
      players: [
        {
          name: "Michael Lee",
          email: "michael.lee@example.com",
          department: "ME",
          year: "3rd",
          role: "Pacer",
          base_price: "700",
        },
        {
          name: "Sophia Patel",
          email: "sophia.patel@example.com",
          department: "ECE",
          year: "2nd",
          role: "All-Rounder",
          base_price: "600",
        },
        {
          name: "James Wilson",
          email: "james.wilson@example.com",
          department: "CSE",
          year: "1st",
          role: "Batsman",
          base_price: "500",
        },
      ],
    },
    {
      name: "dragons",
      players: [
        {
          name: "Olivia Brown",
          email: "olivia.brown@example.com",
          department: "ECE",
          year: "4th",
          role: "Wicketkeeper",
          base_price: "650",
        },
        {
          name: "Daniel White",
          email: "daniel.white@example.com",
          department: "ME",
          year: "2nd",
          role: "Spinner",
          base_price: "550",
        },
        {
          name: "Isabella Clark",
          email: "isabella.clark@example.com",
          department: "CSE",
          year: "3rd",
          role: "Batsman",
          base_price: "700",
        },
      ],
    },
    {
      name: "eclipse",
      players: [
        {
          name: "William Taylor",
          email: "william.taylor@example.com",
          department: "CSE",
          year: "4th",
          role: "Pacer",
          base_price: "750",
        },
        {
          name: "Mia Rodriguez",
          email: "mia.rodriguez@example.com",
          department: "EE",
          year: "1st",
          role: "Batsman",
          base_price: "500",
        },
        {
          name: "Alexander Martinez",
          email: "alexander.martinez@example.com",
          department: "ECE",
          year: "2nd",
          role: "All-Rounder",
          base_price: "600",
        },
      ],
    },
    { name: "team6" },
  ]);

  return (
    <data_context.Provider value={{ data, team }}>
      {children}
    </data_context.Provider>
  );
}

export default Data_context_provider;
