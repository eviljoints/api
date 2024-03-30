import axios from 'axios';

export default async function handler(req, res) {
  try {
    const apiKey = process.env.REACT_APP_BSCSCAN_API_KEY; // Replace with your environment variable name
    const tokenAddress = req.query.tokenAddress; // Get token address from query parameter

    if (!apiKey || !tokenAddress) {
      throw new Error('Missing required parameters');
    }

    const response = await axios.get(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=${apiKey}`);
    const totalSupply = response.data.result.totalSupply; // Assuming the total supply is in the "result" object

    // Set plain text response with total supply
    res.setHeader('Content-Type', 'text/plain'); // Set content type
    res.status(200).send(totalSupply);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: Failed to fetch total supply'); // Plain text error message
  }
}
