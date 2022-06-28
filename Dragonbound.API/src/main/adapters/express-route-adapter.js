export default (controller) => {
    return async (req, res) => {
        const request = {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
        };
        const httpResponse = await controller.handle(request);
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.name,
                message: httpResponse.body.message,
            });
        }
    }
}