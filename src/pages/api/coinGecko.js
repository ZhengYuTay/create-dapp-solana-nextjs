import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    getCoinList() {
        return axios.get(`${this.baseUrl}/coins/list`);
    },
    getCoin(id) {
        return axios.get(`${this.baseUrl}/coins/${id}`);
    },
    getCoinHistory(id, params) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart`, { params });
    },
    getCoinHistoryByDate(id, date) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${date}`);
    },
    getCoinHistoryByRange(id, range) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${range}`);
    },
    getCoinHistoryByRangeAndDate(id, range, date) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${range}/${date}`);
    },
    getCoinHistoryByRangeAndDateAndInterval(id, range, date, interval) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${range}/${date}/${interval}`);
    },
    getCoinHistoryByRangeAndInterval(id, range, interval) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${range}/${interval}`);

    },
    getCoinHistoryByInterval(id, interval) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${interval}`);
    },
    getCoinHistoryByDateAndInterval(id, date, interval) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${date}/${interval}`);
    },
    getCoinHistoryByRangeAndDateAndInterval(id, range, date, interval) {
        return axios.get(`${this.baseUrl}/coins/${id}/market_chart/${range}/${date}/${interval}`);
    },
});
