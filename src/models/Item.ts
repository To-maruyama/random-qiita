export default class Item {
    title: string;
    url: string;
    constructor(object: any) {
      this.title = object.title
      this.url = object.url
    }
}