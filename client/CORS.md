# CORS - Cross Origin Resource Sharing
CORS is a security restriction placed on dynamically loaded content between different domains.  CORS will restrict requests when they meet these qualifications.

    1. The request is sent to a different domain than the webpage was loaded from.
    2. The request was sent dynamically (using JavaScript), etc.
    3. The response did not include headers which explicitly allowed the CORS operation. 

For our applications resolving CORS issues is about configuring the server to provide CORS access to our development client or the server it eventually is deployed to in production.