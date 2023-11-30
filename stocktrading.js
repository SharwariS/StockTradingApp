"use strict";

/**
 * This example shows how to use the Alpaca Data V2 websocket to subscribe to events.
 * The socket is available under the `data_steam_v2` property on an Alpaca instance.
 * There are separate functions for subscribing (and unsubscribing) to trades, quotes and bars as seen below.
 */

const Alpaca = require('@alpacahq/alpaca-trade-api')
const API_KEY = env.API_KEY;
const API_SECRET = env.API_SECRET;

/**
 * This is the JavaScript API class to stream stock data and subscribe to 
 * quotes, trades for each symbol e.g AAPL, MSFT etc
 */
class DataStream {
  constructor({ apiKey, secretKey, feed }) {
    this.alpaca = new Alpaca({
      keyId: apiKey,
      secretKey,
      feed,
    });

    // The socket to stream live data available for free subscription
    const socket = this.alpaca.data_stream_v2;

    // Connect the socket to stream data
    socket.onConnect(function () {
      console.log("Connected");
      socket.subscribeForQuotes(["MSFTL"]);
      socket.subscribeForTrades(["AAPL"]);
    });

    socket.onError((err) => {
      console.log(err);
    });

    socket.onStockTrade((trade) => {
      console.log(trade);
    });

    socket.onStateChange((state) => {
      console.log(state);
    });

    socket.onDisconnect(() => {
      console.log("Disconnected");
    });

    socket.connect();

  }
}

/**
 * Highcharts chart
 */
const chart = Highcharts.stockChart('stockChart', {
  title: {
    text: 'AAPL Stock Price'
  },
  series: [{
    name: 'AAPL',
    data: [] // Empty array for initial data
  }]
});

/**
 * Build a graph for the AAPL stock data
 */
(async () => {

  const data = await fetch(
      '`wss://stream.data.alpaca.markets/v2/iex/${symbol}/quotes`'
  ).then(response => response.json());

  // Create the chart
  Highcharts.stockChart('container', {
      rangeSelector: {
          selected: 1
      },

      title: {
          text: 'AAPL Stock Price'
      },

      series: [{
          name: 'AAPL',
          data: data,
          tooltip: {
              valueDecimals: 2
          }
      }]
  });
})();

let stream = new DataStream({
  apiKey: API_KEY,
  secretKey: API_SECRET,
  feed: "iex",
  paper: true,
});
