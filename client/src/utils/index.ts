export const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
export const ethRequestAccount = "0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897";
export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "idPasien",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "hasilTes",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "tanggalTes",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "statusVaksinasi",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "CovidDataAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "CovidDataDeleted",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" },
      { "internalType": "string", "name": "_idPasien", "type": "string" },
      { "internalType": "string", "name": "_hasilTes", "type": "string" },
      { "internalType": "string", "name": "_tanggalTes", "type": "string" },
      { "internalType": "string", "name": "_statusVaksinasi", "type": "string" }
    ],
    "name": "updateCovidData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },  
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_idPasien",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_hasilTes",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tanggalTes",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_statusVaksinasi",
        "type": "string"
      }
    ],
    "name": "addCovidData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "covidDataCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "covidRecords",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "idPasien",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hasilTes",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "tanggalTes",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "statusVaksinasi",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "deleteCovidData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllCovidData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "idPasien",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hasilTes",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggalTes",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "statusVaksinasi",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "internalType": "struct UserCovidManagement.CovidData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_idPasien",
        "type": "string"
      }
    ],
    "name": "getCovidDataByIdPasien",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "idPasien",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hasilTes",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggalTes",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "statusVaksinasi",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "internalType": "struct UserCovidManagement.CovidData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "isUserRegistered",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_idPasien",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_hasilTes",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tanggalTes",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_statusVaksinasi",
        "type": "string"
      }
    ],
    "name": "updateCovidData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];