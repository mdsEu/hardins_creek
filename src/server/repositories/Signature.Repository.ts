import SignatureModel from "../models/Signature.Model";



class SignatureRepository {
  signature;
  url = "";
  approved = false;
  updatedAt!: Date;

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
      return await SignatureModel.find()
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

  getUrl() : string {
    return this.url;
  }

  getApproved() : boolean {
    return this.approved;
  }

  getUpdatedAt() : Date {
    return this.updatedAt;
  }
}

export default SignatureRepository;
