
import { NextResponse } from 'next/server'
import {VerifyToken} from "@/utility/JWTTokenHelper";
export async function middleware(req, res) {

    if (req.nextUrl.pathname.startsWith("/api/dashboard")) {
        try {
            let token = req.cookies.get('token');
            let payload = await VerifyToken(token['value']);


            const requestHeader=new Headers(req.headers);
            requestHeader.set('email',payload['email']);
            requestHeader.set('id',payload['id'])


            return NextResponse.next({
                request:{headers:requestHeader}
            });

        }catch (e) {
            return  NextResponse.json({status:"fail",data:"unauthorized"}, {status:401})
        }
    }



    if (req.nextUrl.pathname.startsWith("/api/user")) {
        return NextResponse.next();
    }


}





// Overwiew of the code
// This middleware is used to check if the user is logged in or not
// If the user is logged in then the user will be redirected to the dashboard
// If the user is not logged in then the user will be redirected to the login page
// This middleware is used in the following pages
// 1. pos-app/pages/dashboard/index.js
// 2. pos-app/pages/dashboard/[id].js
// 3. pos-app/pages/dashboard/[id]/edit.js
// 4. pos-app/pages/dashboard/[id]/delete.js
// 5. pos-app/pages/dashboard/[id]/add.js
// 6. pos-app/pages/dashboard/[id]/view.js
// 7. pos-app/pages/dashboard/[id]/add.js
// 8. pos-app/pages/dashboard/[id]/edit.js
// 9. pos-app/pages/dashboard/[id]/delete.js
// 10. pos-app/pages/dashboard/[id]/view.js

// Explaination of the  code  line by line:

// This JavaScript file is a middleware for a Next.js server-side application. It's used to handle incoming requests and perform certain operations before the requests reach their intended routes. Here's a line-by-line explanation:

// 1. `import { NextResponse } from 'next/server'`: This line imports the `NextResponse` object from the `next/server` module. `NextResponse` is used to create responses in Next.js middleware.

// 2. `import {VerifyToken} from "@/utility/JWTTokenHelper";`: This line imports a `VerifyToken` function from a local module located at "@/utility/JWTTokenHelper". This function is likely used to verify JWT tokens.

// 3. `export async function middleware(req, res) {`: This line declares an asynchronous function named `middleware` that takes two arguments: `req` (the incoming request) and `res` (the response object).

// 4. `if (req.nextUrl.pathname.startsWith("/api/dashboard")) {`: This line checks if the pathname of the incoming request starts with "/api/dashboard". If it does, the code inside the if statement will execute.

// 5. `let token = req.cookies.get('token');`: This line retrieves the 'token' from the cookies of the request.

// 6. `let payload = await VerifyToken(token['value']);`: This line calls the `VerifyToken` function with the value of the token. It then waits for the promise to resolve and assigns the result to the `payload` variable.

// 7. `const requestHeader=new Headers(req.headers);`: This line creates a new Headers object with the headers from the incoming request.

// 8. `requestHeader.set('email',payload['email']);`: This line sets the 'email' header to the email from the payload.

// 9. `requestHeader.set('id',payload['id'])`: This line sets the 'id' header to the id from the payload.

// 10. `return NextResponse.next({request:{headers:requestHeader}});`: This line returns a NextResponse object with the modified headers.

// 11. `}catch (e) {`: If any error occurs in the try block, the catch block will execute.

// 12. `return  NextResponse.json({status:"fail",data:"unauthorized"}, {status:401})`: This line returns a JSON response with a status of "fail" and data of "unauthorized", along with a HTTP status code of 401.

// 13. `if (req.nextUrl.pathname.startsWith("/api/user")) {`: This line checks if the pathname of the incoming request starts with "/api/user". If it does, the code inside the if statement will execute.

// 14. `return NextResponse.next();`: This line returns a NextResponse object, allowing the request to proceed to the next middleware or route handler.

// 15. `}`: This line closes the `middleware` function.
