export default class Tag {
    id: string;

    constructor(str: string) {
      this.id = str
    }
}

export class Tags {
    ids: Array<Tag>;

    constructor(ids: Array<Tag>) {
      this.ids = ids;
    }

    get query(): string {
      return this.ids.map(x => `tag:${x.id}`).join(' stocks:>10 OR ') + 'stocks:>10'
    }

    get idsString(): string {
        return this.ids.map(x => x.id).join(' ')
    }
}