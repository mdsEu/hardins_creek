import { ISignature } from '../types/Signature';

const parsePagination = (signatures : Array<ISignature>, currentPage : number, limit : number) => {

  return {
    total: signatures.length,
    page: currentPage + 1,
    limit,
    signatures
  };
}


export default parsePagination;
