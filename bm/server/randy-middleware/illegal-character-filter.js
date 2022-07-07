module.exports = (req, res, next) => {
    let payload = '';
    switch (req.method) {
        case 'GET':
            payload = JSON.stringify(req.query);
            break;
        case 'POST':
            payload = JSON.stringify(req.body);
            break;
        default:
            res.json({respCode: '600'});
    }
    const illegalCharRegex = /[`~!@#$%^&*()_\-+=<>?|.\/;'\\[\]·！￥…（）—《》？：“”【】、；‘’，。]/im;
    const isReject = illegalCharRegex.test(payload);
    // isReject ? res.json({respCode: '501'}) : next();
    if (isReject) {
        res.json({respCode: '501'})
    } else {
        next();
    }
};