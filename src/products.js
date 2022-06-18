import { PUBLIC_API_KEY } from "./constants";

class ProductData {
  async fetchProductItems() {
    console.log("I am starting to process info");
    return new Promise(async (success, failure) => {
      try {
        const url = new URL("https://api.chec.io/v1/products");
        let params = { limit: "25" };
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
        let headers = {
          "X-Authorization": PUBLIC_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        if (response.ok) {
          const json = await response.json();
          const data = json.data.map((item) => ({
            desc: item.description,
            id: item.id,
            img: item.image.url,
            name: item.name,
            price: item.price.raw,
            category: item.categories[0].name,
            quantity: item.inventory.available,
          }));
          success({ response, data });
        } else {
          failure({ error: "Invalid http request" });
        }
      } catch (error) {
        failure(error);
      }
    });
  }
}

export default ProductData;
