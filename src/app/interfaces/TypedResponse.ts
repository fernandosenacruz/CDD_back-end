import { Send } from 'express-serve-static-core';

interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody>;
}

export default TypedResponse;