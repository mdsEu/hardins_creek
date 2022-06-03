import SignatureModel from "../models/Signature.Model";



class SignatureRepository {
  signature;
  url = "";
  approved = false;
  updatedAt!: Date;
  limit: number = 10;
  skip: number = 1;

  constructor() {
    this.signature = new SignatureModel();
  }

  async save() {
    try {
      this.signature.url = this.url;
      this.signature.approved = this.approved;
      this.signature.updated_at = this.updatedAt || new Date();

      return await this.signature.save();
    } catch (e) {
      throw "This signature couldn\'t be saved";

    }
  }

  async findAll() {
    try{
      return await SignatureModel
        .find()
        .limit(this.limit)
        .skip(this.skip)
        .exec();
    } catch(e) {
      throw "Server error on searching executed";

    }
  }

  async find(searchingParameters: any) {
    try{
      return await SignatureModel
        .find(searchingParameters)
        .limit(this.limit)
        .skip(this.skip)
        .exec();
    } catch(e) {
      throw "Server error on searching executed";

    }
  }

  setUrl(url:string) : void {
    this.url = url;
  }

  setApproved(approved:boolean) : void {
    this.approved = approved;
  }

  setUpdatedAt(updatedAt:Date) : void {
    this.updatedAt = updatedAt;
  }

  setLimit(limit: number) : void {
    this.limit = limit;
  }

  setSkip(skip: number) : void {
    this.skip = skip;
  }

  getUrl() : string {
    return this.url;
  }

  getApproved() : boolean {
    return this.approved;
  }

  getUpdatedAt() : Date {
    return this.updatedAt;
  }

  getLimit() : number {
    return this.limit;
  }

  getSkip() : number {
    return this.skip;
  }

  setPagination({limit, page}: {limit: number, page: number}) : void {
    this.limit = limit;
    this.skip = (page - 1) * limit;
  }
}

export default SignatureRepository;
