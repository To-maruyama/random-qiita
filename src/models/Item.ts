import Tag from './Tag'
import { DateTime } from 'luxon';

export default class Item {
    title: string;
    body: string;
    url: string;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];

    constructor(object: any) {
      this.title = object.title
      this.body = object.body
      this.url = object.url
      this.likesCount = object.likes_count
      this.createdAt = object.created_at
      this.updatedAt = object.updated_at
      this.tags = object.tags.map((x: any) => new Tag(x.name))
    }

    get createdAtView() {return DateTime.fromISO(this.createdAt).toFormat('yyyy/MM/dd hh:mm')}

    get updatedAtView() {return DateTime.fromISO(this.updatedAt).toFormat('yyyy/MM/dd hh:mm')}
}