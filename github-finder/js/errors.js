class NetworkError extends Error {
  constructor() {
    super('Something Went Wrong! Chek Your Internet Connection.');
    this.name = this.constructor.name;
  }
}

class NotFoundError extends Error {
  constructor() {
    super('We Can\'t Find the username! Please Try Again.');
    this.name = this.constructor.name;
  }
}

class EmptyField extends Error {
  constructor(fieldName) {
    super(`${fieldName} is Empty!`);
    this.name = this.constructor.name;
  }
}