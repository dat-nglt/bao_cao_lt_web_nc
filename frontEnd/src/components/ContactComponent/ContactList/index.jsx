// ContactList.js
import React, { useState } from "react";
import Contact from "./Contact";
import { Box } from "@mui/material";
import Pagination from "../../Pagination"; // Import component Pagination

function ContactList() {
  const data = [
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },

    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },

    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
    { name: 'Apple', description: 'A sweet red fruit that is popular worldwide.', time: '2024-11-19 10:30' },
    { name: 'Banana', description: 'A long, yellow fruit with a soft, creamy interior.', time: '2024-11-19 11:00' },
    { name: 'Cherry', description: 'A small, round, red fruit often used in desserts.', time: '2024-11-19 11:30' },
  ];

  const countContact = data.length;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(countContact / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box>
      {displayedData.map((item, index) => (
        <Contact key={index} name={item.name} description={item.description} time={item.time} />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default ContactList;
