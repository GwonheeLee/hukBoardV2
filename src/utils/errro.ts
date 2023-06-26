import { NextResponse } from "next/server";

export class UnAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function serverErrorResponse(error: Error) {
  switch (error.constructor) {
    case UnAuthorizedError:
      return new NextResponse(error.message, { status: 401 });
    case BadRequestError:
      return new NextResponse(error.message, { status: 400 });
    case NotFoundError:
      return new NextResponse(error.message, { status: 404 });
    default:
      if (error?.message) {
        return new NextResponse(error.message, { status: 500 });
      } else {
        return new NextResponse(JSON.stringify(error), { status: 500 });
      }
  }
}

export async function clientResponseHandler(res: Response) {
  if (!res.ok) {
    const message = await res.text();

    window.alert(`상태코드 : ${res.status} \n 메세지 : ${message}`);
    return;
  }

  return res.json();
}
