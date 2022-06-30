import got from "got";

class ServiceUtil{
    static async getPokemon(){
        const url = "https://pokeapi.co/api/v2/pokemon/ditto/";
        const response = await got(url);
        const pokemon = JSON.parse(response.body);
        return pokemon;
    }
}

export default ServiceUtil;