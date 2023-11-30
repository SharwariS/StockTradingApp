# StockTradingApp

This App uses the JavaScript Alpaca API to get live streaming data for quotes, trades for different symbols. 

The .env file contains placeholders for the Alpaca API_KEY nad SECRET_KEY. 

This project gets streaming data from the Alpaca API and displays the AAPL stock on a dashboard using the HighCharts library. 

Install the following commands : 

npm install --save @alpacahq/alpaca-trade-api
npm install highcharts --save
npm install --save-dev jest mock-socket
