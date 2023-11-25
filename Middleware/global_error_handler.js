class GlobalErrorHandler extends Error{
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static user_not_found() {
    return new GlobalErrorHandler(404, 'User not found');
  }
  static user_already_exists() {
    return new GlobalErrorHandler(409, 'User already exists');
  }

  static invalid_token() {
        return new GlobalErrorHandler(401, 'Invalid token');
    }
  static invalid_credentials() {
        return new GlobalErrorHandler(401, 'Invalid credentials');
    }
  static invalid_input() {
        return new GlobalErrorHandler(400, 'Invalid input');
    }
  static generic_error(){
    return new GlobalErrorHandler( 500,'something went wrong! Please try again later')
  }


}

module.exports = GlobalErrorHandler;
