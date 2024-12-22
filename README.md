## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Hardhat](https://hardhat.org/)
- [ngrok](https://ngrok.com/)
---

## Commands Summary

| Command                                    | Description                                   |
|--------------------------------------------|-----------------------------------------------|
| `npm install`                              | Install all project dependencies.            |
| `npx hardhat node`                         | Start a local blockchain network.            |
| `npx hardhat run scripts/deploy.js --network localhost` | Deploy contracts to the local blockchain. |
| `npm run dev`                              | Start the frontend development server.        |
| `ngrok http http://localhost:3000`         | Expose the local server to the internet.      |

---
## Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
DATABASE_URL=mongodb://localhost:27017/Shipment_project
BASE_URL=http://localhost:3000/
NEXT_PUBLIC_GOOGLE_MAP_API=<KEY>
```

Replace `<KEY>` with your actual Google Maps API key.

