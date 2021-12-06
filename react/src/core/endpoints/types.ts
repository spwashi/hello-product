type Route_Products = 'products/';
type Route_Products__Details = 'products/:id/details';
type AnyRoute =
    Route_Products
    | Route_Products__Details;
export type EndpointDescription =
    { route: Route_Products }
    | { route: Route_Products__Details, id: string | number };
type Url = string;
export type EndpointName = Url;