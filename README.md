﻿# blockchain-task-app

npm i truffle @truffle/contract bootstrap
npm i -D lite-server

You also will need a blockchain for eth development like Ganache https://trufflesuite.com/docs/ganache/ (UI or CLI)

1. Run ganache server
2. Run truffle deployed
3. Run truffle test
4. Run truffle migrate --reset
5. npm run dev
6. Add your ganache net to Metamask Networks*
7. Import your Metamask account provided by Ganache (it gives you private keys)

## Metamask Networks
1. Open your Metamask
2. Settings > Networks > Add Network
3. New RPC URL: your server, probable https://localhost:PORT (PORT is provided by Ganache)

![image](https://user-images.githubusercontent.com/86263343/150706288-130fb421-f8b8-4459-a95a-2e4361369f82.png)
