// The URL you want to request
const url =
  'https://matesetcarbooking.vercel.app/checkseat/?date=09%2F11%2F2024&time=6%3A00&from=pyay'; // Replace with your target URL

// Function to make a single request
const makeRequest = async (i) => {
  try {
    const response = await fetch(url);
    console.log(`Request ${i} - Status: ${response.status}`);
    //wait for 0.1 second
    await new Promise((r) => setTimeout(r, 80));
  } catch (error) {
    console.error(`Request ${i} - Error: ${error.message}`);
  }
};

// Function to make 1000 sequential requests
const makeRequests = async () => {
  const totalRequests = 3001;

  for (let i = 1; i <= totalRequests; i++) {
    try {
      await makeRequest(i);
      console.log(`Request ${i} - Completed!`);
      // Sleep for 0.1 second
      //   await new Promise((r) => setTimeout(r, 100));
    } catch (error) {
      console.log(error);
    }
  }

  console.log('All requests completed!');
};

// Start the requests
makeRequests();
