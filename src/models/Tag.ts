export default class Tag {
    id: string;

    constructor(obj: any) {
      this.id = obj.id
    }
}

export class Tags {
    ids: Array<Tag>;

    constructor(ids: Array<Tag>) {
      this.ids = ids;
    }

    get query(): string {
      return this.ids.map(x => `tag:${x.id}`).join(' OR ')
    }

    get idsString(): string {
        return this.ids.map(x => x.id).join(' ')
    }
}