import axios from 'axios';

export default async function handler() {
  try {
    const apiKey = process.env.REACT_APP_BSCSCAN_API_KEY; // Use your environment variable name
    const tokenAddress = '0x1A05EbD6FA3a9fF19e40988F84dbb300abB2b11D'; // Your token contract address

    if (!apiKey || !tokenAddress) {
      throw new Error('Missing required environment variables');
    }

    const response = await axios.get(`https://api.bscscan.com/v1/gastokeninfo?address=${tokenAddress}&apikey=${apiKey}`);
    const totalSupply = response.data.result.totalsupply; // Assuming the total supply is in the "result" object

    return (
      <div>
        <h1>Total Supply: {totalSupply}</h1>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching total supply</div>;
  }
}
