import repository from "./Repository"
import Item from "../models/Item"
import Tag, {Tags} from "../models/Tag"

export default class QiitaRepository {
  async getItems(keyword: string): Promise<any> {
    return repository.get(
        "/items",
        {
          params: {
            "page": "1",
            "per_page": "20",
            "query": keyword,
          }
        }
    ).then((response) => { return response.data.map((x: any) => new Item(x))}
    )
  }

  async getTags(page: number): Promise<Tags> {
    return repository.get(
        "/tags",
        {
          params: {
            "page": page,
            "per_page": "3",
            "sort": "count",
          }
        }
    ).then((response) => { return new Tags(response.data.map((x: any) => new Tag(x)))}
    )
  }
}