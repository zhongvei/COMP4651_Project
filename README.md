# HackUST 2023

<hr/>

## Team Name: (T.A.M.J.A.I.)
## The Association of Mission-driven, Judicious, and Ambitious Individuals  

<hr/>

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)

<hr/>

## Introduction

 The following project is a submission for HackUST 2023. 

#### Homeābode leverages both finance and Web3 technologies to create a community-driven platform for affordable housing. It consists of two main components:

#### a) A REIT fund that manages and rents out housing for low-to-middle income HK residents at slightly below market price 

#### b) A platform powered by smart-contracts and blockchain monitoring framework that increases the transparency of the fund’s assets and social impact.

The codebase for the project is split into two parts: the blockchain network and the web application. 

The blockchain network is built using solidity and local ganache server. 

The web application is built using Next.js. 

<hr/>

## Getting Started

### Prerequisites

- Node.js
- NPM
- Git
- Metamask
- ganache
- hardhat

## Installation


### Cloning the repo

1. Clone the repo
   ```sh
   git clone https://github.com/Pat-r1ck/hackust23.git
    ```

### Blockchain Network

1. Change directory to the web3 folder
   ```sh
   cd hackust23/web3
   ```
2. Install NPM packages
   ```sh
    npm install
    ```
3. Start the local blockchain network 
    ```sh
    ganache -h localhost -p 8545 -d
    ```
4. Compile the smart contracts
    ```sh
    npm run deploy
    ```
5. Open the link provided in the terminal to connect to the local blockchain network. Connect the metamask wallet to the local blockchain network by copying the private key of the first account in the ganache terminal and import it into the metamask wallet. Change the network to localhost:8545. 

6. Deploy the smart contract and copy the contract address of the deployed smart contract and paste it in the .env.development file in the client folder.

### Web Application

1. Change directory to the client folder
   ```sh
   cd hackust23/client
   ```
2. Install NPM packages
   ```sh
    npm install
    ```
3. Start the web application
    ```sh
    npm run dev
    ```
    