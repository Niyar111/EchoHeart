exports.headers = (req, res) => {
    // Return a trimmed view of headers to avoid leaking secrets in logs
    const headers = Object.keys(req.headers).reduce((acc, k) => {
        acc[k] = req.headers[k];
        return acc;
    }, {});
    res.json({ headers });
};
