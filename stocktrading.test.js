/**
 * This is a test file for stocktrading.js functions
 */
const DataStream = require('./DataStream');
const Alpaca = require('alpaca-trade-api');

jest.mock('alpaca-trade-api');

describe('DataStream', () => {
  let dataStream;

  beforeEach(() => {
    dataStream = new DataStream({
      apiKey: 'testApiKey',
      secretKey: 'testSecretKey',
      feed: 'testFeed',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe for quotes and trades on socket connection', () => {
    const mockOnConnect = jest.spyOn(dataStream.alpaca.data_stream_v2, 'onConnect');
    const mockSubscribeForQuotes = jest.spyOn(dataStream.alpaca.data_stream_v2, 'subscribeForQuotes');
    const mockSubscribeForTrades = jest.spyOn(dataStream.alpaca.data_stream_v2, 'subscribeForTrades');

    // Simulate socket connection
    mockOnConnect.mockImplementationOnce((callback) => callback());

    expect(mockSubscribeForQuotes).toHaveBeenCalledWith(['MSFTL']);
    expect(mockSubscribeForTrades).toHaveBeenCalledWith(['AAPL']);
  });

  it('should log errors on socket error', () => {
    const mockOnError = jest.spyOn(dataStream.alpaca.data_stream_v2, 'onError');
    const mockError = new Error('Test error');

    // Simulate socket error
    mockOnError.mockImplementationOnce((callback) => callback(mockError));

    expect(console.log).toHaveBeenCalledWith(mockError);
  });

  it('should log stock trades on stock trade event', () => {
    const mockOnStockTrade = jest.spyOn(dataStream.alpaca.data_stream_v2, 'onStockTrade');
    const mockTrade = { /* mock trade data */ };

    // Simulate stock trade event
    mockOnStockTrade.mockImplementationOnce((callback) => callback(mockTrade));

    expect(console.log).toHaveBeenCalledWith(mockTrade);
  });

  it('should log state changes on state change event', () => {
    const mockOnStateChange = jest.spyOn(dataStream.alpaca.data_stream_v2, 'onStateChange');
    const mockState = 'TEST_STATE';

    // Simulate state change event
    mockOnStateChange.mockImplementationOnce((callback) => callback(mockState));

    expect(console.log).toHaveBeenCalledWith(mockState);
  });

  it('should log "Disconnected" on socket disconnect', () => {
    const mockOnDisconnect = jest.spyOn(dataStream.alpaca.data_stream_v2, 'onDisconnect');

    // Simulate socket disconnect
    mockOnDisconnect.mockImplementationOnce((callback) => callback());

    expect(console.log).toHaveBeenCalledWith('Disconnected');
  });
});
