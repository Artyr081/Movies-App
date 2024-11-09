export default class SwapiService {
    key = '3427b333188a3d44c6cf0c3650dceb9e';

    baseUrl = 'https://api.themoviedb.org/3/';

    getResource = async (url) => {
        try {
            const res = await fetch(url);
            if (res.status === 404) {
                return await res.json();
            }
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return await res.json();
        } catch (err) {
            throw new Error(err);
        }
    };

    guestSession = async () => {
        const url = `${this.baseUrl}authentication/guest_session/new?api_key=${this.key}`;
        const body = await this.getResource(url);
        return body;
    };

    searchMovies = async (searchQuery = 'return', pageNumber = 1) => {
        const url = `${this.baseUrl}search/movie?api_key=${this.key}&include_adult=false&query=${searchQuery}&page=${pageNumber}`;
        const body = await this.getResource(url);
        return body;
    };

    getRatedMovies = async (guestSessionToken, pageNumber = 1) => {
        const url = `${this.baseUrl}guest_session/${guestSessionToken}/rated/movies?api_key=${this.key}&page=${pageNumber}`;
        const body = await this.getResource(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDI3YjMzMzE4OGEzZDQ0YzZjZjBjMzY1MGRjZWI5ZSIsIm5iZiI6MTczMTA4NDgxNS43NDg2OTA4LCJzdWIiOiI2NzIwZjViMDVkMGRlODkwNDJkOWMzMWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h7_zGezj1bqHpbqUWCTkdfsraJo0HY2nS66FM-7KFzc'
            },
        });
        return body;
    };

    getMovieRating = async (id, guestSessionToken, rate) => {
        const url = `${this.baseUrl}movie/${id}/rating?api_key=${this.key}&guest_session_id=${guestSessionToken}`;
        const body = {
            value: rate,
        };
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDI3YjMzMzE4OGEzZDQ0YzZjZjBjMzY1MGRjZWI5ZSIsIm5iZiI6MTczMTA4NDgxNS43NDg2OTA4LCJzdWIiOiI2NzIwZjViMDVkMGRlODkwNDJkOWMzMWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h7_zGezj1bqHpbqUWCTkdfsraJo0HY2nS66FM-7KFzc'
            },
            body: JSON.stringify(body),
        })
    };

    getMovieList = async () => {
        const url = `${this.baseUrl}genre/movie/list?api_key=${this.key}`;
        const body = await this.getResource(url);
        return body;
    };
}